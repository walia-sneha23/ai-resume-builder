import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import { useResume } from "../../context/ResumeContext";

function ResumePreview() {
  const { resumeData } = useResume();

  // ==========================================
  // Selected Template
  // ==========================================

  const selectedTemplate =
    localStorage.getItem("selectedTemplate") || "Professional";

  // ==========================================
  // Safe Data Arrays
  // ==========================================

  const skills = Array.isArray(resumeData.skills)
    ? resumeData.skills
    : [];

  const experience = Array.isArray(resumeData.experience)
    ? resumeData.experience
    : [];

  const projects = Array.isArray(resumeData.projects)
    ? resumeData.projects
    : [];

  const certifications = Array.isArray(resumeData.certifications)
    ? resumeData.certifications
    : [];

  const languages = Array.isArray(resumeData.languages)
    ? resumeData.languages
    : [];

  // ==========================================
  // Template Styles
  // ==========================================

  const templateStyles = {
    Professional: {
      container:
        "bg-white text-slate-800 shadow-sm border border-slate-200",
      header:
        "border-b-2 border-slate-800 pb-5",
      name:
        "text-3xl font-bold text-slate-900",
      title:
        "mt-2 text-base font-medium text-slate-600",
      contact:
        "mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600",
      section:
        "mt-6",
      sectionTitle:
        "mb-3 text-lg font-semibold text-slate-800 border-b border-slate-200 pb-1",
      skill:
        "rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700",
      card:
        "rounded-lg border border-slate-200 p-4",
      accent:
        "text-slate-800",
      line:
        "border-l-2 border-slate-700 pl-4",
    },

    Modern: {
      container:
        "bg-white text-slate-800 shadow-sm border border-blue-100",
      header:
        "rounded-xl bg-blue-600 px-6 py-5 text-white",
      name:
        "text-3xl font-bold",
      title:
        "mt-2 text-base font-medium text-blue-100",
      contact:
        "mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-blue-50",
      section:
        "mt-6",
      sectionTitle:
        "mb-3 border-l-4 border-blue-600 pl-3 text-lg font-bold text-blue-700",
      skill:
        "rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700",
      card:
        "rounded-xl border border-blue-100 bg-blue-50/30 p-4",
      accent:
        "text-blue-700",
      line:
        "border-l-4 border-blue-500 pl-4",
    },

    Minimal: {
      container:
        "bg-white text-slate-800 shadow-sm border border-slate-200",
      header:
        "border-b border-slate-300 pb-5",
      name:
        "text-3xl font-semibold tracking-tight text-slate-900",
      title:
        "mt-2 text-base text-slate-500",
      contact:
        "mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500",
      section:
        "mt-6",
      sectionTitle:
        "mb-3 text-sm font-bold uppercase tracking-widest text-slate-700",
      skill:
        "rounded border border-slate-300 px-3 py-1 text-xs text-slate-700",
      card:
        "border-b border-slate-200 pb-4",
      accent:
        "text-slate-700",
      line:
        "border-l border-slate-400 pl-4",
    },

    Creative: {
      container:
        "bg-white text-slate-800 shadow-sm border border-purple-100",
      header:
        "rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 px-6 py-6 text-white",
      name:
        "text-3xl font-bold",
      title:
        "mt-2 text-base font-medium text-purple-100",
      contact:
        "mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-purple-50",
      section:
        "mt-6",
      sectionTitle:
        "mb-3 text-lg font-bold text-purple-700",
      skill:
        "rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700",
      card:
        "rounded-2xl border border-purple-100 bg-purple-50/30 p-4",
      accent:
        "text-purple-700",
      line:
        "border-l-4 border-purple-500 pl-4",
    },

    Corporate: {
      container:
        "bg-white text-slate-800 shadow-sm border border-slate-300",
      header:
        "border-b-4 border-slate-700 pb-5",
      name:
        "text-3xl font-bold uppercase tracking-wide text-slate-900",
      title:
        "mt-2 text-base font-semibold text-slate-600",
      contact:
        "mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600",
      section:
        "mt-6",
      sectionTitle:
        "mb-3 bg-slate-800 px-3 py-2 text-sm font-bold uppercase tracking-wider text-white",
      skill:
        "rounded-sm border border-slate-400 px-3 py-1 text-sm font-medium text-slate-700",
      card:
        "border border-slate-300 p-4",
      accent:
        "text-slate-800",
      line:
        "border-l-4 border-slate-700 pl-4",
    },

    "ATS Friendly": {
      container:
        "bg-white text-black shadow-sm border border-slate-200",
      header:
        "border-b-2 border-black pb-4",
      name:
        "text-3xl font-bold text-black",
      title:
        "mt-1 text-base font-medium text-black",
      contact:
        "mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-black",
      section:
        "mt-5",
      sectionTitle:
        "mb-2 border-b border-black pb-1 text-base font-bold uppercase text-black",
      skill:
        "text-sm text-black",
      card:
        "border-b border-slate-300 pb-3",
      accent:
        "text-black",
      line:
        "border-l-2 border-black pl-4",
    },
  };

  const style =
    templateStyles[selectedTemplate] ||
    templateStyles.Professional;

  // ==========================================
  // Helper: Render Skills
  // Supports:
  // 1. "React"
  // 2. { name: "React" }
  // 3. { skill: "React" }
  // 4. { category: "Technical Skills", items: [...] }
  // ==========================================

  const renderSkills = () => {
    const renderedSkills = [];

    skills.forEach((skill, index) => {
      if (typeof skill === "string") {
        if (skill.trim()) {
          renderedSkills.push({
            name: skill,
            key: `${skill}-${index}`,
          });
        }
        return;
      }

      if (skill && typeof skill === "object") {
        const skillName = skill.name || skill.skill;

        if (skillName) {
          renderedSkills.push({
            name: skillName,
            key: `${skillName}-${index}`,
          });
        }

        if (Array.isArray(skill.items)) {
          skill.items.forEach((item, itemIndex) => {
            if (typeof item === "string" && item.trim()) {
              renderedSkills.push({
                name: item,
                key: `${item}-${index}-${itemIndex}`,
                category: skill.category,
              });
            }
          });
        }
      }
    });

    return renderedSkills;
  };

  const normalizedSkills = renderSkills();

  // ==========================================
  // Helper: Section Wrapper
  // ==========================================

  const SectionTitle = ({ children, icon: Icon }) => (
    <div className={style.section}>
      <div className="flex items-center gap-2">
        {Icon && selectedTemplate !== "ATS Friendly" && (
          <Icon
            size={18}
            className={style.accent}
          />
        )}

        <h3 className={style.sectionTitle}>
          {children}
        </h3>
      </div>
    </div>
  );

  // ==========================================
  // Render
  // ==========================================

  return (
    <div
      className={`rounded-xl p-6 ${style.container}`}
    >
      {/* ====================================== */}
      {/* Preview Heading */}
      {/* ====================================== */}

      <div className="mb-5">
        <h2 className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
          Live Resume Preview
        </h2>
      </div>

      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div className={style.header}>
        <h1 className={style.name}>
          {resumeData.fullName || "Your Name"}
        </h1>

        <p className={style.title}>
          {resumeData.title || "Professional Title"}
        </p>

        <div className={style.contact}>
          {resumeData.email && (
            <div className="flex items-center gap-2">
              <Mail
                size={14}
                className="shrink-0"
              />
              <span className="break-all">
                {resumeData.email}
              </span>
            </div>
          )}

          {resumeData.phone && (
            <div className="flex items-center gap-2">
              <Phone
                size={14}
                className="shrink-0"
              />
              <span>{resumeData.phone}</span>
            </div>
          )}

          {resumeData.location && (
            <div className="flex items-center gap-2">
              <MapPin
                size={14}
                className="shrink-0"
              />
              <span>{resumeData.location}</span>
            </div>
          )}

          {resumeData.linkedin && (
            <div className="flex items-center gap-2">
              <FaLinkedin
                size={14}
                className="shrink-0"
              />
              <span className="break-all">
                {resumeData.linkedin}
              </span>
            </div>
          )}

          {resumeData.github && (
            <div className="flex items-center gap-2">
              <FaGithub
                size={14}
                className="shrink-0"
              />
              <span className="break-all">
                {resumeData.github}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ====================================== */}
      {/* Professional Summary */}
      {/* ====================================== */}

      {resumeData.summary && (
        <div className="mt-6">
          <h3 className={style.sectionTitle}>
            Professional Summary
          </h3>

          <p className="text-sm leading-6 text-slate-600">
            {resumeData.summary}
          </p>
        </div>
      )}

      {/* ====================================== */}
      {/* Skills */}
      {/* ====================================== */}

      {normalizedSkills.length > 0 && (
        <div className="mt-6">
          <h3 className={style.sectionTitle}>
            Skills
          </h3>

          <div
            className={
              selectedTemplate === "ATS Friendly"
                ? "space-y-1"
                : "flex flex-wrap gap-2"
            }
          >
            {normalizedSkills.map((skill) => (
              <span
                key={skill.key}
                className={style.skill}
              >
                {selectedTemplate === "ATS Friendly"
                  ? skill.name
                  : skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ====================================== */}
      {/* Education */}
      {/* ====================================== */}

      {resumeData.education && (
        <div className="mt-6">
          <SectionTitle icon={GraduationCap}>
            Education
          </SectionTitle>

          <div className={`mt-3 ${style.card}`}>
            <h4 className="font-semibold text-slate-800">
              {resumeData.education.degree ||
                "Degree"}
            </h4>

            {resumeData.education.college && (
              <p className="mt-1 text-sm text-slate-600">
                {resumeData.education.college}
              </p>
            )}

            {(resumeData.education.startYear ||
              resumeData.education.endYear) && (
              <p className="mt-1 text-sm text-slate-500">
                {resumeData.education.startYear}

                {resumeData.education.startYear &&
                resumeData.education.endYear
                  ? " - "
                  : ""}

                {resumeData.education.endYear}
              </p>
            )}

            {resumeData.education.cgpa && (
              <p className="mt-1 text-sm font-medium text-slate-600">
                CGPA / Percentage:{" "}
                {resumeData.education.cgpa}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ====================================== */}
      {/* Experience */}
      {/* ====================================== */}

      {experience.length > 0 && (
        <div className="mt-6">
          <SectionTitle icon={Briefcase}>
            Work Experience
          </SectionTitle>

          <div className="mt-3 space-y-4">
            {experience.map((item, index) => {
              const jobTitle =
                item.jobTitle ||
                item.position ||
                "Job Title";

              return (
                <div
                  key={index}
                  className={style.line}
                >
                  <h4 className="font-semibold text-slate-800">
                    {jobTitle}
                  </h4>

                  {item.company && (
                    <p className="text-sm font-medium text-slate-600">
                      {item.company}
                    </p>
                  )}

                  {(item.startDate ||
                    item.endDate) && (
                    <p className="mt-1 text-xs text-slate-500">
                      {item.startDate}

                      {item.startDate &&
                      item.endDate
                        ? " - "
                        : ""}

                      {item.endDate}
                    </p>
                  )}

                  {item.location && (
                    <p className="mt-1 text-xs text-slate-500">
                      {item.location}
                    </p>
                  )}

                  {item.description && (
                    <div className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description
                        .split(/\n+/)
                        .filter(Boolean)
                        .map(
                          (
                            line,
                            bulletIndex
                          ) => (
                            <p
                              key={bulletIndex}
                              className="mb-1"
                            >
                              •{" "}
                              {line.replace(
                                /^[-•]\s*/,
                                ""
                              )}
                            </p>
                          )
                        )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ====================================== */}
      {/* Projects */}
      {/* ====================================== */}

      {projects.length > 0 && (
        <div className="mt-6">
          <h3 className={style.sectionTitle}>
            Projects
          </h3>

          <div className="mt-3 space-y-4">
            {projects.map((project, index) => {
              const liveLink =
                project.liveDemo ||
                project.liveLink ||
                "";

              return (
                <div
                  key={index}
                  className={style.card}
                >
                  <h4 className="font-semibold text-slate-800">
                    {project.title ||
                      "Project Title"}
                  </h4>

                  {project.technologies && (
                    <p
                      className={`mt-1 text-xs font-medium ${style.accent}`}
                    >
                      Technologies:{" "}
                      {project.technologies}
                    </p>
                  )}

                  {project.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {project.description}
                    </p>
                  )}

                  {(project.github ||
                    liveLink) && (
                    <div className="mt-3 space-y-1 text-xs text-slate-500">
                      {project.github && (
                        <div className="flex items-center gap-1 break-all">
                          <FaGithub size={13} />

                          <span>
                            {project.github}
                          </span>
                        </div>
                      )}

                      {liveLink && (
                        <div className="flex items-center gap-1 break-all">
                          <Globe size={13} />

                          <span>
                            {liveLink}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ====================================== */}
      {/* Certifications */}
      {/* ====================================== */}

      {certifications.length > 0 && (
        <div className="mt-6">
          <SectionTitle icon={Award}>
            Certifications
          </SectionTitle>

          <div className="mt-3 space-y-3">
            {certifications.map(
              (certificate, index) => {
                const name =
                  certificate.name ||
                  certificate.title ||
                  "Certification";

                const issuer =
                  certificate.issuedBy ||
                  certificate.issuer ||
                  "";

                const date =
                  certificate.issueDate ||
                  certificate.year ||
                  "";

                return (
                  <div
                    key={index}
                    className={style.line}
                  >
                    <h4 className="font-semibold text-slate-800">
                      {name}
                    </h4>

                    {issuer && (
                      <p className="text-sm text-slate-600">
                        {issuer}
                      </p>
                    )}

                    {date && (
                      <p className="text-xs text-slate-500">
                        {date}
                      </p>
                    )}

                    {certificate.credentialId && (
                      <p className="mt-1 text-xs text-slate-500">
                        Credential ID:{" "}
                        {certificate.credentialId}
                      </p>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* ====================================== */}
      {/* Languages */}
      {/* ====================================== */}

      {languages.length > 0 && (
        <div className="mt-6">
          <SectionTitle icon={Languages}>
            Languages
          </SectionTitle>

          <div
            className={
              selectedTemplate === "ATS Friendly"
                ? "mt-2 space-y-1 text-sm text-black"
                : "mt-3 flex flex-wrap gap-2"
            }
          >
            {languages.map(
              (language, index) => {
                const languageName =
                  typeof language === "string"
                    ? language
                    : language?.name ||
                      language?.language ||
                      "";

                if (!languageName) {
                  return null;
                }

                return (
                  <span
                    key={`${languageName}-${index}`}
                    className={
                      selectedTemplate ===
                      "ATS Friendly"
                        ? "text-sm text-black"
                        : selectedTemplate ===
                          "Minimal"
                        ? "rounded border border-slate-300 px-3 py-1 text-xs text-slate-700"
                        : "rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                    }
                  >
                    {languageName}
                  </span>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumePreview;