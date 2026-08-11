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

function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState("personal");

  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-100">

      {/* Builder Header */}
      <BuilderHeader
        onPreview={() => setShowPreview(true)}
      />

      {/* Main Builder Area */}
      <div className="mt-16 flex w-full gap-6 p-6">

        {/* Sidebar */}
        <BuilderSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Forms */}
        <div className="min-w-0 flex-1">

          {activeSection === "personal" && (
            <PersonalInfo
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === "education" && (
            <EducationForm
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === "experience" && (
            <ExperienceForm
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === "skills" && (
            <SkillsForm
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === "projects" && (
            <ProjectsForm
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === "certifications" && (
            <CertificationsForm
              setActiveSection={setActiveSection}
            />
          )}

          {activeSection === "languages" && (
            <LanguagesForm
              setActiveSection={setActiveSection}
            />
          )}

        </div>

        {/* Live Resume Preview */}
        <div className="hidden w-[420px] xl:block">
          <ResumePreview />
        </div>

      </div>

      {/* ============================= */}
      {/* Full Resume Preview Modal */}
      {/* ============================= */}

      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">

          <div className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-slate-100 shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b bg-white px-6 py-4">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Resume Preview
                </h2>

                <p className="text-sm text-slate-500">
                  Preview your professional resume
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="rounded-xl border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                ✕ Close
              </button>

            </div>

            {/* Resume */}
            <div className="flex-1 overflow-y-auto p-8">

              <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg">

                <ResumePreview />

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ResumeBuilder;