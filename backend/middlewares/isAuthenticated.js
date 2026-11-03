
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Verify JWT token
        const decode = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        if (!decode || !decode.userId) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        // Store user ID in request
        req.id = decode.userId;

        // Move to next middleware/controller
        next();

    } catch (error) {
        console.error("Authentication Error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};

export default isAuthenticated;
