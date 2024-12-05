import express from "express";
import cors from "cors";
import mysql from "mysql";
import bcrypt from "bcryptjs";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "junheo",
  database: "coursedb",
});

app.get("/course", (req, res) => {
  const {
    showtaken,
    showantirequisites,
    showtakable,
    ucid,
    department,
    showonlyrequirements,
  } = req.query;
  let q = `
    SELECT c.*, 
           CASE WHEN t.StudentID IS NOT NULL THEN TRUE ELSE FALSE END as is_taken
    FROM course c
    LEFT JOIN taken_by t ON c.CourseID = t.CourseID AND t.StudentID = ?
  `;
  const params = [ucid];
  const conditions = [];

  if (showtaken === "false") {
    conditions.push(
      "c.CourseID NOT IN (SELECT CourseID FROM taken_by WHERE StudentID = ?)"
    );
    params.push(ucid);
  }

  if (showantirequisites === "false") {
    conditions.push(
      "c.CourseID NOT IN (SELECT Conflicting_CourseID FROM antirequisite WHERE antirequisite.CourseID IN (SELECT CourseID FROM taken_by WHERE StudentID = ?))"
    );
    params.push(ucid);
  }

  if (showtakable === "true") {
    conditions.push(`NOT EXISTS (
      SELECT Required_CourseID 
      FROM prerequisite 
      WHERE CourseID = c.CourseID 
      AND Required_CourseID NOT IN (
        SELECT CourseID 
        FROM taken_by 
        WHERE StudentID = ?
      )
    )`);
    params.push(ucid);
  }

  if (showonlyrequirements === "true") {
    conditions.push(
      "c.CourseID IN (SELECT CourseID FROM major_requirement WHERE Major IN (SELECT Major FROM take_major WHERE StudentID = ?) UNION SELECT CourseID FROM minor_requirement WHERE Minor IN (SELECT Minor FROM take_minor WHERE StudentID = ?))"
    );
    params.push(ucid, ucid);
  }

  if (department === "CPSC") {
    conditions.push("c.Department_Name = 'CPSC'");
  } else if (department === "MATH") {
    conditions.push("c.Department_Name = 'MATH'");
  }

  // Add WHERE clause only if there are conditions
  if (conditions.length > 0) {
    q += " WHERE " + conditions.join(" AND ");
  }

  console.log("Query:", q); // Debug log
  console.log("Params:", params); // Debug log

  db.query(q, params, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.get("/course/:CourseID", (req, res) => {
  const { CourseID } = req.params;
  const q = "SELECT * FROM course WHERE CourseID = ?";
  db.query(q, [CourseID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.post("/course", (req, res) => {
  const q =
    "INSERT INTO course (`CourseID`, `Course_Name`, `Level`, `Course_Description`, `Credits`, `Department_Name`) VALUES (?)";
  const values = [
    req.body.CourseID,
    req.body.Course_Name,
    req.body.Level,
    req.body.Course_Description,
    req.body.Credits,
    req.body.Department_Name
    ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Course has been created successfully");
  });
});

app.put("/course/:CourseID", (req, res) => {
  const courseID = req.params.CourseID;
  const q =
    "UPDATE course SET `Course_Name` = ?, `Level` = ?, `Course_Description`= ?, `Credits` = ?, `Department_Name` = ? WHERE CourseID = ?";

  const values = [
    req.body.Course_Name,
    req.body.Level,
    req.body.Course_Description,
    req.body.Credits,
    req.body.Department_Name,
    ];

  db.query(q, [...values, courseID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Course has been updated successfully");
  });
});

app.delete("/course/:CourseID", (req, res) => {
  const courseID = req.params.CourseID;
  const q = "DELETE FROM course WHERE CourseID = ?";

  db.query(q, [courseID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Course has been deleted successfully");
  });
});

// --------- Student Routes ---------

app.post("/take_course/:CourseID", (req, res) => {
  const { CourseID } = req.params;
  const { UCID } = req.body;

  console.log("Received request to add course:", { CourseID, UCID }); // Debug log

  if (!UCID) {
    console.log("No UCID provided");
    return res.status(400).json({ error: "UCID is required" });
  }

  const q = "INSERT INTO taken_by (CourseID, StudentID) VALUES (?, ?)";

  db.query(q, [CourseID, UCID], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Successfully added course to taken_by table");
    return res.json({
      success: true,
      message: "Course has been added to My Courses",
    });
  });
});

// --------- Tutorial Routes ---------

app.get("/tutorial/:CourseID", (req, res) => {
  const { CourseID } = req.params;
  const q = "SELECT * FROM tutorial WHERE CourseID = ?";
  db.query(q, [CourseID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.get("/tutorial/:CourseID/:TutorialNo/:semester_name", (req, res) => {
  const { CourseID, TutorialNo, semester_name } = req.params;
  const q =
    "SELECT * FROM tutorial WHERE CourseID = ? AND TutorialNo = ? AND semester_name = ?";
  db.query(q, [CourseID, TutorialNo, semester_name], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.post("/tutorial/:CourseID", (req, res) => {
  const {
    TutorialNo,
    semester_name,
    TA_name,
    Enrollment_Limit,
    Enrollment_Current_Number,
    Building_Name,
    Room_Location,
    Days,
    Start_time,
    End_time,
  } = req.body;
  const { CourseID } = req.params;

  const q = `
      INSERT INTO tutorial 
      (TutorialNo, CourseID, semester_name, TA_name, Enrollment_Limit, Enrollment_Current_Number, Building_Name, Room_Location, Days, Start_time, End_time)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    q,
    [
      TutorialNo,
      CourseID,
      semester_name,
      TA_name,
      Enrollment_Limit,
      Enrollment_Current_Number,
      Building_Name,
      Room_Location,
      Days,
      Start_time,
      End_time,
    ],
    (err, data) => {
      if (err) {
        console.error("Error inserting tutorial:", err);
        return res
          .status(500)
          .json({ message: "Failed to create tutorial", error: err.message });
      }
      console.log("Tutorial successfully created:", data);
      return res
        .status(201)
        .json("Tutorial has been created for CourseID " + CourseID);
    }
  );
});

app.put("/tutorial/:CourseID/:TutorialNo/:semester_name", (req, res) => {
  const { CourseID, TutorialNo, semester_name } = req.params;
  const {
    Enrollment_Limit,
    Enrollment_Current_Number,
    Building_Name,
    Room_Location,
    Days,
    Start_time,
    End_time,
  } = req.body;

  const q = `
    UPDATE tutorial
    SET Enrollment_Limit = ?, Enrollment_Current_Number = ?, Building_Name = ?, Room_Location = ?, 
        Days = ?, Start_time = ?, End_time = ? 
    WHERE CourseID = ? AND TutorialNo = ? AND semester_name = ?`;

  db.query(
    q,
    [
      Enrollment_Limit,
      Enrollment_Current_Number,
      Building_Name,
      Room_Location,
      Days,
      Start_time,
      End_time,
      CourseID,
      TutorialNo,
      semester_name,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Tutorial has been updated");
    }
  );
});

app.delete("/tutorial/:CourseID/:TutorialNo/:semester_name", (req, res) => {
  const { CourseID, TutorialNo, semester_name } = req.params;

  const q =
    "DELETE FROM tutorial WHERE CourseID = ? AND TutorialNo = ? AND semester_name = ?";
  db.query(q, [CourseID, TutorialNo, semester_name], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Tutorial has been deleted");
  });
});

app.post("/itlogin", async (req, res) => {
  const sql = "SELECT * FROM itlogin WHERE userID = ?";
  const values = [req.body.UCID];

  db.query(sql, values, (err, data) => {
    if (err) return res.json({ success: false, message: "Login Failed" });
    if (data.length === 0) {
      return res.json({ success: false, message: "No Record" });
    }

    // Compare the provided password with the stored hash
    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (isValidPassword) {
      return res.json({
        success: true,
        message: "Login Successful",
        userID: data[0].userID,
      });
    }
    return res.json({ success: false, message: "Invalid Password" });
  });
});

app.post("/studentlogin", async (req, res) => {
  const sql = "SELECT * FROM studentlogin WHERE userID = ?";
  const values = [req.body.UCID];

  db.query(sql, values, (err, data) => {
    if (err) return res.json({ success: false, message: "Login Failed" });
    if (data.length === 0) {
      return res.json({ success: false, message: "No Record" });
    }

    // Compare the provided password with the stored hash
    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (isValidPassword) {
      return res.json({
        success: true,
        message: "Login Successful",
        userID: data[0].userID,
      });
    }
    return res.json({ success: false, message: "Invalid Password" });
  });
});

// --------- Lecture Routes ---------

// Get all lectures for a specific course
app.get("/lecture/:CourseID", (req, res) => {
  const { CourseID } = req.params;
  const q = "SELECT * FROM lecture WHERE CourseID = ?";
  db.query(q, [CourseID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Add a new lecture
// Add a new lecture for a specific course (CourseID passed in URL)
app.post("/lecture/:CourseID", (req, res) => {
  const {
    LectureID,
    Enrollment_Limit,
    Enrollment_Current_Number,
    Building_Name,
    Room_Location,
    Semester_Name,
    Days,
    Start_time,
    End_time,
  } = req.body;
  const { CourseID } = req.params; // Get the CourseID from the URL

  console.log("Received data for new lecture:", {
    LectureID,
    Enrollment_Limit,
    Enrollment_Current_Number,
    Building_Name,
    Room_Location,
    Semester_Name,
    Days,
    Start_time,
    End_time,
    CourseID,
  });

  const q = `
    INSERT INTO lecture 
    (LectureID, CourseID, Enrollment_Limit, Enrollment_Current_Number, Building_Name, Room_Location, Semester_Name, Days, Start_time, End_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    q,
    [
      LectureID,
      CourseID,
      Enrollment_Limit,
      Enrollment_Current_Number,
      Building_Name,
      Room_Location,
      Semester_Name,
      Days,
      Start_time,
      End_time,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res
        .status(201)
        .json("Lecture has been created for CourseID " + CourseID);
    }
  );
});

// Update an existing lecture
app.put("/lecture/:CourseID", (req, res) => {
  const {
    LectureID,
    CourseID,
    Enrollment_Limit,
    Enrollment_Current_Number,
    Building_Name,
    Room_Location,
    Semester_Name,
    Days,
    Start_time,
    End_time,
  } = req.body;
  // const { CourseID } = req.params;

  console.log("Received data to update lecture:", req.body);
  console.log("CourseID:", CourseID, "LectureID:", LectureID);

  const q = `
    UPDATE lecture 
    SET Enrollment_Limit = ?, Enrollment_Current_Number = ?, Building_Name = ?, Room_Location = ?, 
        Semester_Name = ?, Days = ?, Start_time = ?, End_time = ? 
    WHERE CourseID = ? AND LectureID = ?`;

  db.query(
    q,
    [
      Enrollment_Limit,
      Enrollment_Current_Number,
      Building_Name,
      Room_Location,
      Semester_Name,
      Days,
      Start_time,
      End_time,
      CourseID,
      LectureID,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Lecture has been updated");
    }
  );
});

app.post("/prerequisite", (req, res) => {
  const { CourseID, Required_CourseID } = req.body;
  const q =
    "INSERT INTO prerequisite (CourseID, Required_CourseID) VALUES (?, ?)";

  db.query(q, [CourseID, Required_CourseID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Prerequisite has been added successfully");
  });
});

// Add these new endpoints

// Get prerequisites for a course
app.get("/prerequisite/:CourseID", (req, res) => {
  const { CourseID } = req.params;
  const q = `
    SELECT p.Required_CourseID, c.Course_Name 
    FROM prerequisite p
    JOIN course c ON p.Required_CourseID = c.CourseID
    WHERE p.CourseID = ?`;

  db.query(q, [CourseID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Delete a prerequisite
app.delete("/prerequisite/:CourseID/:Required_CourseID", (req, res) => {
  const { CourseID, Required_CourseID } = req.params;
  const q =
    "DELETE FROM prerequisite WHERE CourseID = ? AND Required_CourseID = ?";

  db.query(q, [CourseID, Required_CourseID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Prerequisite has been removed successfully");
  });
});

// Get antirequisites for a course
app.get("/antirequisite/:CourseID", (req, res) => {
  const { CourseID } = req.params;
  const q = `
    SELECT a.Conflicting_CourseID, c.Course_Name 
    FROM antirequisite a
    JOIN course c ON a.Conflicting_CourseID = c.CourseID
    WHERE a.CourseID = ?`;

  db.query(q, [CourseID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Add an antirequisite
app.post("/antirequisite", (req, res) => {
  const { CourseID, Conflicting_CourseID } = req.body;
  const q =
    "INSERT INTO antirequisite (CourseID, Conflicting_CourseID) VALUES (?, ?)";

  db.query(q, [CourseID, Conflicting_CourseID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Antirequisite has been added successfully");
  });
});

// Delete an antirequisite
app.delete("/antirequisite/:CourseID/:Conflicting_CourseID", (req, res) => {
  const { CourseID, Conflicting_CourseID } = req.params;
  const q =
    "DELETE FROM antirequisite WHERE CourseID = ? AND Conflicting_CourseID = ?";

  db.query(q, [CourseID, Conflicting_CourseID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Antirequisite has been removed successfully");
  });
});

// Delete a lecture
app.delete("/lecture/:lectureId", (req, res) => {
  const { lectureId } = req.params;

  const q = "DELETE FROM lecture WHERE LectureID = ?";
  db.query(q, [lectureId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Lecture has been deleted");
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the course API" });
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to database");
});

app.listen(8800, () => {
  console.log("Connected to backend");
});

app.post("/studentregister", (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const sql = "INSERT INTO studentlogin (userID, password) VALUES (?, ?)";
  const values = [req.body.UCID, hashedPassword];

  db.query(sql, values, (err, data) => {
    if (err)
      return res.json({ success: false, message: "Registration Failed" });
    return res.json({ success: true, message: "Registration Successful" });
  });
});

app.post("/itregister", (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const sql = "INSERT INTO itlogin (userID, password) VALUES (?, ?)";
  const values = [req.body.UCID, hashedPassword];

  db.query(sql, values, (err, data) => {
    if (err)
      return res.json({ success: false, message: "Registration Failed" });
    return res.json({ success: true, message: "Registration Successful" });
  });
});

// Get required courses for a major and their completion status
app.get("/studentpages/MajorRequirements/:Major/:StudentID", (req, res) => {
  const { Major, StudentID } = req.params;

  const q = `
    SELECT 
      c.CourseID,
      c.Course_Name,
      c.Credits,
      CASE 
        WHEN t.StudentID IS NOT NULL THEN TRUE 
        ELSE FALSE 
      END as is_completed
    FROM major_requirement mr
    JOIN course c ON mr.CourseID = c.CourseID
    LEFT JOIN taken_by t ON c.CourseID = t.CourseID AND t.StudentID = ?
    WHERE mr.Major = ?
    ORDER BY c.CourseID
  `;

  db.query(q, [StudentID, Major], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Get Student's past courses
app.get("/studentpages/PastCourses", (req, res) => {
  const { StudentID } = req.query;

  const q = `
    SELECT 
      c.CourseID, 
      c.Course_Name, 
      c.Level, 
      c.Course_Description, 
      c.Credits, 
      c.Department_Name, 
      GROUP_CONCAT(DISTINCT p.CourseID) AS Prerequisites,
      GROUP_CONCAT(DISTINCT a.CourseID) AS Antirequisites,
      GROUP_CONCAT(DISTINCT ma.Major) AS Majors,
      GROUP_CONCAT(DISTINCT mi.Minor) AS Minors
    FROM 
      taken_by t
    LEFT JOIN 
      course c ON t.CourseID = c.CourseID
    LEFT JOIN 
      prerequisite p ON c.CourseID = p.Required_CourseID
    LEFT JOIN 
      antirequisite a ON c.CourseID = a.Conflicting_CourseID
    LEFT JOIN
      major_requirement ma ON c.CourseID = ma.CourseID
    LEFT JOIN
      minor_requirement mi ON c.CourseID = mi.CourseID
    WHERE 
      t.StudentID = ?
    GROUP BY 
      c.CourseID, c.Course_Name, c.Level, c.Course_Description, 
      c.Credits, c.Department_Name
  `;

  db.query(q, [StudentID], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching past courses", error: err });
    }
    res.status(200).json(data);
  });
});

// Get required courses for a minor and their completion status
app.get("/studentpages/MinorRequirements/:Minor/:StudentID", (req, res) => {
  const { Minor, StudentID } = req.params;

  const q = `
    SELECT 
      c.CourseID,
      c.Course_Name,
      c.Credits,
      CASE 
        WHEN t.StudentID IS NOT NULL THEN TRUE 
        ELSE FALSE 
      END as is_completed
    FROM minor_requirement mr
    JOIN course c ON mr.CourseID = c.CourseID
    LEFT JOIN taken_by t ON c.CourseID = t.CourseID AND t.StudentID = ?
    WHERE mr.Minor = ?
    ORDER BY c.CourseID
  `;

  db.query(q, [StudentID, Minor], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// Remove a course from student's taken courses
app.delete("/take_course/:CourseID/:StudentID", (req, res) => {
  const { CourseID, StudentID } = req.params;
  const q = "DELETE FROM taken_by WHERE CourseID = ? AND StudentID = ?";

  db.query(q, [CourseID, StudentID], (err, data) => {
    if (err) {
      console.error("Error removing course:", err);
      return res.status(500).json(err);
    }
    return res.json("Course has been removed successfully");
  });
});

// Get Student's Major
app.get("/studentpages/Major", (req, res) => {
  const { StudentID } = req.query;

  const q = `
    SELECT 
      tm.StudentID, 
      tm.Major
    FROM 
      take_major tm
    WHERE 
      tm.StudentID = ?
  `;

  db.query(q, [StudentID], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching major", error: err });
    }
    res.status(200).json(data);
  });
});

// Get Student's Minor
app.get("/studentpages/Minor", (req, res) => {
  const { StudentID } = req.query;

  const q = `
    SELECT 
      tn.StudentID, 
      tn.Minor 
    FROM 
      take_minor tn
    WHERE 
      tn.StudentID = ?
  `;

  db.query(q, [StudentID], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching minor", error: err });
    }
    res.status(200).json(data);
  });
});

// delete Major
app.delete("/studentpages/Major/:Major/:StudentID", (req, res) => {
  const { Major, StudentID } = req.params;

  const q = "DELETE FROM take_major WHERE Major = ? AND StudentID = ?";
  db.query(q, [Major, StudentID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Major has been deleted");
  });
});

// Delete Minor
app.delete("/studentpages/Minor/:Major/:StudentID", (req, res) => {
  const { Major, StudentID } = req.params;

  const q = "DELETE FROM take_minor WHERE Minor = ? AND StudentID = ?";
  db.query(q, [Major, StudentID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Minor has been deleted");
  });
});

// Add Major
app.post("/studentpages/addmajor/:StudentID", (req, res) => {
  const { Major } = req.body;
  const { StudentID } = req.params;

  const q = `
    INSERT INTO take_major 
    (StudentID, Major)
    VALUES (?, ?)`;

  db.query(q, [StudentID, Major], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Major has been created for Student");
  });
});

// Add Minor
app.post("/studentpages/addminor/:StudentID", (req, res) => {
  const { Minor } = req.body;
  const { StudentID } = req.params;

  const q = `
    INSERT INTO take_minor 
    (StudentID, Minor)
    VALUES (?, ?)`;

  db.query(q, [StudentID, Minor], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Minor has been created for Student");
  });
});

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.url} not found` });
});
