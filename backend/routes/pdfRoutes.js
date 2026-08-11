import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { downloadResumePDF } from "../controllers/pdfController.js";

const router = express.Router();

// ==========================================
// Download Resume PDF
// ==========================================
router.get(
  "/download/:id",
  protect,
  downloadResumePDF
);

export default router;