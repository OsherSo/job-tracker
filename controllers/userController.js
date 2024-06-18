import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import { StatusCodes } from "http-status-codes";

import Job from "../models/Job.js";
import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");

  res.status(StatusCodes.OK).json({ user });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "User updated successfully" });
};

export const getApplicationStats = async (req, res) => {
  const totalJobs = await Job.countDocuments();
  const totalUsers = await User.countDocuments();

  res.status(StatusCodes.OK).json({ totalJobs, totalUsers });
};
