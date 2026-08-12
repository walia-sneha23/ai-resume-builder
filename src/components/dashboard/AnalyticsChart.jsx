import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function AnalyticsChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Fetch Resume Analytics
  // ==========================================

  useEffect(() => {
    const fetchAnalytics = async () => {
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

        const responseData = response.data;

        const resumes = Array.isArray(responseData)
          ? responseData
          : Array.isArray(responseData.resumes)
          ? responseData.resumes
          : Array.isArray(responseData.data)
          ? responseData.data
          : [];

        // ==========================================
        // Last 6 Months
        // ==========================================

        const now = new Date();

        const months = [];

        for (let i = 5; i >= 0; i--) {
          const date = new Date(
            now.getFullYear(),
            now.getMonth() - i,
            1
          );

          months.push({
            month: date.toLocaleString("en-US", {
              month: "short",
            }),
            year: date.getFullYear(),
            monthIndex: date.getMonth(),
            resumes: 0,
          });
        }

        // ==========================================
        // Count Resumes by Creation Month
        // ==========================================

        resumes.forEach((resume) => {
          const createdDate = new Date(
            resume.createdAt
          );

          if (
            Number.isNaN(
              createdDate.getTime()
            )
          ) {
            return;
          }

          const matchingMonth =
            months.find(
              (item) =>
                item.year ===
                  createdDate.getFullYear() &&
                item.monthIndex ===
                  createdDate.getMonth()
            );

          if (matchingMonth) {
            matchingMonth.resumes += 1;
          }
        });

        setData(months);
      } catch (error) {
        console.error(
          "Analytics Fetch Error:",
          error
        );

        // Keep chart usable even if API fails.
        const now = new Date();
        const fallbackData = [];

        for (let i = 5; i >= 0; i--) {
          const date = new Date(
            now.getFullYear(),
            now.getMonth() - i,
            1
          );

          fallbackData.push({
            month: date.toLocaleString(
              "en-US",
              {
                month: "short",
              }
            ),
            resumes: 0,
          });
        }

        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          Resume Analytics
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
          Last 6 Months
        </span>
      </div>

      <div className="h-80">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-slate-500">
              Loading analytics...
            </p>
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis
                allowDecimals={false}
                domain={[0, "auto"]}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="resumes"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default AnalyticsChart;