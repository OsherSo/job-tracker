import { StatusCodes } from "http-status-codes";

import User from "../models/User.js";

import { createJWT } from "../utils/token.js";
import { hashPassword, comparePassword } from "../utils/password.js";

import { UnauthenticatedError } from "../errors/customErrors.js";

export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isUserValid =
    user && (await comparePassword(req.body.password, user.password));
  if (!isUserValid) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1 * 24 * 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "User logged in" });
};
