import {Job} from "../models/job.model.js";

export const postJob = async (req, res) => {
    try{
        const {title, description,requirements, location, salary, companyId,jobType,experience,position,} = req.body;
        const userId = req.id;

        if(!userId){
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        if(!title || !description || !requirements || !location || !salary || !companyId || !jobType || !experience || !position){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            location,
            salary: Number(salary),
            jobType,
            experienceLevel: Number(experience),
            position,
            company: companyId,
            createdBy: userId
        });

        return res.status(201).json({
            message: "Job posted successfully",
            job,
            success: true
        });
    }catch(err){
        console.log(err)
    }
}

// Tjis is for student to get all jobs

export const getAllJobs = async (req, res) => {
    try {
        const keywords = req.query.keywords
            ? req.query.keywords.split(",")
            : [];

        const query = keywords.length > 0
            ? {
                $or: [
                    { title: { $regex: keywords.join("|"), $options: "i" } },
                    { description: { $regex: keywords.join("|"), $options: "i" } },
                    { location: { $regex: keywords.join("|"), $options: "i" } }
                ]
            }
            : {};

      const jobs = await Job.find(query)
    .populate({
        path: "company",
    })
    .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Jobs retrieved successfully",
            jobs,
            success: true
        });

    } catch (err) {
        console.error("Get all jobs error:", err);

        return res.status(500).json({
            message: "Error retrieving jobs",
            success: false
        });
    }
};

export const getJobById = async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate("company", "name location").populate("createdBy", "fullname email");
             if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job retrieved successfully",
            job,
            success: true
        });

    }catch(err){
     console.log(err)
    }
}

// this is for admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ createdBy: adminId }).populate("company", "name location").populate("createdBy", "fullname email");

        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found for this admin",
                success: false
            });
        }

        return res.status(200).json({
            message: "Admin jobs retrieved successfully",
            jobs,
            success: true
        });
    }catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error retrieving admin jobs",
            success: false
        });
    }
}