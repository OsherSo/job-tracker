import { Router } from "express";

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";

import { checkForTestUser } from "../middleware/auth.js";
import { validateJob, validateJobId } from "../validation/jobValidation.js";

const router = Router();

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJob, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateJobId, getJob)
  .patch(checkForTestUser, validateJob, validateJobId, updateJob)
  .delete(checkForTestUser, validateJobId, deleteJob);

export default router;
