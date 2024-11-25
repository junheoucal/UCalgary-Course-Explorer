import express from "express";
import cors from "cors";
import mysql from "mysql";
import bcrypt from 'bcryptjs';

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "junheo",
    database: "coursedb"
});

app.get("/course", (req, res) => {
  const q = "SELECT * FROM course";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/course", (req, res) => {
    const q =
      "INSERT INTO course (`CourseID`, `Course_Name`, `Level`, `Course_Description`, `Credits`, `Department_Name`, `Concentration_Name`) VALUES (?)";
    const values = [
      req.body.CourseID,
      req.body.Course_Name,
      req.body.Level,
      req.body.Course_Description,
      req.body.Credits,
      req.body.Department_Name,
      req.body.Concentration_Name,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("Course has been created successfully");
    });
  });
  
  app.put("/course/:CourseID", (req, res) => {
    const courseID = req.params.CourseID;
    const q =
      "UPDATE course SET `Course_Name` = ?, `Level` = ?, `Course_Description`= ?, `Credits` = ?, `Department_Name` = ?, `Concentration_Name` = ? WHERE CourseID = ?";
  
    const values = [
      req.body.Course_Name,
      req.body.Level,
      req.body.Course_Description,
      req.body.Credits,
      req.body.Department_Name,
      req.body.Concentration_Name,
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

app.post("/itlogin", async (req, res) => {
    const sql = "SELECT * FROM itlogin WHERE userID = ?";
    const values = [req.body.UCID];
    
    db.query(sql, values, (err, data) => {
        if (err) return res.json({ success: false, message: "Login Failed" });
        if (data.length === 0) {
            return res.json({ success: false, message: "No Record" });
        }

        // Compare the provided password with the stored hash
        const isValidPassword = bcrypt.compareSync(req.body.password, data[0].password);
        
        if (isValidPassword) {
            return res.json({ 
                success: true, 
                message: "Login Successful",
                userID: data[0].userID 
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
        const isValidPassword = bcrypt.compareSync(req.body.password, data[0].password);
        
        if (isValidPassword) {
            return res.json({ 
                success: true, 
                message: "Login Successful",
                userID: data[0].userID 
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
  const { LectureID, Enrollment_Limit, Enrollment_Current_Number, Building_Name, Room_Location, Semester_Name, Days, Start_time, End_time } = req.body;
  const { CourseID } = req.params; // Get the CourseID from the URL

  console.log("Received data for new lecture:", {
      LectureID, Enrollment_Limit, Enrollment_Current_Number, Building_Name,
      Room_Location, Semester_Name, Days, Start_time, End_time, CourseID
  });

  const q = `
    INSERT INTO lecture 
    (LectureID, CourseID, Enrollment_Limit, Enrollment_Current_Number, Building_Name, Room_Location, Semester_Name, Days, Start_time, End_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(q, [
    LectureID, CourseID, Enrollment_Limit, Enrollment_Current_Number, Building_Name, 
    Room_Location, Semester_Name, Days, Start_time, End_time
  ], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Lecture has been created for CourseID " + CourseID);
  });
});


// Update an existing lecture
app.put("/lecture/:CourseID", (req, res) => {
  const { LectureID, CourseID, Enrollment_Limit, Enrollment_Current_Number, Building_Name, Room_Location, Semester_Name, Days, Start_time, End_time } = req.body;
  // const { CourseID } = req.params; 

  console.log("Received data to update lecture:", req.body);
  console.log("CourseID:", CourseID, "LectureID:", LectureID);

  const q = `
    UPDATE lecture 
    SET Enrollment_Limit = ?, Enrollment_Current_Number = ?, Building_Name = ?, Room_Location = ?, 
        Semester_Name = ?, Days = ?, Start_time = ?, End_time = ? 
    WHERE CourseID = ? AND LectureID = ?`;

  db.query(q, [
      Enrollment_Limit, Enrollment_Current_Number, Building_Name, 
      Room_Location, Semester_Name, Days, Start_time, End_time, CourseID, LectureID
  ], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Lecture has been updated");
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
        if (err) return res.json({ success: false, message: "Registration Failed" });
        return res.json({ success: true, message: "Registration Successful" });
    });
});

app.post("/itregister", (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    
    const sql = "INSERT INTO itlogin (userID, password) VALUES (?, ?)";
    const values = [req.body.UCID, hashedPassword];
    
    db.query(sql, values, (err, data) => {
        if (err) return res.json({ success: false, message: "Registration Failed" });
        return res.json({ success: true, message: "Registration Successful" });
    });
});

// Get Student's past courses
// app.get("/studentpages/PastCourses", (req, res) => {
//   const { StudentID } = req.query;

//   const q = `SELECT CourseID, StudentID FROM taken_by WHERE StudentID = ?`;

//   db.query(q, [StudentID], (err, data) => {
//     if (err) {
//         return res.status(500).json({ message: "Error fetching past courses", error: err });
//     }
//     res.status(200).json(data);
//   });
// });

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
      c.Concentration_Name, 
      p.CourseID AS Prerequisite, 
      a.CourseID AS Antirequisite,
      ma.Major,
      mi.Minor
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
  `;

  db.query(q, [StudentID], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching past courses", error: err });
    }
    res.status(200).json(data);
  });
});

// Get Student's Major and Minor
app.get("/studentpages/MyDegree", (req, res) => {
  const { StudentID } = req.query;

  const q = `
    SELECT 
      tm.StudentID, 
      tm.Major, 
      tn.Minor 
    FROM 
      take_major tm
    LEFT JOIN 
      take_minor tn 
    ON 
      tm.StudentID = tn.StudentID
    WHERE 
      tm.StudentID = ?
  `;

  db.query(q, [StudentID], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching major and minor", error: err });
    }
    res.status(200).json(data);
  });
});


app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.url} not found` });
});  