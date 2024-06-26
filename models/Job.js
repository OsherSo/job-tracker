import mongoose from "mongoose";

import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const jobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    status: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    type: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    location: {
      type: String,
      default: "my city",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
