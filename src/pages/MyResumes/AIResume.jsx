import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Sparkles,
  FileText,
  Wand2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { useResume } from "../../context/ResumeContext";
const API_URL = import.meta.env.VITE_API_URL;
function AIResume() {
  const navigate = useNavigate();
  const { updateResume } = useResume();

  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usedInResume, setUsedInResume] = useState(false);

  const handleGenerate = async () => {
    setError("");
    setSummary("");
    setUsedInResume(false);

    if (!jobRole || !experience || !skills.trim()) {
      setError(
        "Please fill Job Title, Experience Level and Skills."
      );
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first to use AI Resume Generator.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
  `${API_URL}/api/ai/generate-summary`,
        {
          jobRole,
          experience,
          skills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSummary(res.data.summary);
    } catch (err) {
      console.error("AI Resume Error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to generate AI resume content. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUseInResume = () => {
    if (!summary) return;

    updateResume("summary", summary);
    updateResume("title", jobRole);

    setUsedInResume(true);

    setTimeout(() => {
      navigate("/resume-builder");
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
          <Sparkles size={24} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            AI Resume Generator
          </h1>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Generate professional resume content using AI.
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Create Your Resume with AI
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Enter your details and let AI create polished, ATS-friendly
            resume content for you.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Input Grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Job Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Job Title
            </label>

            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g. MERN Stack Developer"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-blue-900"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Experience Level
            </label>

            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-blue-900"
            >
              <option value="" disabled>
                Select experience
              </option>

              <option value="Fresher">Fresher</option>
              <option value="0-2 Years">0-2 Years</option>
              <option value="2-5 Years">2-5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Skills
          </label>

          <textarea
            rows="4"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g. React.js, Node.js, Express.js, MongoDB, JavaScript..."
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-blue-900"
          />
        </div>

        {/* Generate Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Wand2 className="h-4 w-4" />

            {loading ? "Generating..." : "Generate Resume"}
          </button>
        </div>
      </div>

      {/* AI Result */}
      {summary && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm dark:border-blue-900 dark:bg-blue-950/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Sparkles size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800 dark:text-white">
                AI Generated Professional Summary
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                ATS-friendly content generated by Gemini AI.
              </p>
            </div>
          </div>

          {/* Generated Summary */}
          <div className="mt-5 rounded-xl border border-blue-100 bg-white p-5 text-sm leading-7 text-slate-700 dark:border-blue-900 dark:bg-slate-800 dark:text-slate-200">
            {summary}
          </div>

          {/* Use in Resume */}
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleUseInResume}
              disabled={usedInResume}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {usedInResume ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Added to Resume
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4" />
                  Use in Resume
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <FileText className="h-6 w-6 text-blue-600" />

          <h3 className="mt-3 font-semibold text-slate-800 dark:text-white">
            Professional Content
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Generate polished and professional resume sections.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <CheckCircle2 className="h-6 w-6 text-green-600" />

          <h3 className="mt-3 font-semibold text-slate-800 dark:text-white">
            ATS Friendly
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Create content optimized for applicant tracking systems.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Sparkles className="h-6 w-6 text-purple-600" />

          <h3 className="mt-3 font-semibold text-slate-800 dark:text-white">
            AI Powered
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Get intelligent suggestions tailored to your career goals.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIResume;