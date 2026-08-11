import { Save, Eye, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useResume } from "../../context/ResumeContext";

function BuilderHeader({ onPreview }) {
  const [selectedTemplate, setSelectedTemplate] =
    useState("None");

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const {
    resumeData,
    setResumeData,
    updateResume,
    saveResume,
  } = useResume();

  // ==========================================
  // Selected Template
  // ==========================================

  useEffect(() => {
    const template =
      localStorage.getItem("selectedTemplate");

    if (template) {
      setSelectedTemplate(template);
    }
  }, []);

  // ==========================================
  // Save Resume
  // ==========================================

  const handleSaveResume = async () => {
    try {
      setLoading(true);

      await saveResume();

      alert("Resume saved successfully ✅");
    } catch (error) {
      console.error(
        "SAVE RESUME ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to save resume."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Convert Skills To Text
  // ==========================================

  const getSkillsText = () => {
    if (
      !Array.isArray(resumeData.skills) ||
      resumeData.skills.length === 0
    ) {
      return "React.js, Node.js, Express.js, MongoDB";
    }

    return resumeData.skills
      .map((skill) => {
        if (typeof skill === "string") {
          return skill;
        }

        if (
          skill &&
          Array.isArray(skill.items)
        ) {
          return skill.items.join(", ");
        }

        if (skill?.name) {
          return skill.name;
        }

        return "";
      })
      .filter(Boolean)
      .join(", ");
  };

  // ==========================================
  // Experience Text
  // ==========================================

  const getExperienceText = () => {
    if (
      !Array.isArray(resumeData.experience) ||
      resumeData.experience.length === 0
    ) {
      return "Fresher";
    }

    return resumeData.experience
      .map((item) =>
        [
          item.jobTitle ||
            item.position ||
            "",
          item.company || "",
          item.description || "",
        ]
          .filter(Boolean)
          .join(" - ")
      )
      .join("\n");
  };

  // ==========================================
  // AI Improve
  // ==========================================

  const handleAIImprove = async () => {
    try {
      setAiLoading(true);

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const jobRole =
        resumeData.title ||
        "MERN Stack Developer";

      const skillsText =
        getSkillsText();

      const experienceText =
        getExperienceText();

      // ========================================
      // 1. Improve Summary
      // ========================================

      let improvedSummary =
        resumeData.summary || "";

      try {
        const summaryResponse =
          await axios.post(
            "http://localhost:5000/api/ai/generate-summary",
            {
              jobRole,
              experience:
                experienceText,
              skills: skillsText,
            },
            {
              headers,
            }
          );

        if (
          summaryResponse.data?.success &&
          summaryResponse.data?.summary
        ) {
          improvedSummary =
            summaryResponse.data.summary.trim();
        }
      } catch (error) {
        console.error(
          "SUMMARY AI ERROR:",
          error
        );
      }

      // ========================================
      // 2. Improve Experience
      // ========================================

      let improvedExperience =
        Array.isArray(
          resumeData.experience
        )
          ? [...resumeData.experience]
          : [];

      if (improvedExperience.length > 0) {
        improvedExperience =
          await Promise.all(
            improvedExperience.map(
              async (item) => {
                try {
                  const response =
                    await axios.post(
                      "http://localhost:5000/api/ai/generate-experience",
                      {
                        jobRole:
                          item.jobTitle ||
                          item.position ||
                          jobRole,

                        company:
                          item.company ||
                          "Company",

                        experienceLevel:
                          "Professional",
                      },
                      {
                        headers,
                      }
                    );

                  if (
                    response.data
                      ?.success &&
                    response.data
                      ?.experience
                  ) {
                    return {
                      ...item,
                     description:
  item.description || response.data.experience.trim(),
                    };
                  }

                  return item;
                } catch (error) {
                  console.error(
                    "EXPERIENCE AI ERROR:",
                    error
                  );

                  return item;
                }
              }
            )
          );
      }

      // ========================================
      // 3. Improve Projects
      // ========================================

      let improvedProjects =
        Array.isArray(
          resumeData.projects
        )
          ? [...resumeData.projects]
          : [];

      if (improvedProjects.length > 0) {
        improvedProjects =
          await Promise.all(
            improvedProjects.map(
              async (project) => {
                try {
                  const response =
                    await axios.post(
                      "http://localhost:5000/api/ai/generate-project-description",
                      {
                        projectName:
                          project.title ||
                          "Project",

                        techStack:
                          project.technologies ||
                          "React.js, Node.js, MongoDB",
                      },
                      {
                        headers,
                      }
                    );

                  if (
                    response.data
                      ?.success &&
                    response.data
                      ?.description
                  ) {
                    return {
                      ...project,
                    description:
  project.description ||
  response.data.description.trim(),
                    };
                  }

                  return project;
                } catch (error) {
                  console.error(
                    "PROJECT AI ERROR:",
                    error
                  );

                  return project;
                }
              }
            )
          );
      }

      // ========================================
      // 4. Generate AI Skills
      // ========================================

      let improvedSkills = [];

      try {
        const skillsResponse =
          await axios.post(
            "http://localhost:5000/api/ai/generate-skills",
            {
              jobRole,
              experience:
                experienceText,
            },
            {
              headers,
            }
          );

        if (
          skillsResponse.data?.success &&
          skillsResponse.data?.skills
        ) {
          const aiSkills =
            skillsResponse.data.skills;

          if (
            Array.isArray(
              aiSkills.technicalSkills
            ) &&
            aiSkills.technicalSkills.length >
              0
          ) {
            improvedSkills.push({
              category:
                "Technical Skills",
              items:
                aiSkills.technicalSkills,
            });
          }

          if (
            Array.isArray(
              aiSkills.softSkills
            ) &&
            aiSkills.softSkills.length > 0
          ) {
            improvedSkills.push({
              category:
                "Soft Skills",
              items:
                aiSkills.softSkills,
            });
          }
        }
      } catch (error) {
        console.error(
          "SKILLS AI ERROR:",
          error
        );
      }

      // ========================================
      // Keep Existing Skills If AI Failed
      // ========================================

      if (improvedSkills.length === 0) {
        improvedSkills =
          Array.isArray(
            resumeData.skills
          )
            ? resumeData.skills
            : [];
      }

      // ========================================
      // Update Entire Resume At Once
      // ========================================

      setResumeData((prev) => ({
        ...prev,

        summary:
          improvedSummary,

        experience:
          improvedExperience,

        projects:
          improvedProjects,

        skills:
          improvedSkills,
      }));

      // Also update summary directly
      // for compatibility with existing code
      updateResume(
        "summary",
        improvedSummary
      );

      alert(
        "AI improved your resume successfully! ✨\n\nSummary, experience, projects and skills have been updated.\n\nClick Save Resume to save the changes."
      );
    } catch (error) {
      console.error(
        "AI IMPROVE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "AI Improve failed. Please try again."
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between px-6 py-5">

        {/* ================================= */}
        {/* Left */}
        {/* ================================= */}

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Resume Builder
          </h1>

          <p className="text-sm text-slate-500">
            Build an ATS-friendly resume with AI
          </p>

          <p className="mt-1 text-sm font-medium text-blue-600">
            Selected Template:{" "}
            {selectedTemplate}
          </p>
        </div>

        {/* ================================= */}
        {/* Right */}
        {/* ================================= */}

        <div className="flex items-center gap-3">

          {/* Preview */}

          <button
            type="button"
            onClick={onPreview}
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <Eye size={18} />
            Preview
          </button>

          {/* AI Improve */}

          <button
            type="button"
            onClick={handleAIImprove}
            disabled={aiLoading}
            className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-violet-400"
          >
            <Sparkles
              size={18}
              className={
                aiLoading
                  ? "animate-spin"
                  : ""
              }
            />

            {aiLoading
              ? "Improving..."
              : "AI Improve"}
          </button>

          {/* Save Resume */}

          <button
            type="button"
            onClick={handleSaveResume}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            <Save size={18} />

            {loading
              ? "Saving..."
              : "Save Resume"}
          </button>

        </div>
      </div>
    </header>
  );
}

export default BuilderHeader;