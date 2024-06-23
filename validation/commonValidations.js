import { body } from "express-validator";

import User from "../models/User.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";

const validateId = async (model, id, userId, isAdmin) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`Invalid ${model} id`);
  }

  const entity = await model.findById(id);
  if (!entity) {
    throw new NotFoundError(`${model} not found`);
  }

  const isOwner = userId === entity.createdBy.toString();
  if (!isAdmin && !isOwner) {
    throw new UnauthorizedError("Unauthorized");
  }
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

const validatePassword = () =>
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long");

const validateOptionalField = (field, values) =>
  body(field).optional().isIn(values).withMessage(`Invalid ${field}`);

export {
  validateId,
  isNonEmptyString,
  validateEmail,
  validateUniqueEmail,
  validatePassword,
  validateOptionalField,
};
