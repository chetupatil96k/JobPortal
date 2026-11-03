
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// REGISTER USER
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // Validate required fields
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Validate role
        if (!["student", "recruiter"].includes(role)) {
            return res.status(400).json({
                message: "Invalid role",
                success: false
            });
        }

        // Check whether user already exists
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await User.create({
            fullname: fullname.trim(),
            email: normalizedEmail,
            phoneNumber: String(phoneNumber),
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.error("Register error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists",
                success: false
            });
        }

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// LOGIN USER
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email, password and role are required",
                success: false
            });
        }

        if (!["student", "recruiter"].includes(role)) {
            return res.status(400).json({
                message: "Invalid role",
                success: false
            });
        }

        // Find user
        const normalizedEmail = email.trim().toLowerCase();
        const user = await User.findOne({
            email: normalizedEmail
        });

        console.log("Entered email:", normalizedEmail);
console.log("User found:", !!user);

        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Verify password
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );
          console.log("Password matched:", isPasswordMatch);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Verify role
        if (role !== user.role) {
            return res.status(403).json({
                message: "Account does not exist with the selected role",
                success: false
            });
        }

        // Check JWT secret
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not configured");
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        // Return safe user data without password
        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user: userData,
                success: true
            });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// LOGOUT USER
export const logout = async (req, res) => {
    try {
        return res.status(200)
            .clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            })
            .json({
                message: "Logged out successfully",
                success: true
            });

    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// UPDATE USER PROFILE

export const updateProfile = async (req, res) => {
    try {
        

        const userId = req.id;

        const user = await User.findById(userId);

        

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (!user.profile) {
            user.profile = {};
        }

        const { fullname, email, phoneNumber, bio, skills } = req.body;

        if (fullname !== undefined) user.fullname = fullname;
        if (email !== undefined) user.email = email.trim().toLowerCase();
        if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
        if (bio !== undefined) user.profile.bio = bio;

        if (skills !== undefined) {
            user.profile.skills = Array.isArray(skills)
                ? skills
                : skills.split(",").map(s => s.trim()).filter(Boolean);
        }

        

        await user.save();

        

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });

    } catch (error) {
        console.error("UPDATE ERROR:", error);

        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
