import { Router } from "express";
import { login, register } from "../controllers/authControllers";
import {
  registerValidation,
  loginValidation,
} from "../validation/authValidation";
import { validateRequest } from "../validation/validationMiddleware";
const router = Router();

// POST /register - Register a new user
router.post("/register", registerValidation, validateRequest, register);

// POST /login - Login user and issue tokens
router.post("/login", loginValidation, validateRequest, login);

// // POST /refresh - Refresh access token using refresh token in cookies
// router.post("/refresh-token", refreshToken);

// // POST /logout - Logout and clear refresh token
// router.post("/logout", logout);

export default router;
