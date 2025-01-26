import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  logger.error("MONGO_URI is not defined in the environment variables");
  throw new Error("MONGO_URI is not defined in the enviroment variables");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    logger.info("Mongoose connection closed on app termination");
    process.exit(0);
  });
};

export default connectDB;
