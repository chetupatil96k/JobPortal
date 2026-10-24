import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";;

dotenv.config();
const app = express();



//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
};

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on port ${PORT}`);
}); 