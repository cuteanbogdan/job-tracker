import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { configureMiddleware } from "./config/middlewareForApp";
import connectDB from "./config/db";
import logger from "./config/logger";

dotenv.config();

const app: Application = express();

connectDB();
configureMiddleware(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Working job tracker");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on PORT: ${PORT}`));
