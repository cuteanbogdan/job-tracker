import { Router } from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobsControllers";
import {
  creatingJobValidation,
  validateUpdateJob,
} from "../validation/jobsValidation";
import { validateRequest } from "../validation/validationMiddleware";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

// POST / - Create a new job entry in the DB
router.post(
  "/",
  authenticateJWT,
  creatingJobValidation,
  validateRequest,
  createJob
);

// GET / - Retrieve all jobs from the DB
router.get("/", authenticateJWT, getJobs);

// GET /:id - Retrieve a single job by its ID
router.get("/:id", authenticateJWT, getJobById);

// PUT /:id - Update a job entry by its ID
router.put("/:id", authenticateJWT, validateUpdateJob, updateJob);

// DELETE /:id - Delete a job entry by its ID
router.delete("/:id", authenticateJWT, deleteJob);

export default router;
