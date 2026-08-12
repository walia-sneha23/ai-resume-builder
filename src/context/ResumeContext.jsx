import {
  createContext,
  useContext,
  useState,
} from "react";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [resumeId, setResumeId] = useState(null);

  // ==========================================
  // Empty Default Resume
  // ==========================================

  const [resumeData, setResumeData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",

    title: "",
    summary: "",

    education: {
      degree: "",
      college: "",
      startYear: "",
      endYear: "",
      cgpa: "",
    },

    experience: [],
    projects: [],
    skills: [],
    certifications: [],
    languages: [],
  });

  // ==========================================
  // Update Resume Field
  // ==========================================

  const updateResume = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==========================================
  // Update Education
  // ==========================================

  const updateEducation = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value,
      },
    }));
  };

  // ==========================================
  // Save Resume
  // ==========================================

  const saveResume = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Please login before saving your resume."
        );
        return;
      }

      // ==========================================
      // Skills
      // ==========================================

      const formattedSkills =
        resumeData.skills?.length > 0
          ? [
              {
                category:
                  "Technical Skills",
                items: resumeData.skills,
              },
            ]
          : [];

      // ==========================================
      // Experience
      // ==========================================

      const formattedExperience =
        resumeData.experience?.map(
          (item) => ({
            company:
              item.company || "",
            position:
              item.jobTitle ||
              item.position ||
              "",
            location:
              item.location || "",
            startDate:
              item.startDate || "",
            endDate:
              item.endDate || "",
            description:
              item.description || "",
          })
        ) || [];

      // ==========================================
      // Projects
      // ==========================================

      const formattedProjects =
        resumeData.projects?.map(
          (project) => ({
            title:
              project.title || "",
            technologies:
              project.technologies || "",
            description:
              project.description || "",
            github:
              project.github || "",
            liveLink:
              project.liveDemo ||
              project.liveLink ||
              "",
          })
        ) || [];

      // ==========================================
      // Certifications
      // ==========================================

      const formattedCertifications =
        resumeData.certifications?.map(
          (certificate) => ({
            title:
              certificate.name ||
              certificate.title ||
              "",
            issuer:
              certificate.issuedBy ||
              certificate.issuer ||
              "",
            year:
              certificate.issueDate ||
              certificate.year ||
              "",
            credentialId:
              certificate.credentialId ||
              "",
          })
        ) || [];

      // ==========================================
      // Final Payload
      // ==========================================

      const payload = {
        title: resumeData.title,

        personalInfo: {
          fullName:
            resumeData.fullName,
          email:
            resumeData.email,
          phone:
            resumeData.phone,
          address:
            resumeData.location,
          linkedin:
            resumeData.linkedin,
          github:
            resumeData.github,
          summary:
            resumeData.summary,
        },

        education: [
          {
            degree:
              resumeData.education.degree,
            institute:
              resumeData.education.college,
            startYear:
              resumeData.education.startYear,
            endYear:
              resumeData.education.endYear,
            cgpa:
              resumeData.education.cgpa,
          },
        ],

        experience:
          formattedExperience,

        projects:
          formattedProjects,

        skills:
          formattedSkills,

        certifications:
          formattedCertifications,

        languages:
          resumeData.languages,

        template:
          localStorage.getItem(
            "selectedTemplate"
          ) || "modern",
      };

      console.log(
        "Resume Payload:",
        payload
      );

     const res =
  await axios.post(
    `${API_URL}/api/resumes`,
    payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setResumeId(
        res.data.resume._id
      );

      alert(
        "Resume Saved Successfully ✅"
      );

      return res.data.resume;
    } catch (error) {
      console.error(
        "Save Resume Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to save resume."
      );

      throw error;
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updateResume,
        updateEducation,
        saveResume,
        resumeId,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}