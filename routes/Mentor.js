import express from "express";
import { Mentor} from "../model/Mentor.js";
const router = express.Router(); 

//api for creating mentor
router.post("/createMentor", async (req,res)=>{
    try{
const {MentorName,Email,Expertise}= req.body;
const userMentor = await Mentor.findOne({MentorName: req.body.MentorName});
if(userMentor){
    res.status(400).json({message:"Mentor already exists"})
}else{const mentor = await new Mentor(req.body).save();
    if(!mentor){
        res.status(400).json({message:"error creating Mentor"})
    }
    else{
        res.status(200).json({message:"Mentor successfully craeted"})
    }
}
    }
    catch(error){
res.status(500).json({message:"Internal Server Error"})
    }
})
export const mentorRouter=router;