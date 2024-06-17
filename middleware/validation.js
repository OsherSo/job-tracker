import mongoose from "mongoose";
import { body, param, validationResult } from "express-validator";

import Job from "../models/Job.js";
import User from "../models/User.js";

import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("Job not")) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJob = withValidationErrors([
  body("company").isString().notEmpty().withMessage("Company is required"),
  body("position").isString().notEmpty().withMessage("Position is required"),
  body("location").isString().notEmpty().withMessage("Location is required"),
  body("status")
    .isString()
    .optional()
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid status"),
  body("type")
    .isString()
    .optional()
    .isIn(Object.values(JOB_TYPE))
    .withMessage("Invalid type"),
]);

export const validateJobId = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("Invalid job id");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError("Job not found");
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);
