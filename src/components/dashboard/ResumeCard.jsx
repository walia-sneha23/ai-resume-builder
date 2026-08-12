import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Download,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
function ResumeCard() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Fetch Real Resumes
  // ==========================================

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
  `${API_URL}/api/resumes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        const resumeList = Array.isArray(data)
          ? data
          : Array.isArray(data.resumes)
          ? data.resumes
          : Array.isArray(data.data)
          ? data.data
          : [];

        // Latest resumes first
        const sortedResumes = [...resumeList].sort(
          (a, b) => {
            const dateA = new Date(
              a.updatedAt ||
                a.createdAt ||
                0
            ).getTime();

            const dateB = new Date(
              b.updatedAt ||
                b.createdAt ||
                0
            ).getTime();

            return dateB - dateA;
          }
        );

        setResumes(sortedResumes.slice(0, 3));
      } catch (error) {
        console.error(
          "ResumeCard Fetch Error:",
          error
        );

        setResumes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  // ==========================================
  // Format Updated Time
  // ==========================================

  const formatUpdatedTime = (resume) => {
    const date = new Date(
      resume.updatedAt ||
        resume.createdAt ||
        0
    );

    if (Number.isNaN(date.getTime())) {
      return "Recently";
    }

    const difference =
      Date.now() - date.getTime();

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} ${
        minutes === 1 ? "minute" : "minutes"
      } ago`;
    }

    const hours = Math.floor(
      minutes / 60
    );

    if (hours < 24) {
      return `${hours} ${
        hours === 1 ? "hour" : "hours"
      } ago`;
    }

    const days = Math.floor(
      hours / 24
    );

    if (days < 7) {
      return `${days} ${
        days === 1 ? "day" : "days"
      } ago`;
    }

    return date.toLocaleDateString();
  };

  // ==========================================
  // Get Resume Title
  // ==========================================

  const getResumeTitle = (resume) => {
    return (
      resume.title ||
      resume.personalInfo?.title ||
      "Untitled Resume"
    );
  };

  // ==========================================
  // Get Template
  // ==========================================

  const getTemplate = (resume) => {
    if (!resume.template) {
      return "Professional";
    }

    const template =
      String(resume.template);

    return (
      template.charAt(0).toUpperCase() +
      template.slice(1)
    );
  };

  // ==========================================
  // Get ATS Score
  // ==========================================

  const getATSScore = (resume) => {
    const score =
      resume.atsScore ??
      resume.ats?.score ??
      resume.atsAnalysis?.score;

    if (
      typeof score !== "number" ||
      Number.isNaN(score)
    ) {
      return null;
    }

    return Math.round(score);
  };

  // ==========================================
  // Open Resume
  // ==========================================

  const openResume = (resume) => {
    if (!resume?._id) {
      return;
    }

    localStorage.setItem(
      "selectedResumeId",
      resume._id
    );

    if (resume.template) {
      localStorage.setItem(
        "selectedTemplate",
        resume.template
      );
    }

    navigate("/resume-builder");
  };

  // ==========================================
  // Preview
  // ==========================================

  const handlePreview = (resume) => {
    openResume(resume);
  };

  // ==========================================
  // Edit
  // ==========================================

  const handleEdit = (resume) => {
    openResume(resume);
  };

  // ==========================================
  // Download
  // ==========================================

  const handleDownload = (resume) => {
    if (!resume?._id) {
      return;
    }

    localStorage.setItem(
      "selectedResumeId",
      resume._id
    );

    if (resume.template) {
      localStorage.setItem(
        "selectedTemplate",
        resume.template
      );
    }

    navigate("/resume-builder");
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Resumes
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Continue editing your latest resumes.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/my-resumes")
          }
          className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View All
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-xl border border-slate-200 p-6 text-center">
          <p className="text-sm text-slate-500">
            Loading resumes...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && resumes.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <FileText
            size={36}
            className="mx-auto text-slate-400"
          />

          <h3 className="mt-3 font-semibold text-slate-800">
            No resumes yet
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Create your first resume to see it here.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/resume-builder")
            }
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Create Resume
          </button>
        </div>
      )}

      {/* Resume List */}
      {!loading && resumes.length > 0 && (
        <div className="space-y-4">
          {resumes.map((resume) => {
            const atsScore =
              getATSScore(resume);

            return (
              <div
                key={resume._id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:border-blue-400 hover:shadow-md"
              >
                {/* Left */}
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                    <FileText
                      className="text-blue-600"
                      size={22}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-slate-800">
                      {getResumeTitle(resume)}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {getTemplate(resume)} Template
                    </p>

                    <div className="mt-2 flex items-center gap-3 text-xs">
                      {atsScore !== null ? (
                        <span className="rounded-full bg-emerald-100 px-2 py-1 font-medium text-emerald-700">
                          ATS {atsScore}%
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2 py-1 font-medium text-slate-500">
                          ATS --
                        </span>
                      )}

                      <span className="text-slate-400">
                        {formatUpdatedTime(resume)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="ml-4 flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    title="Preview"
                    onClick={() =>
                      handlePreview(resume)
                    }
                    className="rounded-lg bg-slate-100 p-2 transition hover:bg-blue-100 hover:text-blue-600"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    type="button"
                    title="Edit"
                    onClick={() =>
                      handleEdit(resume)
                    }
                    className="rounded-lg bg-slate-100 p-2 transition hover:bg-green-100 hover:text-green-600"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    title="Download"
                    onClick={() =>
                      handleDownload(resume)
                    }
                    className="rounded-lg bg-slate-100 p-2 transition hover:bg-violet-100 hover:text-violet-600"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ResumeCard;