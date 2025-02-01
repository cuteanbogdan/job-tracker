import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportConfig from "./passportAuth";

export const configureMiddleware = (app: Application): void => {
  app.use(cors());

  app.use(express.json());
  app.use(cookieParser());

  app.use(passport.initialize());
  passportConfig(passport);
};
