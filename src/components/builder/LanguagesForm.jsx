import {
  Languages,
  Plus,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useResume } from "../../context/ResumeContext";

function LanguagesForm({
  setActiveSection,
}) {
  const navigate = useNavigate();

  const {
    resumeData,
    saveResume,
    updateResume,
  } = useResume();

  // ==========================================
  // Languages
  // No default languages
  // ==========================================

  const [languages, setLanguages] =
    useState(
      Array.isArray(
        resumeData.languages
      )
        ? resumeData.languages
        : []
    );

  const [language, setLanguage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // Sync Languages With Context
  // ==========================================

  useEffect(() => {
    updateResume(
      "languages",
      languages
    );
  }, [languages]);

  // ==========================================
  // Add Language
  // ==========================================

  const addLanguage = () => {
    const newLanguage =
      language.trim();

    if (!newLanguage) return;

    const alreadyExists =
      languages.some(
        (item) =>
          typeof item === "string" &&
          item.toLowerCase() ===
            newLanguage.toLowerCase()
      );

    if (alreadyExists) {
      setLanguage("");
      return;
    }

    const updatedLanguages = [
      ...languages,
      newLanguage,
    ];

    setLanguages(
      updatedLanguages
    );

    updateResume(
      "languages",
      updatedLanguages
    );

    setLanguage("");
  };

  // ==========================================
  // Remove Language
  // ==========================================

  const removeLanguage = (
    index
  ) => {
    const updatedLanguages =
      languages.filter(
        (_, i) => i !== index
      );

    setLanguages(
      updatedLanguages
    );

    updateResume(
      "languages",
      updatedLanguages
    );
  };

  // ==========================================
  // Finish Resume
  // ==========================================

  const handleFinish = async () => {
    try {
      setLoading(true);

      // Make sure latest languages
      // are stored in context
      updateResume(
        "languages",
        languages
      );

      // Small delay so context
      // receives latest value
      await new Promise(
        (resolve) =>
          setTimeout(resolve, 100)
      );

      await saveResume();

      alert(
        "Resume saved successfully! 🎉"
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(
        "FINISH RESUME ERROR:",
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

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">

      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Languages
            className="text-blue-600"
            size={28}
          />

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Languages
            </h2>

            <p className="text-slate-500">
              Add the languages you know.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={addLanguage}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Language
        </button>

      </div>

      {/* ====================================== */}
      {/* Input */}
      {/* ====================================== */}

      <div className="mb-6">

        <label className="mb-2 block font-medium text-slate-700">
          Add a Language
        </label>

        <input
          type="text"
          value={language}
          onChange={(e) =>
            setLanguage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addLanguage();
            }
          }}
          placeholder="e.g. English, Hindi, Punjabi"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />

        <p className="mt-2 text-xs text-slate-400">
          Type a language and press Enter
          or click Add Language.
        </p>

      </div>

      {/* ====================================== */}
      {/* Languages */}
      {/* ====================================== */}

      {languages.length > 0 ? (
        <div>

          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Your Languages
          </h3>

          <div className="flex flex-wrap gap-3">

            {languages.map(
              (item, index) => {

                const languageName =
                  typeof item ===
                  "string"
                    ? item
                    : item?.name || "";

                if (!languageName)
                  return null;

                return (
                  <div
                    key={`${languageName}-${index}`}
                    className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700"
                  >

                    <span>
                      {languageName}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeLanguage(
                          index
                        )
                      }
                      className="transition hover:text-red-600"
                      title={`Remove ${languageName}`}
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

          <Languages
            size={34}
            className="mx-auto mb-3 text-slate-300"
          />

          <p className="font-medium text-slate-600">
            No languages added yet
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Add the languages you know
            using the input above.
          </p>

        </div>
      )}

      {/* ====================================== */}
      {/* Navigation */}
      {/* ====================================== */}

      <div className="mt-10 flex items-center justify-between">

        {/* Previous */}

        <button
          type="button"
          onClick={() =>
            setActiveSection(
              "certifications"
            )
          }
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          ← Previous
        </button>

        {/* Finish */}

        <button
          type="button"
          disabled={loading}
          onClick={handleFinish}
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : "🎉 Finish Resume"}
        </button>

      </div>

    </div>
  );
}

export default LanguagesForm;