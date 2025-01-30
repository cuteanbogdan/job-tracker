import { body, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const creatingJobValidation: ValidationChain[] = [
  body("companyName")
    .notEmpty()
    .withMessage("Company name is required")
    .isString()
    .withMessage("Company name must be a string"),
  body("jobTitle")
    .notEmpty()
    .withMessage("Job title is required")
    .isString()
    .withMessage("Job title must be a string"),
  body("linkJD")
    .notEmpty()
    .withMessage("Job description link is required")
    .isURL()
    .withMessage("Job description link must be a valid URL"),
  body("jobField")
    .notEmpty()
    .withMessage("Job field is required")
    .isString()
    .withMessage("Job field must be a string"),
  body("textJD")
    .notEmpty()
    .withMessage("Job description text is required")
    .isString()
    .withMessage("Job description must be a string"),
];

export const validateUpdateJob = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const allowedFields = [
    "companyName",
    "jobTitle",
    "linkJD",
    "jobField",
    "textJD",
    "status",
    "created_at",
    "updated_at",
    "__v",
    "_id",
  ];
  const updates = Object.keys(req.body);

  // Check if all fields in the request body are valid
  const isValidOperation = updates.every((update) =>
    allowedFields.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).json({
      success: false,
      message: "Invalid field(s) provided for update",
    });
    return;
  }

  next();
};
