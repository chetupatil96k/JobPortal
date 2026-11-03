
import { Company } from "../models/company.model.js";

// Register Company
export const registerCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        const existingCompany = await Company.findOne({
            name: companyName.trim()
        });

        if (existingCompany) {
            return res.status(409).json({
                message: "Company already exists",
                success: false
            });
        }

        const company = await Company.create({
            name: companyName.trim(),
            description,
            website,
            location,
            userid: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });

    } catch (error) {
        console.error("Company registration error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// Get Companies of Logged-in User
export const getCompany = async (req, res) => {
    try {
        const userid = req.id;

        const companies = await Company.find({ userid });

        if (companies.length === 0) {
            return res.status(404).json({
                message: "No company found for this user",
                success: false
            });
        }

        return res.status(200).json({
            message: "Companies found successfully",
            companies,
            success: true
        });

    } catch (error) {
        console.error("Get company error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// Get Company By ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company found",
            company,
            success: true
        });

    } catch (error) {
        console.error("Get company by ID error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


// Update Company
export const updateCompany = async (req, res) => {
    try {
        const { name, description, location, website } = req.body;

        const updateData = {
            name,
            description,
            location,
            website
        };

        // Remove undefined fields
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

    const company = await Company.findOneAndUpdate(
    {
        _id: req.params.id,
        userid: req.id
    },
    {
        $set: updateData
    },
    {
        returnDocument: "after",
        runValidators: true
    }
);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company updated successfully",
            company,
            success: true
        });

    } catch (error) {
        console.error("Update company error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
