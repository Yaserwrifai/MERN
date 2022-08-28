//REVIEW[epic=demo, seq=8] 8. Create usersController

//REVIEW[epic=demo, seq=9] 9. Install cloudinary, import V2 from cloudinary
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";
import bcrypt from "bcrypt";

//REVIEW[epic=demo, seq=12] 12. Define upload function
const uploadUserPicture = async (req, res) => {
  console.log("req.boy", req.boy);

  try {
    console.log("req.file :>> ", req.file); //Multer is storing the file in that property(objec) of the request object
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "myphoto",
    });
    console.log("uploadResult", uploadResult); //this show us the object with all the information about the upload, including the public URL in result.url
    res.status(200).json({
      message: "Image upload succesfull",
      imageUrl: uploadResult.url,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "image couldn't be uploaded", error: error });
  }
};

//REVIEW[epic=demo, seq=17] 17. Start implementing password encription: Install bcrypt
//REVIEW[epic=demo, seq=18] 18. Import bcrypt and create function to hash password and implement bcrypt technique
const encryptPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  } catch (error) {
    console.log("error hashing password", error);
  }
};

//REVIEW[epic=demo, seq=16] 16. Create signUp function
const signUp = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ msg: "user already exists" });
    } else {
      //REVIEW[epic=demo, seq=23] 23. good place to use express validator middleware, to validate email/password/any other fields.

      //REVIEW[epic=demo, seq=19] 19. use encryptPassword function to hash password coming from the request.
      const hashedPassword = await encryptPassword(req.body.password);

      //REVIEW[epic=demo, seq=20] 20. create new user Object with the encrypted password and the uploaded picture
      const newUser = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        avatarPicture: req.body.avatarPicture,
        //REVIEW[epic=demo, seq=22] 22. IF we include user Roles, we would have to include it in our newUser object (and Model)
      });
      //REVIEW[epic=demo, seq=21] 21. I "try" to save my new created user.

      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            userName: savedUser.userName,
            email: savedUser.email,
            avatarPicture: savedUser.avatarPicture,
          },
          msg: "User Registered successfully",
        });
      } catch (error) {
        res
          .status(409)
          .json({ message: "error while saving new user", error: error });
      }
    }
  } catch (error) {
    res
      .status(401)
      .json({ message: "registration not possible", error: error });
  }
};

export { uploadUserPicture, signUp };
