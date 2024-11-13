import express from "express";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

app.use(cors());

app.listen(8800, () => {
    console.log("Connected to backend");
});
