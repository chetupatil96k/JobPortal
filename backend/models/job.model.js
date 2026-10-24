
import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    jobType:{
        type:String,
       required:true,
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        Ref:'Company',
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        Ref:'User',
        required:true
    },
    application:{
        type:mongoose.Schema.Types.ObjectId,
        Ref:'Application',
    }

    


},{timestamps:true});

export const Job = mongoose.model("Job",jobSchema);