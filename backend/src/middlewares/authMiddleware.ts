import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: unknown, user: unknown) => {
      if (err || !user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};
