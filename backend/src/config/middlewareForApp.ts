import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportConfig from "./passportAuth";

export const configureMiddleware = (app: Application): void => {
  if (!process.env.FRONTEND_URL) {
    throw new Error("FRONTEND_URL is not defined in the environment variables");
  }

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

  app.use(express.json());
  app.use(cookieParser());

  app.use(passport.initialize());
  passportConfig(passport);
};
