
import { useState } from "react";

import BuilderHeader from "../../components/builder/BuilderHeader";
import BuilderSidebar from "../../components/builder/BuilderSidebar";
import PersonalInfo from "../../components/builder/PersonalInfo";
import EducationForm from "../../components/builder/EducationForm";
import ExperienceForm from "../../components/builder/ExperienceForm";
import SkillsForm from "../../components/builder/SkillsForm";
import ProjectsForm from "../../components/builder/ProjectsForm";
import CertificationsForm from "../../components/builder/CertificationsForm";
import LanguagesForm from "../../components/builder/LanguagesForm";
import ResumePreview from "../../components/builder/ResumePreview";

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen min-w-0 bg-slate-100">
      {/* ==========================================
          Builder Header
      ========================================== */}

      <BuilderHeader onPreview={() => setShowPreview(true)} />

      {/* ==========================================
          Main Builder Area
      ========================================== */}

      <div className="mx-auto flex w-full min-w-0 max-w-[1800px] flex-col gap-4 p-3 sm:gap-5 sm:p-5 md:gap-6 md:p-6 lg:flex-row">
        {/* ========================================
            Builder Sidebar
        ======================================== */}

        <BuilderSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* ========================================
            Builder Forms
        ======================================== */}

        <div className="min-w-0 flex-1">
          {activeSection === "personal" && (
            <PersonalInfo setActiveSection={setActiveSection} />
          )}

          {activeSection === "education" && (
            <EducationForm setActiveSection={setActiveSection} />
          )}

          {activeSection === "experience" && (
            <ExperienceForm setActiveSection={setActiveSection} />
          )}

          {activeSection === "skills" && (
            <SkillsForm setActiveSection={setActiveSection} />
          )}

          {activeSection === "projects" && (
            <ProjectsForm setActiveSection={setActiveSection} />
          )}

          {activeSection === "certifications" && (
            <CertificationsForm setActiveSection={setActiveSection} />
          )}

          {activeSection === "languages" && (
            <LanguagesForm setActiveSection={setActiveSection} />
          )}
        </div>

        {/* ========================================
            Live Resume Preview

            Hidden until large desktop so that
            laptop screens have enough width for
            the builder form.
        ======================================== */}

        <div className="hidden w-full min-w-0 shrink-0 2xl:block 2xl:w-[420px]">
          <ResumePreview />
        </div>
      </div>

      {/* ==========================================
          Full Resume Preview Modal
      ========================================== */}

      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 md:p-6">
          <div className="relative flex h-[96vh] w-full min-w-0 max-w-5xl flex-col overflow-hidden rounded-2xl bg-slate-100 shadow-2xl sm:h-[94vh]">
            {/* ====================================
                Modal Header
            ==================================== */}

            <div className="flex shrink-0 flex-col gap-3 border-b bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
                  Resume Preview
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  Preview your professional resume
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="flex min-h-10 w-full shrink-0 items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:w-auto"
              >
                ✕ Close
              </button>
            </div>

            {/* ====================================
                Resume Preview
            ==================================== */}

            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-5 md:p-8">
              <div className="mx-auto w-full max-w-3xl rounded-xl bg-white p-3 shadow-lg sm:p-5 md:p-8">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

