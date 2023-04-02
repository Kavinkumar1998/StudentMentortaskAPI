import mongoose from "mongoose";

const mentorSchema= new mongoose.Schema({
    MentorName :{
        type : String,
        required :true,
    },
    Email:{
        type: String,
        required:true
    },
    Expertise:{
        type:String,
        required:true,
    },
    Students:[{
        type:String,
    }]
})

const Mentor = mongoose.model("Mentor",mentorSchema)
export {Mentor};