import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  FileEdit,
  Settings,
  User,
  Crown,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Resumes",
    path: "/my-resumes",
    icon: FileText,
  },
  {
    name: "AI Resume",
    path: "/ai-resume",
    icon: Sparkles,
  },
  {
    name: "Cover Letter",
    path: "/cover-letter",
    icon: FileEdit,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
      {/* Logo */}
      <div className="border-b border-slate-100 px-6 py-5 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md">
            <Sparkles size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
              AI Resume Builder
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Premium Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                }`
              }
            >
              <Icon
                size={20}
                className="transition-transform duration-200 group-hover:scale-105"
              />

              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      <div className="m-5 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-5 text-white shadow-lg shadow-blue-600/20">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
            <Crown size={18} />
          </div>

          <h3 className="font-semibold">Upgrade to Pro</h3>
        </div>

        <p className="mb-4 text-xs leading-5 text-blue-100">
          Unlock AI Resume, ATS Score, Cover Letter & Premium Templates.
        </p>

        <button
          type="button"
          onClick={() => navigate("/pricing")}
          className="w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-slate-100 hover:shadow-md"
        >
          Upgrade
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;