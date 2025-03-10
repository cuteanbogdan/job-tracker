import { Request, Response } from "express";
import Job from "../models/Job";
import logger from "../config/logger";
import { IUser } from "../models/User";
import mongoose from "mongoose";

export const createJob = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser | undefined;
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { companyName, jobTitle, linkJD, jobField, textJD } = req.body;

    const job = new Job({
      userId: user.id,
      companyName,
      jobTitle,
      linkJD,
      jobField,
      textJD,
      status: "Applied",
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
      message: "An error occurred while creating the job",
    });
    return;
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser | undefined;
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { page = 1, limit = 10, status, search, dateFilter } = req.query;
    // Build the filter object
    const filter: Record<string, any> = { userId: user.id };
    if (status) filter.status = status;

    if (dateFilter) {
      filter.created_at = { $lte: new Date(dateFilter as string) };
    }

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
    const user = req.user as IUser | undefined;
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const job = await Job.findOne({ _id: id, userId: user.id });

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
    const user = req.user as IUser | undefined;
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const deletedJob = await Job.findOneAndDelete({
      _id: id,
      userId: user.id,
    });

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
    const user = req.user as IUser | undefined;
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { id } = req.params;

    const updatedJob = await Job.findOneAndUpdate(
      { _id: id, userId: user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

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

export const getJobStats = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser | undefined;
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const totalJobs = await Job.countDocuments({ userId: user.id });
    const totalApplied = await Job.countDocuments({
      userId: user.id,
      status: "Applied",
    });
    const totalRejected = await Job.countDocuments({
      userId: user.id,
      status: "Rejected",
    });
    const totalNoResponse = await Job.countDocuments({
      userId: user.id,
      status: "No response",
    });
    const totalInterviewsOrOAs = await Job.countDocuments({
      userId: user.id,
      status: { $in: ["Had Interview", "Had OA"] },
    });

    const monthlyApplications = await Job.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(String(user.id)),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({
      success: true,
      message: "Jobs stats retrieved successfully",
      data: {
        totalJobs,
        totalApplied,
        totalRejected,
        totalNoResponse,
        totalInterviewsOrOAs,
        monthlyApplications,
      },
    });
    return;
  } catch (error) {
    logger.error("Error fetching job stats: ", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving job stats",
    });
    return;
  }
};

export const updateJobStatuses = async (req: Request, res: Response) => {
  try {
    const user = req.user as IUser | undefined;
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const { jobIds, newStatus } = req.body;

    if (!Array.isArray(jobIds) || jobIds.length === 0) {
      res
        .status(400)
        .json({ success: false, message: "Invalid job IDs provided" });
      return;
    }

    if (!newStatus) {
      res
        .status(400)
        .json({ success: false, message: "New status is required" });
      return;
    }

    const result = await Job.updateMany(
      { _id: { $in: jobIds }, userId: user.id },
      { $set: { status: newStatus } }
    );

    res.status(200).json({
      success: true,
      message: "Jobs updated successfully",
      modifiedCount: result.modifiedCount,
    });
    return;
  } catch (error) {
    logger.error("Error updating job statuses:", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while updating job statuses",
    });
    return;
  }
};
