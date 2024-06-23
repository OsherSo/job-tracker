import { Router } from "express";

import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import { checkForTestUser } from "../middleware/auth.js";
import { validateTask, validateTaskId } from "../validation/taskValidation.js";

const router = Router();

router
  .route("/")
  .get(getAllTasks)
  .post(checkForTestUser, validateTask, createTask);

router
  .route("/:id")
  .get(validateTaskId, getTask)
  .patch(checkForTestUser, validateTask, validateTaskId, updateTask)
  .delete(checkForTestUser, validateTaskId, deleteTask);

export default router;
