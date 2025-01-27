import { Request, Response } from "express";
import Job from "../models/Job";
import logger from "../config/logger";

export const createJob = async (req: Request, res: Response) => {
  try {
    const { companyName, jobTitle, linkJD, jobField, textJD, status } =
      req.body;

    const job = new Job({
      companyName,
      jobTitle,
      linkJD,
      jobField,
      textJD,
      status,
    });

    const savedJob = await job.save();

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: savedJob,
    });
    return;
  } catch (error) {
    logger.error("Error creating the job: ", error);

    res.status(500).json({
      success: false,
      message: "An error occured while creating the job",
    });
    return;
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    // Build the filter object
    const filter: Record<string, any> = {};
    if (status) filter.status = status;

    if (search) {
      filter.$or = [
        { jobTitle: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
      ];
    }

    const pageNumber = parseInt(page as string, 10);
    const pageLimit = parseInt(limit as string, 10);

    const jobs = await Job.find(filter)
      .sort({ created_at: -1 })
      .skip((pageNumber - 1) * pageLimit)
      .limit(pageLimit);

    // Get the total number of jobs for metadata
    const totalJobs = await Job.countDocuments(filter);
    const totalPages = Math.ceil(totalJobs / pageLimit);

    res.status(200).json({
      success: true,
      message: "Jobs retrieved successfully",
      data: jobs,
      meta: {
        totalJobs,
        totalPages,
        currentPage: pageNumber,
        pageSize: pageLimit,
      },
    });
    return;
  } catch (error) {
    logger.error("Error fetching jobs:", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving jobs",
    });
    return;
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      res.status(404).json({
        success: false,
        message: `Job with ID ${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Job retrieved successfully",
      data: job,
    });
    return;
  } catch (error) {
    logger.error("Error fetching the job by ID:", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the job",
    });
    return;
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      res.status(404).json({
        success: false,
        message: `Job with ID ${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Job with ID ${id} deleted successfully`,
    });
    return;
  } catch (error) {
    logger.error("Error deleting the job:", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the job",
    });
    return;
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      res.status(404).json({
        success: false,
        message: `Job with ID ${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
    return;
  } catch (error) {
    logger.error("Error updating the job:", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while updating the job",
    });
    return;
  }
};
