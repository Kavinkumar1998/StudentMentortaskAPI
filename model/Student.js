import mongoose from "mongoose";

const studentSchema= new mongoose.Schema({
    StudentName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Course:{
        type:String,
        required:true,
    },
    Mentor:{
        type:String
    }
})

const Student =  mongoose.model("Student",studentSchema);
export {Student}