import "express-async-errors";

import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";

import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";

import errorHandler from "./middleware/errorHandler.js";
import { authenticateUser } from "./middleware/auth.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./public")));

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/tasks", authenticateUser, taskRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

const port = process.env.PORT || 5100;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server running on PORT ${port}....`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
