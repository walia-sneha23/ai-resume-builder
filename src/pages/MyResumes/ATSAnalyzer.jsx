import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ATSAnalyzer() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [jobRole, setJobRole] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  // ==========================================
  // Fetch Resume
  // ==========================================

  useEffect(() => {
    if (!id) {
      navigate("/my-resumes");
      return;
    }

    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/resumes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        response.data.resume ||
        response.data.data ||
        response.data;

      setResume(data);

      setJobRole(
        data?.title || "MERN Stack Developer"
      );
    } catch (error) {
      console.error(
        "FETCH ATS RESUME ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to load resume."
      );

      navigate("/my-resumes");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Analyze ATS
  // ==========================================

  const handleAnalyze = async () => {
    try {
      if (!resume) {
        alert("Resume data not available.");
        return;
      }

      if (!jobRole.trim()) {
        alert("Please enter a target job role.");
        return;
      }

      setAnalyzing(true);
      setAnalysis(null);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

      const personalInfo =
        resume.personalInfo || {};

      const summary =
        personalInfo.summary || "";

      // ==========================================
      // Skills
      // ==========================================

      let skills = [];

      if (Array.isArray(resume.skills)) {
        resume.skills.forEach((skill) => {
          if (typeof skill === "string") {
            skills.push(skill);
          } else if (
            Array.isArray(skill?.items)
          ) {
            skills.push(...skill.items);
          }
        });
      }

      // ==========================================
      // Experience
      // ==========================================

      const experience = Array.isArray(
        resume.experience
      )
        ? resume.experience
            .map((item) =>
              [
                item.position ||
                  item.jobTitle ||
                  "",
                item.company || "",
                item.startDate || "",
                item.endDate || "",
                item.description || "",
              ]
                .filter(Boolean)
                .join(" - ")
            )
            .join("\n")
        : "";

      // ==========================================
      // Projects
      // ==========================================

      const projects = Array.isArray(
        resume.projects
      )
        ? resume.projects
            .map((project) =>
              [
                project.title || "",
                project.technologies || "",
                project.description || "",
              ]
                .filter(Boolean)
                .join(" - ")
            )
            .join("\n")
        : "";

      // ==========================================
      // AI Request
      // ==========================================

      const response = await axios.post(
        "http://localhost:5000/api/ai/analyze-ats",
        {
          summary,
          skills,
          experience,
          projects,
          jobRole: jobRole.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data?.success &&
        response.data?.analysis
      ) {
        const aiAnalysis =
          response.data.analysis;

        // ==========================================
        // Save ATS Score to Database
        // ==========================================

        const score = Number(
          aiAnalysis.score || 0
        );

        try {
          await axios.put(
            `http://localhost:5000/api/resumes/${id}`,
            {
              atsScore: score,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(
            "ATS SCORE SAVED:",
            score
          );

          setResume((prev) => ({
            ...prev,
            atsScore: score,
          }));
        } catch (saveError) {
          console.error(
            "ATS SCORE SAVE ERROR:",
            saveError
          );

          alert(
            saveError.response?.data?.message ||
              "Analysis completed, but ATS score could not be saved."
          );
        }

        setAnalysis(aiAnalysis);
      } else {
        alert(
          "AI could not analyze this resume."
        );
      }
    } catch (error) {
      console.error(
        "ATS ANALYSIS ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "ATS analysis failed. Please try again."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <Sparkles
            size={32}
            className="mx-auto mb-3 animate-pulse text-violet-600"
          />

          <p className="text-slate-500">
            Loading resume...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Page
  // ==========================================

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={() =>
              navigate("/my-resumes")
            }
            className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to My Resumes
          </button>

          <h1 className="text-3xl font-bold text-slate-800">
            ATS Resume Analyzer
          </h1>

          <p className="mt-2 text-slate-500">
            Analyze your resume with AI and
            improve your ATS compatibility.
          </p>
        </div>

        <div className="hidden rounded-2xl bg-violet-100 p-4 sm:block">
          <Target
            size={32}
            className="text-violet-600"
          />
        </div>
      </div>

      {/* Resume Info */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-800">
            {resume?.title ||
              "Untitled Resume"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Tell AI which job you are targeting.
          </p>
        </div>

        <label className="mb-2 block font-medium text-slate-700">
          Target Job Role
        </label>

        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            value={jobRole}
            onChange={(e) =>
              setJobRole(e.target.value)
            }
            placeholder="e.g. MERN Stack Developer"
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
          />

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-400"
          >
            <Search
              size={18}
              className={
                analyzing
                  ? "animate-spin"
                  : ""
              }
            />

            {analyzing
              ? "Analyzing..."
              : "Analyze Resume"}
          </button>
        </div>
      </div>

      {/* Empty State */}

      {!analysis && !analyzing && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Sparkles
            size={42}
            className="mx-auto mb-4 text-violet-500"
          />

          <h2 className="text-xl font-bold text-slate-800">
            Ready to analyze your resume?
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-slate-500">
            Enter your target job role above and
            let AI check your resume for ATS
            compatibility, strengths,
            improvements, and missing keywords.
          </p>
        </div>
      )}

      {/* Analysis Result */}

      {analysis && (
        <div className="space-y-6">
          {/* ATS Score */}

          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-8 border-violet-100">
              <div>
                <p className="text-4xl font-bold text-violet-600">
                  {analysis.score || 0}%
                </p>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  ATS Score
                </p>
              </div>
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-800">
              {analysis.score >= 80
                ? "Excellent Resume!"
                : analysis.score >= 60
                ? "Good Resume"
                : "Needs Improvement"}
            </h2>

            <p className="mt-2 text-slate-500">
              Target Role:{" "}
              <span className="font-semibold text-slate-700">
                {jobRole}
              </span>
            </p>

            <p className="mt-3 text-sm font-medium text-green-600">
              ✓ ATS score saved to your resume
            </p>
          </div>

          {/* Strengths */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-3">
                <CheckCircle
                  size={22}
                  className="text-green-600"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Strengths
                </h2>

                <p className="text-sm text-slate-500">
                  What your resume is doing well.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {Array.isArray(
                analysis.strengths
              ) &&
                analysis.strengths.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-xl bg-green-50 p-4"
                    >
                      <CheckCircle
                        size={18}
                        className="mt-0.5 shrink-0 text-green-600"
                      />

                      <p className="text-sm text-slate-700">
                        {item}
                      </p>
                    </div>
                  )
                )}
            </div>
          </div>

          {/* Improvements */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-3">
                <AlertTriangle
                  size={22}
                  className="text-amber-600"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Improvements
                </h2>

                <p className="text-sm text-slate-500">
                  Changes that can improve your
                  ATS score.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {Array.isArray(
                analysis.improvements
              ) &&
                analysis.improvements.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-xl bg-amber-50 p-4"
                    >
                      <AlertTriangle
                        size={18}
                        className="mt-0.5 shrink-0 text-amber-600"
                      />

                      <p className="text-sm text-slate-700">
                        {item}
                      </p>
                    </div>
                  )
                )}
            </div>
          </div>

          {/* Missing Keywords */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3">
                <Search
                  size={22}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Missing Keywords
                </h2>

                <p className="text-sm text-slate-500">
                  Keywords that may help for your
                  target role.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {Array.isArray(
                analysis.missingKeywords
              ) &&
                analysis.missingKeywords.map(
                  (keyword, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                    >
                      {keyword}
                    </span>
                  )
                )}
            </div>
          </div>

          {/* Analyze Again */}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing}
              className="flex items-center gap-2 rounded-xl border border-violet-300 px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Sparkles size={18} />
              Analyze Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ATSAnalyzer;