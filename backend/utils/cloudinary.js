import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
console.log("Cloud Name exists:", !!process.env.CLOUD_NAME);
console.log("API Key exists:", !!process.env.API_KEY);
console.log("API Secret exists:", !!process.env.API_SECRET);

export default cloudinary;