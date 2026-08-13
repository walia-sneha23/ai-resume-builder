import { Eye, CheckCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const templates = [
  {
    id: 1,
    name: "Professional",
    description:
      "Perfect for Software Engineers & MNC Jobs",
  },
  {
    id: 2,
    name: "Modern",
    description:
      "Clean and modern design with colors",
  },
  {
    id: 3,
    name: "Minimal",
    description:
      "Simple ATS-friendly layout",
  },
  {
    id: 4,
    name: "Creative",
    description:
      "Best for Designers & Creatives",
  },
  {
    id: 5,
    name: "Corporate",
    description:
      "Professional business style resume",
  },
  {
    id: 6,
    name: "ATS Friendly",
    description:
      "Optimized for Applicant Tracking Systems",
  },
];

// ==========================================
// Mini Resume Preview
// ==========================================

function MiniResumePreview({ template }) {
  const baseClass =
    "h-full w-full bg-white p-4 sm:p-5 text-[7px] leading-3 shadow-inner";

  // ========================================
  // Modern
  // ========================================

  if (template.name === "Modern") {
    return (
      <div
        className={`${baseClass} border-l-8 border-blue-600`}
      >
        <div className="mb-3">
          <div className="text-[13px] font-bold text-blue-700">
            YOUR NAME
          </div>

          <div className="text-slate-500">
            Software Developer
          </div>
        </div>

        <div className="mb-3 h-px bg-blue-200" />

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-2">
            <div>
              <div className="mb-1 font-bold text-blue-700">
                PROFESSIONAL SUMMARY
              </div>

              <div className="text-slate-500">
                Professional developer experienced in
                building responsive web applications
                using modern technologies.
              </div>
            </div>

            <div>
              <div className="mb-1 font-bold text-blue-700">
                EXPERIENCE
              </div>

              <div className="h-2 w-4/5 rounded bg-slate-200" />
              <div className="mt-1 h-2 w-full rounded bg-slate-100" />
              <div className="mt-1 h-2 w-3/4 rounded bg-slate-100" />
            </div>

            <div>
              <div className="mb-1 font-bold text-blue-700">
                PROJECTS
              </div>

              <div className="h-2 w-full rounded bg-slate-100" />
              <div className="mt-1 h-2 w-5/6 rounded bg-slate-100" />
            </div>
          </div>

          <div>
            <div className="mb-1 font-bold text-blue-700">
              SKILLS
            </div>

            <div className="space-y-1">
              <div className="rounded bg-blue-50 px-1 py-1">
                React
              </div>

              <div className="rounded bg-blue-50 px-1 py-1">
                Node.js
              </div>

              <div className="rounded bg-blue-50 px-1 py-1">
                MongoDB
              </div>

              <div className="rounded bg-blue-50 px-1 py-1">
                Express
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // Minimal
  // ========================================

  if (template.name === "Minimal") {
    return (
      <div className={baseClass}>
        <div className="mb-4 text-center">
          <div className="text-[13px] font-bold text-slate-800">
            YOUR NAME
          </div>

          <div className="text-slate-500">
            Software Developer
          </div>

          <div className="mt-1 text-[6px] text-slate-400">
            City, State • your@email.com
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="mb-1 border-b border-slate-300 pb-1 font-bold">
              SUMMARY
            </div>

            <div className="h-2 w-full rounded bg-slate-100" />
            <div className="mt-1 h-2 w-5/6 rounded bg-slate-100" />
          </div>

          <div>
            <div className="mb-1 border-b border-slate-300 pb-1 font-bold">
              EXPERIENCE
            </div>

            <div className="h-2 w-3/4 rounded bg-slate-200" />
            <div className="mt-1 h-2 w-full rounded bg-slate-100" />
            <div className="mt-1 h-2 w-4/5 rounded bg-slate-100" />
          </div>

          <div>
            <div className="mb-1 border-b border-slate-300 pb-1 font-bold">
              EDUCATION
            </div>

            <div className="h-2 w-2/3 rounded bg-slate-200" />
            <div className="mt-1 h-2 w-1/2 rounded bg-slate-100" />
          </div>

          <div>
            <div className="mb-1 border-b border-slate-300 pb-1 font-bold">
              SKILLS
            </div>

            <div className="h-2 w-full rounded bg-slate-100" />
            <div className="mt-1 h-2 w-4/5 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // Creative
  // ========================================

  if (template.name === "Creative") {
    return (
      <div
        className={`${baseClass} bg-slate-50`}
      >
        <div className="mb-4 rounded-lg bg-purple-100 p-3">
          <div className="text-[13px] font-bold text-purple-800">
            YOUR NAME
          </div>

          <div className="text-purple-600">
            Creative Developer
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="font-bold text-purple-700">
              ABOUT ME
            </div>

            <div className="mt-1 h-2 w-full rounded bg-white" />
            <div className="mt-1 h-2 w-4/5 rounded bg-white" />
          </div>

          <div>
            <div className="font-bold text-purple-700">
              EXPERIENCE
            </div>

            <div className="mt-1 h-2 w-3/4 rounded bg-white" />
            <div className="mt-1 h-2 w-full rounded bg-white" />
            <div className="mt-1 h-2 w-5/6 rounded bg-white" />
          </div>

          <div>
            <div className="font-bold text-purple-700">
              PROJECTS
            </div>

            <div className="mt-1 h-2 w-full rounded bg-white" />
            <div className="mt-1 h-2 w-3/4 rounded bg-white" />
          </div>

          <div>
            <div className="font-bold text-purple-700">
              SKILLS
            </div>

            <div className="mt-1 flex flex-wrap gap-1">
              <span className="rounded bg-purple-200 px-2 py-1">
                React
              </span>

              <span className="rounded bg-purple-200 px-2 py-1">
                Node
              </span>

              <span className="rounded bg-purple-200 px-2 py-1">
                MongoDB
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // Corporate
  // ========================================

  if (template.name === "Corporate") {
    return (
      <div className={baseClass}>
        <div className="mb-3 border-b-4 border-slate-800 pb-3">
          <div className="text-[13px] font-bold text-slate-900">
            YOUR NAME
          </div>

          <div className="text-slate-500">
            Software Developer
          </div>
        </div>

        <div className="space-y-3">
          {[
            "PROFESSIONAL SUMMARY",
            "PROFESSIONAL EXPERIENCE",
            "EDUCATION",
            "TECHNICAL SKILLS",
          ].map((section) => (
            <div key={section}>
              <div className="mb-1 font-bold text-slate-800">
                {section}
              </div>

              <div className="h-2 w-full rounded bg-slate-100" />
              <div className="mt-1 h-2 w-5/6 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ========================================
  // ATS Friendly
  // ========================================

  if (template.name === "ATS Friendly") {
    return (
      <div className={baseClass}>
        <div className="mb-3 text-center">
          <div className="text-[13px] font-bold">
            YOUR NAME
          </div>

          <div className="text-slate-500">
            SOFTWARE DEVELOPER
          </div>
        </div>

        <div className="space-y-3">
          {[
            "SUMMARY",
            "SKILLS",
            "EXPERIENCE",
            "PROJECTS",
            "EDUCATION",
          ].map((section) => (
            <div key={section}>
              <div className="mb-1 border-b border-slate-400 pb-1 font-bold">
                {section}
              </div>

              <div className="h-2 w-full rounded bg-slate-100" />
              <div className="mt-1 h-2 w-4/5 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ========================================
  // Professional
  // ========================================

  return (
    <div className={baseClass}>
      <div className="mb-4 text-center">
        <div className="text-[13px] font-bold text-slate-900">
          YOUR NAME
        </div>

        <div className="text-slate-500">
          Software Developer
        </div>

        <div className="mx-auto mt-1 h-1 w-24 rounded bg-slate-800" />
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-1 font-bold">
            PROFESSIONAL SUMMARY
          </div>

          <div className="h-2 w-full rounded bg-slate-100" />
          <div className="mt-1 h-2 w-5/6 rounded bg-slate-100" />
        </div>

        <div>
          <div className="mb-1 font-bold">
            EXPERIENCE
          </div>

          <div className="h-2 w-3/4 rounded bg-slate-200" />
          <div className="mt-1 h-2 w-full rounded bg-slate-100" />
          <div className="mt-1 h-2 w-4/5 rounded bg-slate-100" />
        </div>

        <div>
          <div className="mb-1 font-bold">
            PROJECTS
          </div>

          <div className="h-2 w-full rounded bg-slate-100" />
          <div className="mt-1 h-2 w-3/4 rounded bg-slate-100" />
        </div>

        <div>
          <div className="mb-1 font-bold">
            EDUCATION
          </div>

          <div className="h-2 w-2/3 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Templates Page
// ==========================================

function Templates() {
  const navigate = useNavigate();

  const [
    selectedTemplate,
    setSelectedTemplate,
  ] = useState(
    localStorage.getItem(
      "selectedTemplate"
    ) || ""
  );

  const [
    previewTemplate,
    setPreviewTemplate,
  ] = useState(null);

  // ==========================================
  // Use Template
  // ==========================================

  const handleUseTemplate = (
    template
  ) => {
    localStorage.setItem(
      "selectedTemplate",
      template.name
    );

    setSelectedTemplate(
      template.name
    );

    navigate(
      "/resume-builder"
    );
  };

  return (
    <div className="min-h-screen min-w-0 bg-slate-100 p-3 sm:p-5 md:p-6">
      <div className="mx-auto w-full max-w-7xl rounded-3xl bg-slate-50 p-4 shadow-sm sm:p-6 md:p-8">
        {/* ================================== */}
        {/* Header */}
        {/* ================================== */}

        <div className="mb-7 text-center sm:mb-10">
          <h1 className="text-3xl font-bold leading-tight text-slate-800 sm:text-4xl">
            Choose Resume Template
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Select your favorite resume template
            to get started.
          </p>
        </div>

        {/* ================================== */}
        {/* Templates */}
        {/* ================================== */}

        <div className="grid min-w-0 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templates.map(
            (template) => {
              const isSelected =
                selectedTemplate ===
                template.name;

              return (
                <div
                  key={template.id}
                  className={`min-w-0 overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isSelected
                      ? "ring-2 ring-blue-600"
                      : ""
                  }`}
                >
                  {/* Preview */}
                  <div className="flex h-64 items-center justify-center overflow-hidden bg-slate-200 p-4 sm:h-72 sm:p-5">
                    <div className="h-full w-full min-w-0">
                      <MiniResumePreview
                        template={template}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
                          {template.name}
                        </h2>

                        <p className="mt-2 text-sm leading-5 text-slate-500 sm:text-base">
                          {template.description}
                        </p>
                      </div>

                      {isSelected && (
                        <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold text-green-700 sm:px-3 sm:text-xs">
                          Selected
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row">
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewTemplate(
                            template
                          )
                        }
                        className="flex min-h-11 w-full flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:text-base"
                      >
                        <Eye size={18} />
                        Preview
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleUseTemplate(
                            template
                          )
                        }
                        className="flex min-h-11 w-full flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:text-base"
                      >
                        <CheckCircle
                          size={18}
                        />

                        {isSelected
                          ? "Selected"
                          : "Use"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* ==========================================
          Preview Modal
      ========================================== */}

      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-3 sm:p-6">
          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-auto rounded-3xl bg-white p-4 shadow-2xl sm:max-h-[90vh] sm:p-6">
            {/* Close */}

            <button
              type="button"
              onClick={() =>
                setPreviewTemplate(
                  null
                )
              }
              className="absolute right-3 top-3 rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 sm:right-5 sm:top-5"
            >
              <X size={20} />
            </button>

            {/* Header */}

            <div className="mb-5 pr-10 sm:mb-6 sm:pr-12">
              <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
                {previewTemplate.name}{" "}
                Template
              </h2>

              <p className="mt-1 text-sm leading-5 text-slate-500 sm:text-base">
                {previewTemplate.description}
              </p>
            </div>

            {/* Large Preview */}

            <div className="mx-auto max-w-2xl rounded-xl bg-slate-100 p-3 sm:p-6 md:p-8">
              <div className="mx-auto aspect-[8.5/11] w-full max-w-xl overflow-hidden shadow-xl">
                <MiniResumePreview
                  template={
                    previewTemplate
                  }
                />
              </div>
            </div>

            {/* Modal Button */}

            <div className="mt-5 flex justify-stretch sm:mt-6 sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  handleUseTemplate(
                    previewTemplate
                  );

                  setPreviewTemplate(
                    null
                  );
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto sm:text-base"
              >
                <CheckCircle
                  size={18}
                />
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Templates;