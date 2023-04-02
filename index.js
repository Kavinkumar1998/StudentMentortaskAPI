import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { databaseConnection } from "./db.js";
import { mentorRouter } from "./routes/Mentor.js";
import { studentRouter } from "./routes/Students.js";


databaseConnection();
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT= process.env.PORT;

app.get("/",(req,res)=>{
    res.send("welcome to student/mentor api")
})

app.use("/api/mentor",mentorRouter);
app.use("/api/student",studentRouter);

app.listen(PORT,()=>console.log(`server started at ${PORT}`));