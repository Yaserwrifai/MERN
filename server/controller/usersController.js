import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";
import bcrypt from "bcrypt";
import { verifyPassword } from "../utils/encryptPassword.js";
import { issueToken } from "../utils/jwt.js";

const uploadUserPicture = async (req, res) => {
  console.log("req.boy", req.boy);

  try {
    console.log("req.file :>> ", req.file); 
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "suricatas-spike",
    });
    console.log("uploadResult", uploadResult); 
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

const signUp = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ msg: "user already exists" });
    } else {
      const hashedPassword = await encryptPassword(req.body.password);

      const newUser = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        avatarPicture: req.body.avatarPicture,
      });

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

const login = async (req, res) => {
  const existingUser = await userModel.findOne({ email: req.body.email });
  if (!existingUser) {
    res.status(401).json({ msg: "user not found" });
  } else {
    const verified = await verifyPassword(
      req.body.password,
      existingUser.password
    );
    if (!verified) {
      res.status(401).json({ msg: "password is incorrect" });
    } else {
      console.log("you are logged in");
      const token = issueToken(existingUser.id);
      res.status(201).json({
        msg: "logged in succesfully",
        user: {
          userName: existingUser.userName,
          email: existingUser.email,
          avatarPicture: existingUser.avatarPicture,
          id: existingUser._id,
        },
        token,
      });
    }
  }
};

export { uploadUserPicture, signUp, login };