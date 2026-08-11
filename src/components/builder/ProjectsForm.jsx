import {
  FolderKanban,
  Plus,
  Trash2,
  Globe,
  Sparkles,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "axios";

import { useResume } from "../../context/ResumeContext";

function ProjectsForm({ setActiveSection }) {
  const { resumeData, updateResume } =
    useResume();

  const [aiLoading, setAiLoading] =
    useState(null);

  // ==========================================
  // Projects
  // ==========================================

  const [projects, setProjects] =
    useState(
      resumeData.projects?.length
        ? resumeData.projects
        : []
    );

  // ==========================================
  // Sync Projects With Context
  // ==========================================

  useEffect(() => {
    updateResume(
      "projects",
      projects
    );
  }, [projects]);

  // ==========================================
  // Update Project
  // ==========================================

  const updateProject = (
    index,
    field,
    value
  ) => {
    const updatedProjects = [
      ...projects,
    ];

    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };

    setProjects(updatedProjects);
  };

  // ==========================================
  // Add Project
  // ==========================================

  const addProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        github: "",
        liveLink: "",
        technologies: "",
      },
    ]);
  };

  // ==========================================
  // Remove Project
  // ==========================================

  const removeProject = (index) => {
    setProjects(
      projects.filter(
        (_, projectIndex) =>
          projectIndex !== index
      )
    );
  };

  // ==========================================
  // Generate Project Description With AI
  // ==========================================

  const generateAIProject = async (
    index
  ) => {
    try {
      setAiLoading(index);

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

      const project =
        projects[index];

      // ========================================
      // Validation
      // ========================================

      if (!project.title?.trim()) {
        alert(
          "Please enter Project Title first."
        );
        return;
      }

      if (
        !project.technologies?.trim()
      ) {
        alert(
          "Please enter Technologies Used first."
        );
        return;
      }

      // ========================================
      // AI Request
      // ========================================

      const response =
        await axios.post(
          "http://localhost:5000/api/ai/generate-project-description",
          {
            projectName:
              project.title.trim(),

            techStack:
              project.technologies.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      // ========================================
      // Update Description
      // ========================================

      if (
        response.data?.success &&
        response.data?.description
      ) {
        updateProject(
          index,
          "description",
          response.data.description.trim()
        );

        alert(
          "AI project description generated successfully ✨"
        );
      } else {
        alert(
          "AI could not generate project description."
        );
      }
    } catch (error) {
      console.error(
        "AI PROJECT ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to generate AI project description."
      );
    } finally {
      setAiLoading(null);
    }
  };

  // ==========================================
  // Continue
  // ==========================================

  const handleContinue = () => {
    updateResume(
      "projects",
      projects
    );

    setActiveSection(
      "certifications"
    );
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">

      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <FolderKanban
            className="text-blue-600"
            size={28}
          />

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Projects
            </h2>

            <p className="text-slate-500">
              Showcase your best projects.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Project
        </button>

      </div>

      {/* ====================================== */}
      {/* Empty State */}
      {/* ====================================== */}

      {projects.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">

          <FolderKanban
            size={34}
            className="mx-auto mb-3 text-slate-300"
          />

          <p className="font-medium text-slate-600">
            No projects added yet
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Add your best projects to
            showcase your skills.
          </p>

          <button
            type="button"
            onClick={addProject}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            Add Project
          </button>

        </div>
      )}

      {/* ====================================== */}
      {/* Projects */}
      {/* ====================================== */}

      <div className="space-y-6">

        {projects.map(
          (project, index) => (

            <div
              key={index}
              className="space-y-6 rounded-xl border border-slate-200 p-6"
            >

              {/* ================================= */}
              {/* Project Title */}
              {/* ================================= */}

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Project Title
                </label>

                <input
                  type="text"
                  value={
                    project.title || ""
                  }
                  onChange={(e) =>
                    updateProject(
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="AI Resume Builder"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* ================================= */}
              {/* Technologies */}
              {/* ================================= */}

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Technologies Used
                </label>

                <input
                  type="text"
                  value={
                    project.technologies ||
                    ""
                  }
                  onChange={(e) =>
                    updateProject(
                      index,
                      "technologies",
                      e.target.value
                    )
                  }
                  placeholder="React, Node.js, MongoDB, Express..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* ================================= */}
              {/* Description */}
              {/* ================================= */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label className="block font-medium text-slate-700">
                    Project Description
                  </label>

                  <span className="text-xs text-slate-400">
                    ATS-friendly
                  </span>

                </div>

                <textarea
                  rows="5"
                  value={
                    project.description ||
                    ""
                  }
                  onChange={(e) =>
                    updateProject(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Describe your project..."
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 leading-6 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />

                {/* AI Button */}

                <div className="mt-3 flex items-center justify-between">

                  <p className="text-xs text-slate-400">
                    Generate a concise professional
                    project description using AI.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      generateAIProject(
                        index
                      )
                    }
                    disabled={
                      aiLoading === index
                    }
                    className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-400"
                  >

                    <Sparkles
                      size={16}
                      className={
                        aiLoading === index
                          ? "animate-spin"
                          : ""
                      }
                    />

                    {aiLoading === index
                      ? "Generating..."
                      : "Generate with AI"}

                  </button>

                </div>

                {/* Character Count */}

                <p className="mt-1 text-right text-xs text-slate-400">
                  {
                    (
                      project.description ||
                      ""
                    ).length
                  }{" "}
                  characters
                </p>

              </div>

              {/* ================================= */}
              {/* Links */}
              {/* ================================= */}

              <div className="grid gap-5 md:grid-cols-2">

                {/* GitHub */}

                <div>
                  <label className="mb-2 flex items-center gap-2 font-medium text-slate-700">
                    <FaGithub size={18} />
                    GitHub Link
                  </label>

                  <input
                    type="text"
                    value={
                      project.github ||
                      ""
                    }
                    onChange={(e) =>
                      updateProject(
                        index,
                        "github",
                        e.target.value
                      )
                    }
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Live Demo */}

                <div>
                  <label className="mb-2 flex items-center gap-2 font-medium text-slate-700">
                    <Globe size={18} />
                    Live Demo
                  </label>

                  <input
                    type="text"
                    value={
                      project.liveLink ||
                      ""
                    }
                    onChange={(e) =>
                      updateProject(
                        index,
                        "liveLink",
                        e.target.value
                      )
                    }
                    placeholder="https://yourproject.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

              {/* ================================= */}
              {/* Remove */}
              {/* ================================= */}

              <div className="flex justify-end">

                <button
                  type="button"
                  onClick={() =>
                    removeProject(index)
                  }
                  className="flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={18} />
                  Remove
                </button>

              </div>

            </div>

          )
        )}

      </div>

      {/* ====================================== */}
      {/* Navigation */}
      {/* ====================================== */}

      <div className="mt-8 flex items-center justify-between">

        <button
          type="button"
          onClick={() =>
            setActiveSection(
              "skills"
            )
          }
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          ← Previous
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Save & Continue →
        </button>

      </div>

    </div>
  );
}

export default ProjectsForm;