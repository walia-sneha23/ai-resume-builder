import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import DashboardNavbar from "../dashboard/DashboardNavbar";

function DashboardLayout() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 transition-all duration-500 dark:from-slate-950 dark:via-slate-900 dark:to-black">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col lg:ml-72">
          {/* Navbar */}
          <DashboardNavbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* Page */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 dark:border-slate-700 dark:bg-slate-900/70">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;