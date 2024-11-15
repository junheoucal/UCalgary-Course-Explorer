import express from "express";
import cors from "cors";
import mysql from "mysql";

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

app.post("/itlogin", (req, res) => {
    const sql = "SELECT * FROM itlogin WHERE userID = ? AND password = ?";
    const values = [req.body.UCID, req.body.password];
    db.query(sql, values, (err, data) => {
        if (err) return res.json({ success: false, message: "Login Failed" });
        if (data.length > 0) {
            return res.json({ 
                success: true, 
                message: "Login Successful",
                userID: data[0].userID 
            });
        }
        return res.json({ success: false, message: "No Record" });
    });
});

app.post("/studentlogin", (req, res) => {
    const sql = "SELECT * FROM studentlogin WHERE userID = ? AND password = ?";
    const values = [req.body.UCID, req.body.password];
    db.query(sql, values, (err, data) => {
        if (err) return res.json({ success: false, message: "Login Failed" });
        if (data.length > 0) {
            return res.json({ 
                success: true, 
                message: "Login Successful",
                userID: data[0].userID 
            });
        }
        return res.json({ success: false, message: "No Record" });
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

app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.url} not found` });
});

app.listen(8800, () => {
    console.log("Connected to backend");
});
