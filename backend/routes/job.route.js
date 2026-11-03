
import express from "express";
import { getJobById,getAllJobs,postJob,getAdminJobs } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/post").post(isAuthenticated, postJob);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

export default router;
