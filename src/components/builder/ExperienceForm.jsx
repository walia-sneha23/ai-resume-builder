import {
  Briefcase,
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";

import { useState } from "react";
import axios from "axios";

import { useResume } from "../../context/ResumeContext";

function ExperienceForm({ setActiveSection }) {
  const { resumeData, updateResume } = useResume();

  const [aiLoading, setAiLoading] = useState(null);

  const experiences = Array.isArray(
    resumeData.experience
  )
    ? resumeData.experience
    : [];

  // ==========================================
  // Update Experience
  // ==========================================

  const updateExperience = (
    index,
    field,
    value
  ) => {
    const updatedExperiences = [
      ...experiences,
    ];

    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };

    updateResume(
      "experience",
      updatedExperiences
    );
  };

  // ==========================================
  // Add Experience
  // ==========================================

  const addExperience = () => {
    const newExperience = {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    };

    updateResume("experience", [
      ...experiences,
      newExperience,
    ]);
  };

  // ==========================================
  // Remove Experience
  // ==========================================

  const removeExperience = (index) => {
    const updatedExperiences =
      experiences.filter(
        (_, i) => i !== index
      );

    updateResume(
      "experience",
      updatedExperiences
    );
  };

  // ==========================================
  // Generate Experience with AI
  // ==========================================

  const generateAIExperience = async (
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

      const experience =
        experiences[index];

      if (
        !experience.jobTitle?.trim()
      ) {
        alert(
          "Please enter Job Title first."
        );
        return;
      }

      if (
        !experience.company?.trim()
      ) {
        alert(
          "Please enter Company Name first."
        );
        return;
      }

      // Determine experience level
      const experienceLevel =
        experiences.length > 0
          ? "Professional"
          : "Fresher";

      const response =
        await axios.post(
          "http://localhost:5000/api/ai/generate-experience",
          {
            jobRole:
              experience.jobTitle.trim(),

            company:
              experience.company.trim(),

            experienceLevel,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      if (
        response.data?.success &&
        response.data?.experience
      ) {
        const aiExperience =
          response.data.experience
            .trim();

        // Update description
        updateExperience(
          index,
          "description",
          aiExperience
        );

        alert(
          "AI experience generated successfully ✨"
        );
      } else {
        alert(
          "AI could not generate experience."
        );
      }
    } catch (error) {
      console.error(
        "AI EXPERIENCE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to generate AI experience."
      );
    } finally {
      setAiLoading(null);
    }
  };

  // ==========================================
  // Save & Continue
  // ==========================================

  const handleContinue = () => {
    setActiveSection("skills");
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">

      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-3">
            <Briefcase
              size={24}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Work Experience
            </h2>

            <p className="text-slate-500">
              Add your internship or work
              experience.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Experience
        </button>

      </div>

      {/* ====================================== */}
      {/* Empty State */}
      {/* ====================================== */}

      {experiences.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">

          <Briefcase
            size={32}
            className="mx-auto mb-3 text-slate-400"
          />

          <p className="text-slate-500">
            No work experience added yet.
          </p>

          <button
            type="button"
            onClick={addExperience}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            Add Experience
          </button>

        </div>
      )}

      {/* ====================================== */}
      {/* Experience Cards */}
      {/* ====================================== */}

      <div className="space-y-6">

        {experiences.map(
          (experience, index) => (
            <div
              key={index}
              className="space-y-6 rounded-xl border border-slate-200 p-6"
            >

              {/* ================================= */}
              {/* Basic Experience Information */}
              {/* ================================= */}

              <div className="grid gap-5 md:grid-cols-2">

                {/* Job Title */}

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Job Title
                  </label>

                  <input
                    type="text"
                    value={
                      experience.jobTitle ||
                      experience.position ||
                      ""
                    }
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "jobTitle",
                        e.target.value
                      )
                    }
                    placeholder="Frontend Developer Intern"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                  />
                </div>

                {/* Company */}

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Company Name
                  </label>

                  <input
                    type="text"
                    value={
                      experience.company ||
                      ""
                    }
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "company",
                        e.target.value
                      )
                    }
                    placeholder="ABC Technologies"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                  />
                </div>

                {/* Start Date */}

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Start Date
                  </label>

                  <input
                    type="month"
                    value={
                      experience.startDate ||
                      ""
                    }
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "startDate",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                  />
                </div>

                {/* End Date */}

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    End Date
                  </label>

                  <input
                    type="month"
                    value={
                      experience.endDate ||
                      ""
                    }
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "endDate",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                  />
                </div>

                {/* ================================= */}
                {/* Job Description */}
                {/* ================================= */}

                <div className="md:col-span-2">

                  <div className="mb-2 flex items-center justify-between">

                    <label className="block font-medium text-slate-700">
                      Job Description
                    </label>

                    <span className="text-xs text-slate-400">
                      ATS-friendly
                    </span>

                  </div>

                  <textarea
                    rows={7}
                    value={
                      experience.description ||
                      ""
                    }
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Describe your responsibilities and achievements..."
                    className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 leading-6 outline-none transition focus:border-blue-600"
                  />

                  {/* ================================= */}
                  {/* AI Generate Button */}
                  {/* ================================= */}

                  <div className="mt-3 flex items-center justify-between">

                    <p className="text-xs text-slate-400">
                      Generate concise ATS-friendly
                      bullet points using AI.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        generateAIExperience(
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
                          aiLoading ===
                          index
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
                        experience.description ||
                        ""
                      ).length
                    }{" "}
                    characters
                  </p>

                </div>

              </div>

              {/* ================================= */}
              {/* Remove */}
              {/* ================================= */}

              <div className="flex justify-end">

                <button
                  type="button"
                  onClick={() =>
                    removeExperience(
                      index
                    )
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
              "education"
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

export default ExperienceForm;