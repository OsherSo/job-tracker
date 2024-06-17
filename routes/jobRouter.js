import { Router } from "express";

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

import { validateJob, validateJobId } from "../middleware/validation.js";

const router = Router();

router.route("/").get(getAllJobs).post(validateJob, createJob);
router
  .route("/:id")
  .get(validateJobId, getJob)
  .patch(validateJob, validateJobId, updateJob)
  .delete(validateJobId, deleteJob);

export default router;
