import { useEffect, useState } from "react";
import {
  CheckCircle,
  FileText,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import axios from "axios";

function ProgressCard() {
  const [progress, setProgress] = useState([
    {
      title: "Resume Completed",
      value: 0,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "ATS Optimized",
      value: null,
      icon: BadgeCheck,
      color: "bg-emerald-500",
    },
    {
      title: "AI Content Generated",
      value: null,
      icon: Sparkles,
      color: "bg-violet-500",
    },
  ]);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // Fetch Latest Resume
  // ==========================================

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/resumes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        const resumes = Array.isArray(data)
          ? data
          : Array.isArray(data.resumes)
          ? data.resumes
          : Array.isArray(data.data)
          ? data.data
          : [];

        if (resumes.length === 0) {
          setLoading(false);
          return;
        }

        // Latest resume
        const latestResume = [...resumes].sort(
          (a, b) => {
            const dateA = new Date(
              a.updatedAt ||
                a.createdAt ||
                0
            ).getTime();

            const dateB = new Date(
              b.updatedAt ||
                b.createdAt ||
                0
            ).getTime();

            return dateB - dateA;
          }
        )[0];

        // ==========================================
        // Resume Completion
        // ==========================================

        const personalInfo =
          latestResume.personalInfo || {};

        const education =
          Array.isArray(
            latestResume.education
          )
            ? latestResume.education
            : [];

        const experience =
          Array.isArray(
            latestResume.experience
          )
            ? latestResume.experience
            : [];

        const projects =
          Array.isArray(
            latestResume.projects
          )
            ? latestResume.projects
            : [];

        const skills =
          Array.isArray(latestResume.skills)
            ? latestResume.skills
            : [];

        const certifications =
          Array.isArray(
            latestResume.certifications
          )
            ? latestResume.certifications
            : [];

        const languages =
          Array.isArray(
            latestResume.languages
          )
            ? latestResume.languages
            : [];

        const fields = [
          personalInfo.fullName ||
            latestResume.fullName,
          personalInfo.email ||
            latestResume.email,
          personalInfo.phone ||
            latestResume.phone,
          personalInfo.address ||
            latestResume.location,
          latestResume.title,
          personalInfo.summary ||
            latestResume.summary,
          education.length > 0,
          experience.length > 0,
          projects.length > 0,
          skills.length > 0,
          certifications.length > 0,
          languages.length > 0,
        ];

        const completedFields =
          fields.filter(Boolean).length;

        const completionPercentage =
          Math.round(
            (completedFields /
              fields.length) *
              100
          );

        // ==========================================
        // ATS Score
        // ==========================================

        const atsScore =
          latestResume.atsScore ??
          latestResume.ats?.score ??
          latestResume.atsAnalysis?.score ??
          null;

        // ==========================================
        // AI Content
        //
        // Backend currently does not expose an
        // explicit AI generation counter, so we
        // only count generated-content fields that
        // are actually present in the saved resume.
        // ==========================================

        let aiContentCount = 0;

        if (
          personalInfo.summary ||
          latestResume.summary
        ) {
          aiContentCount += 1;
        }

        experience.forEach((item) => {
          if (item.description) {
            aiContentCount += 1;
          }
        });

        projects.forEach((project) => {
          if (project.description) {
            aiContentCount += 1;
          }
        });

        setProgress([
          {
            title: "Resume Completed",
            value: completionPercentage,
            icon: FileText,
            color: "bg-blue-500",
          },
          {
            title: "ATS Optimized",
            value:
              typeof atsScore === "number"
                ? Math.round(atsScore)
                : null,
            icon: BadgeCheck,
            color: "bg-emerald-500",
          },
          {
            title: "AI Content Generated",
            value: aiContentCount,
            icon: Sparkles,
            color: "bg-violet-500",
          },
        ]);
      } catch (error) {
        console.error(
          "Progress Fetch Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          Career Progress
        </h2>

        <CheckCircle
          className="text-green-500"
          size={22}
        />
      </div>

      <div className="space-y-6">
        {progress.map((item) => {
          const Icon = item.icon;

          const isPercentage =
            item.title !==
            "AI Content Generated";

          const displayValue = loading
            ? "..."
            : item.value === null
            ? "--"
            : isPercentage
            ? `${item.value}%`
            : item.value;

          const progressWidth =
            loading ||
            item.value === null
              ? 0
              : isPercentage
              ? Math.min(item.value, 100)
              : Math.min(
                  item.value * 10,
                  100
                );

          return (
            <div key={item.title}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.color}`}
                  >
                    <Icon
                      size={16}
                      className="text-white"
                    />
                  </div>

                  <span className="font-medium text-slate-700">
                    {item.title}
                  </span>
                </div>

                <span className="font-semibold text-slate-800">
                  {displayValue}
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${progressWidth}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressCard;