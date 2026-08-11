import { useState } from "react";
import axios from "axios";

import {
  FileText,
  Sparkles,
  Wand2,
  CheckCircle2,
  Briefcase,
  Copy,
  Check,
} from "lucide-react";

import { useResume } from "../../context/ResumeContext";

function CoverLetter() {
  const { resumeData } = useResume();

  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] =
    useState("");

  const [coverLetter, setCoverLetter] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // ==========================================
  // Generate Cover Letter
  // ==========================================

  const handleGenerate = async () => {
    setError("");
    setCopied(false);

    if (!jobTitle.trim()) {
      setError("Please enter the job title.");
      return;
    }

    if (!companyName.trim()) {
      setError("Please enter the company name.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError(
        "Please login before generating a cover letter."
      );
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // Prepare Skills
      // ==========================================

      const skills = Array.isArray(
        resumeData.skills
      )
        ? resumeData.skills
            .map((skill) => {
              if (typeof skill === "string") {
                return skill;
              }

              if (
                skill &&
                typeof skill === "object"
              ) {
                if (skill.name) {
                  return skill.name;
                }

                if (skill.skill) {
                  return skill.skill;
                }

                if (Array.isArray(skill.items)) {
                  return skill.items.join(", ");
                }
              }

              return "";
            })
            .filter(Boolean)
            .join(", ")
        : "";

      // ==========================================
      // Prepare Experience
      // ==========================================

      const experience = Array.isArray(
        resumeData.experience
      )
        ? resumeData.experience
            .map((item) => {
              const position =
                item.jobTitle ||
                item.position ||
                "";

              const company =
                item.company || "";

              const description =
                item.description || "";

              return [
                position,
                company,
                description,
              ]
                .filter(Boolean)
                .join(" - ");
            })
            .filter(Boolean)
            .join("\n")
        : "";

      // ==========================================
      // API Request
      // ==========================================

      const response = await axios.post(
        "http://localhost:5000/api/ai/generate-cover-letter",
        {
          fullName:
            resumeData.fullName || "",
          jobRole: jobTitle.trim(),
          companyName: companyName.trim(),
          experience,
          skills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data?.success &&
        response.data?.coverLetter
      ) {
        setCoverLetter(
          response.data.coverLetter
        );
      } else {
        setError(
          response.data?.message ||
            "Failed to generate cover letter."
        );
      }
    } catch (err) {
      console.error(
        "Cover Letter Generation Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to generate cover letter. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Copy Cover Letter
  // ==========================================

  const handleCopy = async () => {
    if (!coverLetter) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        coverLetter
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Copy Cover Letter Error:",
        error
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              AI Cover Letter
            </h1>

            <p className="mt-1 text-slate-500">
              Generate professional cover letters
              tailored to your job.
            </p>
          </div>
        </div>
      </div>

      {/* Generator Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Create Your Cover Letter
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the job details and let AI create
            a personalized cover letter for you.
          </p>
        </div>

        {/* Form */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Job Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Title
            </label>

            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={jobTitle}
                onChange={(e) =>
                  setJobTitle(e.target.value)
                }
                placeholder="e.g. Frontend Developer"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Company Name
            </label>

            <input
              type="text"
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
              placeholder="e.g. Google"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Job Description */}
        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Job Description
          </label>

          <textarea
            rows="6"
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            placeholder="Paste the job description here..."
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Generate */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Wand2 className="h-4 w-4" />

            {loading
              ? "Generating..."
              : "Generate Cover Letter"}
          </button>
        </div>
      </div>

      {/* Generated Cover Letter */}
      {coverLetter && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Generated Cover Letter
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your AI-generated professional cover
                letter.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-100 hover:text-blue-700"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
            {coverLetter}
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <Sparkles className="h-6 w-6 text-blue-600" />

          <h3 className="mt-3 font-semibold text-slate-800">
            AI Powered
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Generate personalized content using AI.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <CheckCircle2 className="h-6 w-6 text-green-600" />

          <h3 className="mt-3 font-semibold text-slate-800">
            Job Tailored
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Match your cover letter with the job
            requirements.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <FileText className="h-6 w-6 text-purple-600" />

          <h3 className="mt-3 font-semibold text-slate-800">
            Professional Format
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Create clean and professional cover
            letters.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CoverLetter;