import { param } from "express-validator";

import Task from "../models/Task.js";
import { withValidationErrors } from "./withValidationErrors";
import { isNonEmptyString, validateOptionalField } from "./commonValidations";

const validateTask = withValidationErrors([
  isNonEmptyString("title"),
  isNonEmptyString("description"),
  validateOptionalField("priority", Object.values(TASK_PRIORITY)),
]);

const validateTaskId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isAdmin = req.user.role === "admin";
    await validateId(Task, value, req.user.userId, isAdmin);
  }),
]);

export { validateTask, validateTaskId };
