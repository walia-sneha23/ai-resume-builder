import { Code2, Plus, X } from "lucide-react";
import { useState } from "react";
import { useResume } from "../../context/ResumeContext";

function SkillsForm({ setActiveSection }) {
  const { resumeData, updateResume } =
    useResume();

  // ==========================================
  // Existing Skills
  // No default skills
  // ==========================================

  const [skills, setSkills] = useState(
    Array.isArray(resumeData.skills)
      ? resumeData.skills
      : []
  );

  const [skill, setSkill] =
    useState("");

  // ==========================================
  // Add Skill
  // ==========================================

  const addSkill = () => {
    const newSkill =
      skill.trim();

    if (!newSkill) return;

    // Prevent duplicate skills
    const alreadyExists =
      skills.some(
        (item) =>
          typeof item === "string" &&
          item.toLowerCase() ===
            newSkill.toLowerCase()
      );

    if (alreadyExists) {
      setSkill("");
      return;
    }

    const updatedSkills = [
      ...skills,
      newSkill,
    ];

    setSkills(updatedSkills);

    updateResume(
      "skills",
      updatedSkills
    );

    setSkill("");
  };

  // ==========================================
  // Remove Skill
  // ==========================================

  const removeSkill = (
    skillToRemove
  ) => {
    const updatedSkills =
      skills.filter(
        (item) =>
          item !== skillToRemove
      );

    setSkills(updatedSkills);

    updateResume(
      "skills",
      updatedSkills
    );
  };

  // ==========================================
  // Enter Key
  // ==========================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  // ==========================================
  // Continue
  // ==========================================

  const handleContinue = () => {
    updateResume(
      "skills",
      skills
    );

    setActiveSection("projects");
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">

      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Code2
            className="text-blue-600"
            size={28}
          />

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Skills
            </h2>

            <p className="text-slate-500">
              Add your technical and
              professional skills.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={addSkill}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Skill
        </button>

      </div>

      {/* ====================================== */}
      {/* Skill Input */}
      {/* ====================================== */}

      <div className="mb-6">

        <label className="mb-2 block font-medium text-slate-700">
          Add a Skill
        </label>

        <input
          type="text"
          value={skill}
          onChange={(e) =>
            setSkill(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="e.g. React.js, Node.js, MongoDB"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />

        <p className="mt-2 text-xs text-slate-400">
          Type a skill and press Enter or
          click Add Skill.
        </p>

      </div>

      {/* ====================================== */}
      {/* Skills */}
      {/* ====================================== */}

      {skills.length > 0 ? (
        <div>

          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Your Skills
          </h3>

          <div className="flex flex-wrap gap-3">

            {skills.map(
              (item, index) => {

                // Safety check:
                // prevents React object error
                const skillName =
                  typeof item ===
                  "string"
                    ? item
                    : item?.name ||
                      "";

                if (!skillName)
                  return null;

                return (
                  <div
                    key={`${skillName}-${index}`}
                    className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                  >

                    <span>
                      {skillName}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeSkill(
                          item
                        )
                      }
                      className="transition hover:text-red-600"
                      title={`Remove ${skillName}`}
                    >
                      <X size={16} />
                    </button>

                  </div>
                );
              }
            )}

          </div>

        </div>
      ) : (
        /* ==================================== */
        /* Empty State */
        /* ==================================== */

        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">

          <Code2
            size={32}
            className="mx-auto mb-3 text-slate-300"
          />

          <p className="font-medium text-slate-600">
            No skills added yet
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Add your skills using the input
            above.
          </p>

        </div>
      )}

      {/* ====================================== */}
      {/* Navigation */}
      {/* ====================================== */}

      <div className="mt-8 flex items-center justify-between">

        <button
          type="button"
          onClick={() =>
            setActiveSection(
              "experience"
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

export default SkillsForm;