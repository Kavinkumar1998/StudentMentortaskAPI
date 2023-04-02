import mongoose from "mongoose";
import express from "express"
import {Student} from "../model/Student.js";
import {Mentor}  from "../model/Mentor.js";
const router = express.Router();


//api for creating student
router.post("/createStudents",async (req,res)=>{
    try{
        const{StudentName,Eamil,Batch,Course}=req.body;
        const userstudent = await Student.findOne({StudentName:StudentName});
        if(userstudent){
            res.status(400).json({message:"Student already exists"})
        }
        else{
            const student = await new Student(req.body).save();
            if(!student){
                res.status(400).json({message:"error creating student"})
            }else{
                res.status(200).json({meassage:"Student created successfully"})
            }
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

// Define route to assign Student to Mentor-------------------------------------------

router.put("/addmentor", async (req,res)=>{
    try{
const {StudentName,MentorName} =req.body;
const student = await Student.findOne({StudentName:StudentName})
const mentor = await Mentor.findOne({MentorName:MentorName});
if(!student && !mentor){
    res.status(400).json({message:"Student and Mentor found"})
}
else{
   const updateStudent = await Student.findOneAndUpdate({StudentName: student.StudentName},{Mentor:mentor.MentorName});
    const updateMentor = await Mentor.updateOne({MentorName: mentor.MentorName},{$push:{Students:student.StudentName}});
          res.status(200).json({message:"updated sucessfully"})
}
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
})

// Define route to get list of available Students for assignment----------------------------------------------
router.get("/studentwithoutmentor", async (req,res)=>{
try{
    const students = await Student.find({ Mentor: { $exists: false } });
    res.status(200).json({ message: 'List of available Students for assignment', students: students});
}
catch(error){
   res.status(500).json({message:"Internal Server Error"});
}
})

//api to Assign or Change Mentor for particular Student--------------------------------------------

router.put("/editmentor/:studentId/:mentorId", async (req,res)=>{
    try{
        const student = await Student.findById(req.params.studentId);
    if (student.Mentor) {
        const currentMentor = await Mentor.findOneAndUpdate({MentorName:student.Mentor},{Students:""});
        const currentstudent= await Student.findOneAndUpdate({StudentName:student.StudentName},{Mentor:null})
      }
      const newMentor = await Mentor.findByIdAndUpdate({_id:req.params.mentorId},{Students:student.StudentName});
      const newStudent = await Student.findByIdAndUpdate({_id:req.params.studentId},{Mentor:newMentor.MentorName});
      res.status(200).json({message: 'Mentor assigned to Student successfully',student:newStudent, mentor:newMentor});
    }
    catch(error)
    {
    console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

///API to show all students for a particular mentor
router.get("/mentor/:mentorId/students",async(req,res)=>{
    try{
        const mentor = await Mentor.findById(req.params.mentorId).populate('Students');
        res.status(200).json({ message: `Students for ${mentor.MentorName} retrieved successfully`, students: mentor.Students})
    }
  catch(error){
    res.status(500).json({message:"Internal server error"})
  }

})





export const studentRouter=router;


