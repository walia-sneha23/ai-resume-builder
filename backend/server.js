import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();

const app = express();

// ==============================
// CORS
// ==============================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://ai-resume-builder-smoky-five-11.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ==============================
// Connect MongoDB
// ==============================

connectDB();

// ==============================
// Routes
// ==============================

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/pdf", pdfRoutes);

// ==============================
// Home Route
// ==============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Resume Builder Backend Running 🚀",
  });
});

// ==============================
// 404 Route
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});