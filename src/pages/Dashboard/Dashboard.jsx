import { useEffect, useMemo, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import Greeting from "../../components/dashboard/Greeting";
import StatCard from "../../components/dashboard/StatCard";
import AnalyticsChart from "../../components/dashboard/AnalyticsChart";
import ActivityCard from "../../components/dashboard/ActivityCard";
import ResumeCard from "../../components/dashboard/ResumeCard";
import ProgressCard from "../../components/dashboard/ProgressCard";
import UpgradeCard from "../../components/dashboard/UpgradeCard";

import {
  FileText,
  Sparkles,
  BarChart3,
  Clock,
} from "lucide-react";

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Fetch Saved Resumes
  // ==========================================

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

       const response = await axios.get(
  `${API_URL}/api/resumes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        const resumeList = Array.isArray(data)
          ? data
          : Array.isArray(data.resumes)
          ? data.resumes
          : Array.isArray(data.data)
          ? data.data
          : [];

        setResumes(resumeList);
      } catch (error) {
        console.error(
          "Dashboard Resume Fetch Error:",
          error
        );

        setResumes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  // ==========================================
  // Calculate Dashboard Stats
  // ==========================================

  const statsData = useMemo(() => {
    const totalResumes = resumes.length;

    // Count resumes containing AI-generated/content fields.
    const aiGenerationCount = resumes.reduce(
      (total, resume) => {
        let count = 0;

        const summary =
          resume.personalInfo?.summary ||
          resume.summary ||
          "";

        if (summary) count += 1;

        const experience = Array.isArray(
          resume.experience
        )
          ? resume.experience
          : [];

        experience.forEach((item) => {
          if (item.description) {
            count += 1;
          }
        });

        const projects = Array.isArray(
          resume.projects
        )
          ? resume.projects
          : [];

        projects.forEach((project) => {
          if (project.description) {
            count += 1;
          }
        });

        return total + count;
      },
      0
    );

    // Read ATS score if it exists in the saved resume.
    const atsScores = resumes
      .map(
        (resume) =>
          resume.atsScore ??
          resume.ats?.score ??
          resume.atsAnalysis?.score
      )
      .filter(
        (score) =>
          typeof score === "number" &&
          !Number.isNaN(score)
      );

    const averageATS =
      atsScores.length > 0
        ? Math.round(
            atsScores.reduce(
              (sum, score) => sum + score,
              0
            ) / atsScores.length
          )
        : null;

    // Find the latest updated/created resume.
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

    let recentActivity = "0";

    if (latestResume) {
      const latestDate = new Date(
        latestResume.updatedAt ||
          latestResume.createdAt ||
          0
      );

      if (!Number.isNaN(latestDate.getTime())) {
        const difference =
          Date.now() - latestDate.getTime();

        const minutes = Math.floor(
          difference / (1000 * 60)
        );

        if (minutes < 1) {
          recentActivity = "Now";
        } else if (minutes < 60) {
          recentActivity = `${minutes}m`;
        } else {
          const hours = Math.floor(
            minutes / 60
          );

          if (hours < 24) {
            recentActivity = `${hours}h`;
          } else {
            const days = Math.floor(
              hours / 24
            );

            recentActivity = `${days}d`;
          }
        }
      }
    }

    return {
      totalResumes,
      aiGenerationCount,
      averageATS,
      recentActivity,
    };
  }, [resumes]);

  // ==========================================
  // Stats
  // ==========================================

  const stats = [
    {
      title: "Total Resumes",
      value: loading
        ? "..."
        : statsData.totalResumes,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "AI Generations",
      value: loading
        ? "..."
        : statsData.aiGenerationCount,
      icon: Sparkles,
      color: "bg-violet-500",
    },
    {
      title: "ATS Score",
      value: loading
        ? "..."
        : statsData.averageATS !== null
        ? `${statsData.averageATS}%`
        : "--",
      icon: BarChart3,
      color: "bg-emerald-500",
    },
    {
      title: "Recent Activity",
      value: loading
        ? "..."
        : statsData.recentActivity,
      icon: Clock,
      color: "bg-orange-500",
    },
  ];

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <Greeting />

      {/* Stats */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </section>

      {/* Analytics + Activity */}
      <section className="grid gap-6 lg:grid-cols-2">
        <AnalyticsChart />
        <ActivityCard />
      </section>

      {/* Resume + Progress */}
      <section className="grid gap-6 lg:grid-cols-2">
        <ResumeCard />
        <ProgressCard />
      </section>

      {/* Upgrade */}
      <UpgradeCard />
    </div>
  );
}

export default Dashboard;