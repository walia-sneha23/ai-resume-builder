import { useEffect, useState } from "react";
import {
  FileText,
  Sparkles,
  Download,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ActivityCard() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Fetch Recent Resume Activity
  // ==========================================

  useEffect(() => {
    const fetchActivity = async () => {
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

        const sortedResumes = [...resumes].sort(
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
        );

        const recentActivities =
          sortedResumes
            .slice(0, 4)
            .map((resume, index) => {
              const date = new Date(
                resume.updatedAt ||
                  resume.createdAt ||
                  0
              );

              return {
                id:
                  resume._id ||
                  index,
                icon:
                  index === 0
                    ? FileText
                    : Sparkles,
                title:
                  index === 0
                    ? "Resume Updated"
                    : "Resume Activity",
                description:
                  resume.title ||
                  resume.personalInfo
                    ?.fullName ||
                  "Resume",
                time: formatTime(date),
                color:
                  index === 0
                    ? "bg-blue-500"
                    : "bg-violet-500",
                resumeId: resume._id,
              };
            });

        setActivities(recentActivities);
      } catch (error) {
        console.error(
          "Activity Fetch Error:",
          error
        );

        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  // ==========================================
  // Format Time
  // ==========================================

  const formatTime = (date) => {
    if (
      !date ||
      Number.isNaN(date.getTime())
    ) {
      return "Recently";
    }

    const difference =
      Date.now() - date.getTime();

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} ${
        minutes === 1
          ? "minute"
          : "minutes"
      } ago`;
    }

    const hours = Math.floor(
      minutes / 60
    );

    if (hours < 24) {
      return `${hours} ${
        hours === 1
          ? "hour"
          : "hours"
      } ago`;
    }

    const days = Math.floor(
      hours / 24
    );

    if (days < 7) {
      return `${days} ${
        days === 1
          ? "day"
          : "days"
      } ago`;
    }

    return date.toLocaleDateString();
  };

  // ==========================================
  // Open Resume
  // ==========================================

  const handleActivityClick = (activity) => {
    if (!activity.resumeId) {
      return;
    }

    localStorage.setItem(
      "selectedResumeId",
      activity.resumeId
    );

    navigate("/resume-builder");
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          Recent Activity
        </h2>

        <button
          type="button"
          onClick={() =>
            navigate("/my-resumes")
          }
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-8 text-center">
          <p className="text-sm text-slate-500">
            Loading activity...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading &&
        activities.length === 0 && (
          <div className="py-8 text-center">
            <FileText
              size={32}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm text-slate-500">
              No recent activity yet.
            </p>
          </div>
        )}

      {/* Activities */}
      {!loading &&
        activities.length > 0 && (
          <div className="space-y-5">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <button
                  type="button"
                  key={activity.id}
                  onClick={() =>
                    handleActivityClick(
                      activity
                    )
                  }
                  className="flex w-full items-start gap-4 text-left transition hover:opacity-80"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${activity.color}`}
                  >
                    <Icon
                      size={20}
                      className="text-white"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">
                      {activity.title}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {activity.description}
                    </p>

                    <span className="text-xs text-slate-400">
                      {activity.time}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
    </div>
  );
}

export default ActivityCard;