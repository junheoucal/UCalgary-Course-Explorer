import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "m*ziLE4GD9YiCUHtgk-j",
  database: "coursedb",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
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
    "UPDATE course SET `CourseID` = ?, `Course_Name` = ?, `Level` = ?, `Course_Description`= ?, `Credits` = ?, `Department_Name` = ?, `Concentration_Name` = ? WHERE CourseId = ?";

  const values = [
    req.body.CourseID,
    req.body.Course_Name,
    req.body.Level,
    req.body.Course_Description,
    req.body.Credits,
    req.body.Department_Name,
    req.body.Concentration_Name,
  ];

  db.query(q, [...values, courseID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully");
  });
});

app.delete("/course/:CourseID", (req, res) => {
  const courseID = req.params.CourseID;
  const q = "DELETE FROM course WHERE CourseID = ?";

  db.query(q, [courseID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend");
});
