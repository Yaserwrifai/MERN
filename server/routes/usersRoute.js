import express from "express";
import { uploadUserPicture, signUp } from "../controller/usersController.js";
import { multerUploads } from "../middlewares/multer.js";
const router = express.Router();

//REVIEW[epic=demo, seq=2] 2. Create a "post" route
//REVIEW[epic=demo, seq=7] 7. Import multer function, call it in my route , using .single() method from Multer, to allow just one file per upload, with the Form field we assign for it.

router.post("/imageUpload", multerUploads.single("image"), uploadUserPicture);

//REVIEW[epic=demo, seq=15] 15. Create new signup route

router.post("/signup", signUp);
export default router;
