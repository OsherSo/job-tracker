import { body } from "express-validator";

import withValidationErrors from "./withValidationErrors.js";
import {
  isNonEmptyString,
  validateEmail,
  validatePassword,
  validateUniqueEmail,
} from "./commonValidations.js";

const validateRegisterInput = withValidationErrors([
  isNonEmptyString("name"),
  validateEmail(),
  validatePassword(),
  isNonEmptyString("location"),
  isNonEmptyString("lastName"),
]);

const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

const validateUpdateUserInput = withValidationErrors([
  isNonEmptyString("name"),
  validateUniqueEmail(),
  isNonEmptyString("lastName"),
  isNonEmptyString("location"),
]);

export { validateRegisterInput, validateLoginInput, validateUpdateUserInput };
