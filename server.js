import "express-async-errors";

import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import jobRouter from "./routes/jobRouter.js";

import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/jobs", jobRouter);

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
