import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";

// Dashboard Layout
import DashboardLayout from "./components/layout/DashboardLayout";

// Dashboard Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import ResumeBuilder from "./pages/Builder/ResumeBuilder";
import Templates from "./pages/Templates/Templates";

// My Resumes Pages
import MyResumes from "./pages/MyResumes/MyResumes.jsx";
import ATSAnalyzer from "./pages/MyResumes/ATSAnalyzer.jsx";
import AIResume from "./pages/MyResumes/AIResume.jsx";
import CoverLetter from "./pages/MyResumes/CoverLetter.jsx";
import Settings from "./pages/MyResumes/Settings.jsx";
import Profile from "./pages/MyResumes/Profile.jsx";
import Pricing from "./pages/MyResumes/Pricing.jsx";

function App() {
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") || "light";

    const root = document.documentElement;

    if (savedTheme === "dark") {
      root.classList.add("dark");
    } else if (savedTheme === "light") {
      root.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      root.classList.toggle(
        "dark",
        prefersDark
      );
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* ========================= */}
        {/* Public Routes */}
        {/* ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ========================= */}
        {/* Dashboard Routes */}
        {/* ========================= */}

        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/resume-builder"
            element={<ResumeBuilder />}
          />

          <Route
            path="/templates"
            element={<Templates />}
          />

          <Route
            path="/my-resumes"
            element={<MyResumes />}
          />

          {/* ATS Analyzer */}
          <Route
            path="/ats-analyzer/:id"
            element={<ATSAnalyzer />}
          />

          <Route
            path="/ai-resume"
            element={<AIResume />}
          />

          <Route
            path="/cover-letter"
            element={<CoverLetter />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/pricing"
            element={<Pricing />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;