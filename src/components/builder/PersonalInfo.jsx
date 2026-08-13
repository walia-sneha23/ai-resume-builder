import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  Sparkles,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import { useState } from "react";
import axios from "axios";

import { useResume } from "../../context/ResumeContext";

const API_URL =
  import.meta.env.VITE_API_URL;

function PersonalInfo({
  setActiveSection,
}) {
  const {
    resumeData,
    updateResume,
  } = useResume();

  const [aiLoading, setAiLoading] =
    useState(false);

  // ==========================================
  // Generate AI Professional Summary
  // ==========================================

  const handleGenerateSummary =
    async () => {
      try {
        setAiLoading(true);

        const token =
          localStorage.getItem("token");

        if (!token) {
          alert("Please login first.");
          return;
        }

        // ========================================
        // Job Role
        // ========================================

        const jobRole =
          resumeData.title?.trim() ||
          "MERN Stack Developer";

        // ========================================
        // Experience
        // ========================================

        const experienceText =
          Array.isArray(
            resumeData.experience
          ) &&
          resumeData.experience.length > 0
            ? resumeData.experience
                .map((item) =>
                  [
                    item.jobTitle ||
                      item.position ||
                      "",
                    item.company || "",
                    item.description ||
                      "",
                  ]
                    .filter(Boolean)
                    .join(" - ")
                )
                .join("\n")
            : "Fresher";

        // ========================================
        // Skills
        // ========================================

        let skillsText = "";

        if (
          Array.isArray(
            resumeData.skills
          ) &&
          resumeData.skills.length > 0
        ) {
          skillsText =
            resumeData.skills
              .map((skill) => {
                // Old format:
                // "React"

                if (
                  typeof skill ===
                  "string"
                ) {
                  return skill;
                }

                // New format:
                // {
                //   category:
                //     "Technical Skills",
                //   items: [...]
                // }

                if (
                  skill &&
                  Array.isArray(
                    skill.items
                  )
                ) {
                  return skill.items.join(
                    ", "
                  );
                }

                return "";
              })
              .filter(Boolean)
              .join(", ");
        }

        if (!skillsText) {
          skillsText =
            "React.js, Node.js, Express.js, MongoDB";
        }

        // ========================================
        // API Request
        // ========================================

        const response =
          await axios.post(
            `${API_URL}/api/ai/generate-summary`,
            {
              jobRole,
              experience:
                experienceText,
              skills: skillsText,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        // ========================================
        // Update Summary
        // ========================================

        if (
          response.data?.success &&
          response.data?.summary
        ) {
          updateResume(
            "summary",
            response.data.summary.trim()
          );

          alert(
            "Professional Summary generated successfully ✨"
          );
        } else {
          alert(
            "AI could not generate the summary."
          );
        }
      } catch (error) {
        console.error(
          "GENERATE SUMMARY ERROR:",
          error
        );

        alert(
          error.response?.data
            ?.message ||
            "Failed to generate professional summary."
        );
      } finally {
        setAiLoading(false);
      }
    };

  return (
    <div className="min-w-0 rounded-2xl bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-8">
      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div className="min-w-0">
        <h2 className="text-2xl font-bold leading-tight text-slate-800 sm:text-3xl">
          Personal Information
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
          Fill in your basic details to start
          building your resume.
        </p>
      </div>

      {/* ====================================== */}
      {/* Personal Information */}
      {/* ====================================== */}

      <div className="mt-5 grid min-w-0 grid-cols-1 gap-4 sm:mt-6 sm:gap-5 xl:grid-cols-2">
        {/* Full Name */}

        <div className="min-w-0">
          <label className="mb-2 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
            <User size={18} />
            Full Name
          </label>

          <input
            type="text"
            value={
              resumeData.fullName || ""
            }
            onChange={(e) =>
              updateResume(
                "fullName",
                e.target.value
              )
            }
            placeholder="Enter your full name"
            className="box-border w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Email */}

        <div className="min-w-0">
          <label className="mb-2 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
            <Mail size={18} />
            Email
          </label>

          <input
            type="email"
            value={resumeData.email || ""}
            onChange={(e) =>
              updateResume(
                "email",
                e.target.value
              )
            }
            placeholder="Enter your email"
            className="box-border w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Phone */}

        <div className="min-w-0">
          <label className="mb-2 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
            <Phone size={18} />
            Phone
          </label>

          <input
            type="text"
            value={resumeData.phone || ""}
            onChange={(e) =>
              updateResume(
                "phone",
                e.target.value
              )
            }
            placeholder="Enter phone number"
            className="box-border w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Location */}

        <div className="min-w-0">
          <label className="mb-2 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
            <MapPin size={18} />
            Location
          </label>

          <input
            type="text"
            value={
              resumeData.location || ""
            }
            onChange={(e) =>
              updateResume(
                "location",
                e.target.value
              )
            }
            placeholder="City, State"
            className="box-border w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Professional Title */}

        <div className="min-w-0">
          <label className="mb-2 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
            <Briefcase size={18} />
            Professional Title
          </label>

          <input
            type="text"
            value={resumeData.title || ""}
            onChange={(e) =>
              updateResume(
                "title",
                e.target.value
              )
            }
            placeholder="e.g. Cloud Engineer"
            className="box-border w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* LinkedIn */}

        <div className="min-w-0">
          <label className="mb-2 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
            <FaLinkedin size={18} />
            LinkedIn
          </label>

          <input
            type="text"
            value={
              resumeData.linkedin || ""
            }
            onChange={(e) =>
              updateResume(
                "linkedin",
                e.target.value
              )
            }
            placeholder="LinkedIn profile URL"
            className="box-border w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* GitHub */}

        <div className="min-w-0">
          <label className="mb-2 flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
            <FaGithub size={18} />
            GitHub
          </label>

          <input
            type="text"
            value={
              resumeData.github || ""
            }
            onChange={(e) =>
              updateResume(
                "github",
                e.target.value
              )
            }
            placeholder="GitHub profile URL"
            className="box-border w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>
      </div>

      {/* ====================================== */}
      {/* Professional Summary */}
      {/* ====================================== */}

      <div className="mt-6 min-w-0 sm:mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
            <FileText size={18} />
            Professional Summary
          </label>

          {/* AI Generate Button */}

          <button
            type="button"
            onClick={
              handleGenerateSummary
            }
            disabled={aiLoading}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-400 sm:w-auto"
          >
            <Sparkles
              size={16}
              className={
                aiLoading
                  ? "animate-spin"
                  : ""
              }
            />

            {aiLoading
              ? "Generating..."
              : "Generate with AI"}
          </button>
        </div>

        <textarea
          rows="7"
          value={
            resumeData.summary || ""
          }
          onChange={(e) =>
            updateResume(
              "summary",
              e.target.value
            )
          }
          placeholder="Write your professional summary or generate it using AI..."
          className="mt-3 box-border w-full min-w-0 resize-none rounded-xl border border-slate-300 px-4 py-3 leading-6 outline-none transition focus:border-blue-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
        />

        <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            AI creates an ATS-friendly summary
            based on your role, experience and
            skills.
          </p>

          <p className="shrink-0 text-xs text-slate-400">
            {
              (
                resumeData.summary ||
                ""
              ).length
            }{" "}
            characters
          </p>
        </div>
      </div>

      {/* ====================================== */}
      {/* Continue */}
      {/* ====================================== */}

      <div className="mt-7 flex justify-stretch sm:mt-8 sm:justify-end">
        <button
          type="button"
          onClick={() => {
            if (setActiveSection) {
              setActiveSection(
                "education"
              );
            }
          }}
          className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
        >
          Save & Continue →
        </button>
      </div>
    </div>
  );
}

export default PersonalInfo;