import { Request, Response } from "express";
import logger from "../config/logger";
import bcrypt from "bcryptjs";
import User from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../config/passportAuth";

const isProduction = process.env.NODE_ENV === "production";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      accessToken,
    });
    return;
  } catch (error) {
    logger.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while registering the user",
    });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
    });
    return;
  } catch (error) {
    logger.error("Error loggin in: ", error);
    res.status(500).json({
      success: false,
      message: "An error occured while loggin in",
    });
    return;
  }
};
