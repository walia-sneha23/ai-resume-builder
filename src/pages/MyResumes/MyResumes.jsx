import {
  Plus,
  ArrowLeft,
  Search,
  Eye,
  Pencil,
  Download,
  Trash2,
  X,
  Target,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import ResumePreview from "../../components/builder/ResumePreview";
import { useResume } from "../../context/ResumeContext";

function MyResumes() {
  const navigate = useNavigate();

  const { setResumeData } = useResume();

  const [resumes, setResumes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [previewResume, setPreviewResume] =
    useState(null);

  const [downloadingId, setDownloadingId] =
    useState(null);

  // ==========================================
  // Fetch Resumes
  // ==========================================

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setResumes([]);
        return;
      }

      const res = await axios.get(
        `${API_URL}/api/resumes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "RESUMES FROM BACKEND:",
        res.data
      );

      const data =
        res.data.resumes ||
        res.data.data ||
        res.data;

      setResumes(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Failed to fetch resumes:",
        error
      );

      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Normalize Template Name
  // ==========================================

  const normalizeTemplate = (template) => {
    if (!template) {
      return "Professional";
    }

    const templates = [
      "Professional",
      "Modern",
      "Minimal",
      "Creative",
      "Corporate",
      "ATS Friendly",
    ];

    const foundTemplate = templates.find(
      (item) =>
        item.toLowerCase() ===
        String(template).toLowerCase()
    );

    return foundTemplate || "Professional";
  };

  // ==========================================
  // Convert Backend Resume → Frontend Format
  // ==========================================

  const convertResumeData = (resume) => {
    const personalInfo =
      resume.personalInfo || {};

    const education =
      resume.education?.[0] || {};

    const experience = Array.isArray(
      resume.experience
    )
      ? resume.experience.map((item) => ({
          jobTitle:
            item.position ||
            item.jobTitle ||
            "",
          company: item.company || "",
          location: item.location || "",
          startDate:
            item.startDate || "",
          endDate:
            item.endDate || "",
          description:
            item.description || "",
        }))
      : [];

    const projects = Array.isArray(
      resume.projects
    )
      ? resume.projects.map((item) => ({
          title: item.title || "",
          technologies:
            item.technologies || "",
          description:
            item.description || "",
          github: item.github || "",
          liveDemo:
            item.liveLink ||
            item.liveDemo ||
            "",
        }))
      : [];

    // ==========================================
    // Skills
    // Supports:
    // ["React", "Node.js"]
    //
    // and:
    // [
    //   {
    //     category: "Technical Skills",
    //     items: ["React", "Node.js"]
    //   }
    // ]
    // ==========================================

    let skills = [];

    if (Array.isArray(resume.skills)) {
      resume.skills.forEach((skill) => {
        if (typeof skill === "string") {
          skills.push(skill);
        } else if (
          skill &&
          typeof skill === "object" &&
          Array.isArray(skill.items)
        ) {
          skills.push(...skill.items);
        }
      });
    }

    // ==========================================
    // Certifications
    // ==========================================

    const certifications = Array.isArray(
      resume.certifications
    )
      ? resume.certifications.map((item) => ({
          title:
            item.title ||
            item.name ||
            "",
          issuer:
            item.issuer ||
            item.issuedBy ||
            "",
          year:
            item.year ||
            item.issueDate ||
            "",
          credentialId:
            item.credentialId || "",
        }))
      : [];

    // ==========================================
    // Languages
    // ==========================================

    const languages = Array.isArray(
      resume.languages
    )
      ? resume.languages
      : [];

    return {
      fullName:
        personalInfo.fullName || "",
      email:
        personalInfo.email || "",
      phone:
        personalInfo.phone || "",
      location:
        personalInfo.address || "",
      linkedin:
        personalInfo.linkedin || "",
      github:
        personalInfo.github || "",

      title: resume.title || "",

      summary:
        personalInfo.summary || "",

      education: {
        degree:
          education.degree || "",
        college:
          education.institute || "",
        startYear:
          education.startYear || "",
        endYear:
          education.endYear || "",
        cgpa:
          education.cgpa || "",
      },

      experience,
      projects,
      skills,
      certifications,
      languages,
    };
  };

  // ==========================================
  // Store Selected Resume
  // ==========================================

  const selectResume = (resume) => {
    if (!resume?._id) {
      return;
    }

    localStorage.setItem(
      "selectedResumeId",
      resume._id
    );

    const template = normalizeTemplate(
      resume.template
    );

    localStorage.setItem(
      "selectedTemplate",
      template
    );
  };

  // ==========================================
  // Preview
  // ==========================================

  const handlePreview = (resume) => {
    const formattedData =
      convertResumeData(resume);

    selectResume(resume);

    setResumeData(formattedData);

    setPreviewResume(resume);
  };

  // ==========================================
  // Edit Resume
  // ==========================================

  const handleEdit = (resume) => {
    const formattedData =
      convertResumeData(resume);

    selectResume(resume);

    setResumeData(formattedData);

    navigate("/resume-builder");
  };

  // ==========================================
  // Analyze ATS
  // ==========================================

  const handleAnalyzeATS = (resume) => {
    selectResume(resume);

    navigate(
      `/ats-analyzer/${resume._id}`
    );
  };

  // ==========================================
  // Download PDF
  // ==========================================

  const handleDownload = async (resume) => {
    try {
      setDownloadingId(resume._id);

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          `${API_URL}/api/pdf/download/${resume._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );

      const blob = new Blob(
        [response.data],
        {
          type: "application/pdf",
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download = `${
        resume.title || "resume"
      }.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "PDF Download Error:",
        error
      );

      let message =
        "Failed to download PDF.";

      if (error.response?.data) {
        try {
          const text =
            await error.response.data.text();

          const data = JSON.parse(text);

          message =
            data.message || message;
        } catch {
          // Keep default message
        }
      }

      alert(message);
    } finally {
      setDownloadingId(null);
    }
  };

  // ==========================================
  // Delete Resume
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this resume?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/api/resumes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumes((prev) =>
        prev.filter(
          (resume) =>
            resume._id !== id
        )
      );

      if (
        localStorage.getItem(
          "selectedResumeId"
        ) === id
      ) {
        localStorage.removeItem(
          "selectedResumeId"
        );
      }

      alert(
        "Resume deleted successfully ✅"
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete resume."
      );
    }
  };

  // ==========================================
  // Search
  // ==========================================

  const filteredResumes =
    resumes.filter((resume) =>
      (resume.title || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">
          Loading your resumes...
        </p>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="relative space-y-6">
      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            My Resumes
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all your resumes in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/resume-builder")
          }
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Resume
        </button>
      </div>

      {/* ====================================== */}
      {/* Search */}
      {/* ====================================== */}

      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search resume..."
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* ====================================== */}
      {/* No Resumes */}
      {/* ====================================== */}

      {filteredResumes.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">
            {search
              ? "No matching resumes found"
              : "No resumes yet"}
          </h2>

          <p className="mt-2 text-slate-500">
            {search
              ? "Try another resume title."
              : "Create your first resume to get started."}
          </p>

          {!search && (
            <button
              type="button"
              onClick={() =>
                navigate("/resume-builder")
              }
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Create Resume
            </button>
          )}
        </div>
      )}

      {/* ====================================== */}
      {/* Resume Cards */}
      {/* ====================================== */}

      {filteredResumes.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredResumes.map(
            (resume) => {
              const template =
                normalizeTemplate(
                  resume.template
                );

              const atsScore =
                resume.atsScore ??
                resume.ats?.score ??
                resume.atsAnalysis?.score ??
                null;

              return (
                <div
                  key={resume._id}
                  className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-lg"
                >
                  {/* Resume Header */}

                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">
                        {resume.title ||
                          "Untitled Resume"}
                      </h2>

                      <p className="mt-1 text-slate-500">
                        {template} Template
                      </p>
                    </div>

                    {/* ATS Score */}

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      ATS{" "}
                      {typeof atsScore ===
                      "number"
                        ? `${Math.round(
                            atsScore
                          )}%`
                        : "--"}
                    </span>
                  </div>

                  {/* Updated */}

                  <p className="mt-5 text-sm text-slate-500">
                    Updated{" "}
                    {resume.updatedAt
                      ? new Date(
                          resume.updatedAt
                        ).toLocaleDateString()
                      : "Recently"}
                  </p>

                  {/* ================================= */}
                  {/* Actions */}
                  {/* ================================= */}

                  <div className="mt-6 flex gap-3">
                    {/* Preview */}

                    <button
                      type="button"
                      title="Preview"
                      onClick={() =>
                        handlePreview(
                          resume
                        )
                      }
                      className="rounded-lg bg-slate-100 p-3 transition hover:bg-blue-100"
                    >
                      <Eye size={18} />
                    </button>

                    {/* Edit */}

                    <button
                      type="button"
                      title="Edit"
                      onClick={() =>
                        handleEdit(resume)
                      }
                      className="rounded-lg bg-slate-100 p-3 transition hover:bg-green-100"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Analyze ATS */}

                    <button
                      type="button"
                      title="Analyze ATS"
                      onClick={() =>
                        handleAnalyzeATS(
                          resume
                        )
                      }
                      className="rounded-lg bg-slate-100 p-3 transition hover:bg-violet-100"
                    >
                      <Target size={18} />
                    </button>

                    {/* Download */}

                    <button
                      type="button"
                      title="Download PDF"
                      onClick={() =>
                        handleDownload(
                          resume
                        )
                      }
                      disabled={
                        downloadingId ===
                        resume._id
                      }
                      className="rounded-lg bg-slate-100 p-3 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Download size={18} />

                      {downloadingId ===
                        resume._id && (
                        <span className="sr-only">
                          Downloading...
                        </span>
                      )}
                    </button>

                    {/* Delete */}

                    <button
                      type="button"
                      title="Delete"
                      onClick={() =>
                        handleDelete(
                          resume._id
                        )
                      }
                      className="rounded-lg bg-slate-100 p-3 transition hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}

      {/* ====================================== */}
      {/* Preview Modal */}
      {/* ====================================== */}

      {previewResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-slate-100 shadow-2xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b bg-white px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {previewResume.title ||
                    "Resume Preview"}
                </h2>

                <p className="text-sm text-slate-500">
                  {normalizeTemplate(
                    previewResume.template
                  )}{" "}
                  Template
                </p>
              </div>

              <button
  type="button"
  onClick={() =>
    setPreviewResume(null)
  }
  className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-100 hover:text-blue-700"
>
  <ArrowLeft size={18} />
  Back to My Resumes
</button>
            </div>

            {/* Modal Body */}

            <div className="overflow-y-auto p-6">
              <div className="mx-auto max-w-3xl">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyResumes;