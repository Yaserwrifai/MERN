import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import citiesRoute from "./routes/citiesRoute.js";
import museumsRoute from "./routes/museumsRoute.js";
import usersRoute from "./routes/usersRoute.js";
import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
import passport from "passport";
import { passportConfig } from "./config/passport.js";

const app = express();
const port = process.env.PORT || 5000;

const addMiddleware = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  //REVIEW[epic=demo, seq=11] 11. Import cloudinary config function and call it with the other middlewares..
  cloudinaryConfig();
  app.use(passport.initialize());
  passportConfig(passport)
};

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
  });
};

const mongoBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log(`MongoDB is connected on port ${port} `);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

const loadRoutes = () => {
  //app.use("/api/users", router);
  app.use("/api/cities", citiesRoute);
  app.use("/api/museums", museumsRoute);
  //REVIEW[epic=demo, seq=1] 1.  create new route for users and import the usersRoute
  app.use("/api/users", usersRoute);
};

(async function controller() {
  await mongoBConnection();
  addMiddleware();
  loadRoutes();
  startServer();
})();
