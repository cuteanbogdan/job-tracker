import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";
import { IUser } from "../models/User";
import jwt from "jsonwebtoken";

dotenv.config();

if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error(
    "ACCESS_TOKEN_SECRET is not defined in the environment variables"
  );
}

if (!process.env.REFRESH_TOKEN_SECRET) {
  throw new Error(
    "REFRESH_TOKEN_SECRET is not defined in the environment variables"
  );
}

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET,
};

export default (passport: passport.PassportStatic) => {
  passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
      try {
        if (jwtPayload.id) {
          return done(null, { id: jwtPayload.id });
        }
        return done(null, false);
      } catch (error) {
        console.error("Error in Passport Strategy:", error);
        return done(error, false);
      }
    })
  );
};

export const generateAccessToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
