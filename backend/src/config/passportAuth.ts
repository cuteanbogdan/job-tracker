import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error(
    "ACCESS_TOKEN_SECRET is not defined in the environment variables"
  );
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET as string,
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
