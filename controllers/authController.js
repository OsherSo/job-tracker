import { StatusCodes } from "http-status-codes";

import User from "../models/User.js";

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

  if (!user) throw new UnauthenticatedError("invalid credentials");

  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials");
  res.send("login route");
};
