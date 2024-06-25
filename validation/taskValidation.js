import { param } from "express-validator";

import Task from "../models/Task.js";
import withValidationErrors from "./withValidationErrors.js";
import { validateId, isNonEmptyString } from "./commonValidations.js";

const validateTask = withValidationErrors([isNonEmptyString("description")]);

const validateTaskId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isAdmin = req.user.role === "admin";
    await validateId(Task, value, req.user.userId, isAdmin);
  }),
]);

export { validateTask, validateTaskId };
