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

app.listen(8800, () => {
    console.log("Connected to backend");
});
