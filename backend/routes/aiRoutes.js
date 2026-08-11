import express from "express";
import {
  generateSummary,
  generateSkills,
  generateProjectDescription,
  generateExperience,
  generateAchievements,
  generateCoverLetter,
  analyzeATS,
} from "../controllers/aiController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// AI Resume Summary
// ==========================================
router.post("/generate-summary", protect, generateSummary);

// ==========================================
// AI Skills Generator
// ==========================================
router.post("/generate-skills", protect, generateSkills);

// ==========================================
// AI Project Description Generator
// ==========================================
router.post(
  "/generate-project-description",
  protect,
  generateProjectDescription
);

// ==========================================
// AI Experience Generator
// ==========================================
router.post(
  "/generate-experience",
  protect,
  generateExperience
);

// ==========================================
// AI Achievement Generator
// ==========================================
router.post(
  "/generate-achievements",
  protect,
  generateAchievements
);

// ==========================================
// AI Cover Letter Generator
// ==========================================
router.post(
  "/generate-cover-letter",
  protect,
  generateCoverLetter
);

// ==========================================
// ATS Resume Analyzer
// ==========================================
router.post(
  "/analyze-ats",
  protect,
  analyzeATS
);

export default router;