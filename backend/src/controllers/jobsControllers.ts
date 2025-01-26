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
