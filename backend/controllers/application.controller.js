import {Job} from "../models/job.model.js";
import {Application} from "../models/application.model.js";

export const applyForJob = async (req, res) => {
    try{
        const jobId = req.params.jobId;
        const userId = req.id;
        
console.log("Job ID:", req.params.jobId);
console.log("MongoDB database:", Job.db.name);
        

        if(!jobId){
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }
        if(!userId){
            return res.status(400).json({
                message: "User ID is required",
                success: false
            });
        }

        

        //check if the job exists

        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }   

        // Check if the user has already applied for this job
        if(job.applications && job.applications.toString() === userId){
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        //create a new application and associate it with the job and user
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Application submitted successfully",
            application: newApplication,
            success: true
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Error applying for job",
            success: false
        });


    }



}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({createdAt:-1}).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        });

        if (!application) {
            return res.status(404).json({
                message: "No applications found for this user",
                success: false
            });
        }

        return res.status(200).json({
            message: "Applications retrieved successfully",
            applications: application,
            success: true
        });

    }catch (err) {
        console.log(err);
        return res.status(500).json({  

        })
    }
    
    }

    export const getApplicants= async(req,res)=>{
        try{
            const jobId=req.params.id;
            const job = await Job.findById(jobId).populate({
                path: "applications",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "applicant",
                }
            })

            if(!job){
                return res.status(404).json({
                    message: "Job not found",
                    success: false
                });
            }

            return res.status(200).json({
                message: "Applicants retrieved successfully",
                job,
                success: true
            });

        }catch(err){
            console.log(err);
            return res.status(500).json({
                message: "Error retrieving applicants",
                success: false
            });
        }
    }

    export const updateStatus = async(req,res)=>{
        try{
            const {id}=req.params;
            const {status}=req.body;

            if(!status){
                return res.status(400).json({
                    message: "Status is required",
                    success: false
                });
            }

            const application = await Application.findOne({ _id: id });

            if(!application){
                return res.status(404).json({
                    message: "Application not found",
                    success: false
                });
            }

            application.status=status.toLowerCase();
            await application.save();

            return res.status(200).json({
                message: "Status updated successfully",
                application,
                success: true
            });

        }catch(err){
            console.log(err);
            return res.status(500).json({
                message: "Error updating status",
                success: false
            });

        }
    }