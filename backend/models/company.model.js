import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true   
    },
    location:{
        type:String,
    },
    logo:{
        type:String,

    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true});

export const Company = mongoose.model("Company",CompanySchema);