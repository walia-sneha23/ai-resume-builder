// routes/authRoutes.js

import express from "express";

import {
  testRoute,
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/authController.js";

import {
  validateRegister,
  validateLogin,
} from "../middleware/validateAuth.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/test", testRoute);

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

// Protected Routes
router.get("/me", protect, getCurrentUser);

router.post("/logout", protect, logoutUser);

export default router;