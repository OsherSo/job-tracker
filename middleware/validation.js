import mongoose from "mongoose";
import { body, param, validationResult } from "express-validator";

import Job from "../models/Job.js";
import User from "../models/User.js";

import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("Job not found")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("Unauthorized")) {
          throw new UnauthorizedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

const isNonEmptyString = (field) =>
  body(field).isString().notEmpty().withMessage(`${field} is required`);

const validateEmail = () =>
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
    });

const validatePassword = () =>
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long");

const validateOptionalField = (field, values) =>
  body(field).optional().isIn(values).withMessage(`Invalid ${field}`);

export const validateJob = withValidationErrors([
  isNonEmptyString("company"),
  isNonEmptyString("position"),
  isNonEmptyString("location"),
  validateOptionalField("status", Object.values(JOB_STATUS)),
  validateOptionalField("type", Object.values(JOB_TYPE)),
]);

export const validateJobId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      throw new BadRequestError("Invalid job id");
    }

    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError("Job not found");
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("Unauthorized");
    }
  }),
]);

export const validateRegisterInput = withValidationErrors([
  isNonEmptyString("name"),
  validateEmail(),
  validatePassword(),
  isNonEmptyString("location"),
  isNonEmptyString("lastName"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

const validateUniqueEmail = (field = "email") =>
  body(field)
    .notEmpty()
    .withMessage(`${field} is required`)
    .isEmail()
    .withMessage(`invalid ${field} format`)
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError(`${field} already exists`);
      }
    });

export const validateUpdateUserInput = withValidationErrors([
  isNonEmptyString("name"),
  validateUniqueEmail(),
  isNonEmptyString("lastName"),
  isNonEmptyString("location"),
]);
