import mongoose from "mongoose";
import { body, param, validationResult } from "express-validator";

import Job from "../models/Job.js";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

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
