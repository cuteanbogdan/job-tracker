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

const router = Router();

// POST / - Create a new job entry in the DB
router.post("/", creatingJobValidation, validateRequest, createJob);

// GET / - Retrieve all jobs from the DB
router.get("/", getJobs);

// GET /:id - Retrieve a single job by its ID
router.get("/:id", getJobById);

// PUT /:id - Update a job entry by its ID
router.put("/:id", validateUpdateJob, updateJob);

// DELETE /:id - Delete a job entry by its ID
router.delete("/:id", deleteJob);

export default router;
