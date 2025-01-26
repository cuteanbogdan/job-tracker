import express, { Application } from "express";
import cors from "cors";

export const configureMiddleware = (app: Application): void => {
  app.use(cors());

  app.use(express.json());
};
