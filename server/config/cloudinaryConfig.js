//REVIEW[epic=demo, seq=10] 10. create config file for cloudinary

import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
};
export { cloudinaryConfig };