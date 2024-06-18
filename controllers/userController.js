import { StatusCodes } from "http-status-codes";

import Job from "../models/Job.js";
import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");

  res.status(StatusCodes.OK).json({ user });
};

export const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body, {
    new: true,
  }).select("-password");

  res.status(StatusCodes.OK).json({ user: updatedUser });
};

export const getApplicationStats = async (req, res) => {
  const totalJobs = await Job.countDocuments();
  const totalUsers = await User.countDocuments();

  res.status(StatusCodes.OK).json({ totalJobs, totalUsers });
};
