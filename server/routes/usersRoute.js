import express from "express";
import { uploadUserPicture, signUp, login } from "../controller/usersController.js";
import { multerUploads } from "../middlewares/multer.js";
const router = express.Router();

router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);

router.post("/signup", signUp);

router.post("/login",login);
export default router;
