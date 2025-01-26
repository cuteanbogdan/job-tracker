import { body, ValidationChain } from "express-validator";

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
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Applied", "Rejected", "No response", "Had Interview", "Had OA"])
    .withMessage("Invalid status value"),
];
