import { Router } from "express";

import upload from "../middleware/multer.js";
import { authorizePermissions, checkForTestUser } from "../middleware/auth.js";
import { validateUpdateUserInput } from "../validation/userValidation.js";

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get(
  "/admin/app-stats",
  authorizePermissions("admin"),
  getApplicationStats
);
router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

export default router;
