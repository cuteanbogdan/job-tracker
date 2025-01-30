import express, { Application } from "express";
import cors from "cors";
import passport from "passport";
import passportConfig from "./passportAuth";

export const configureMiddleware = (app: Application): void => {
  app.use(cors());

  app.use(express.json());

  app.use(passport.initialize());
  passportConfig(passport);
};
