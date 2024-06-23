import { param } from "express-validator";

import Job from "../models/Job.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import withValidationErrors from "./withValidationErrors.js";
import {
  validateId,
  isNonEmptyString,
  validateOptionalField,
} from "./commonValidations.js";

const validateJob = withValidationErrors([
  isNonEmptyString("company"),
  isNonEmptyString("position"),
  isNonEmptyString("location"),
  validateOptionalField("status", Object.values(JOB_STATUS)),
  validateOptionalField("type", Object.values(JOB_TYPE)),
]);

const validateJobId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isAdmin = req.user.role === "admin";
    await validateId(Job, value, req.user.userId, isAdmin);
  }),
]);

export { validateJob, validateJobId };
