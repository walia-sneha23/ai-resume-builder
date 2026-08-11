import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  ShieldCheck,
  Palette,
  Save,
} from "lucide-react";

function Settings() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      root.classList.toggle("dark", prefersDark);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
            <SettingsIcon className="h-6 w-6 text-blue-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Settings
            </h1>

            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Manage your account and application preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5 dark:border-slate-700">
          <User className="h-5 w-5 text-blue-600" />

          <div>
            <h2 className="font-semibold text-slate-800 dark:text-white">
              Account Settings
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Update your basic account information.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5 dark:border-slate-700">
          <Bell className="h-5 w-5 text-blue-600" />

          <div>
            <h2 className="font-semibold text-slate-800 dark:text-white">
              Notifications
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage how you receive notifications.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4 dark:border-slate-700">
            <div>
              <h3 className="text-sm font-medium text-slate-800 dark:text-white">
                Email Notifications
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Receive important updates by email.
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 accent-blue-600"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4 dark:border-slate-700">
            <div>
              <h3 className="text-sm font-medium text-slate-800 dark:text-white">
                AI Suggestions
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Get useful AI-powered resume suggestions.
              </p>
            </div>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 accent-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Appearance & Security */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Appearance */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Palette className="h-6 w-6 text-purple-600" />

          <h3 className="mt-3 font-semibold text-slate-800 dark:text-white">
            Appearance
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Customize how your dashboard looks.
          </p>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          >
            <option value="light">☀️ Light Mode</option>
            <option value="dark">🌙 Dark Mode</option>
            <option value="system">🖥️ System Default</option>
          </select>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <ShieldCheck className="h-6 w-6 text-green-600" />

          <h3 className="mt-3 font-semibold text-slate-800 dark:text-white">
            Privacy & Security
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Keep your account and resume data secure.
          </p>

          <button
            type="button"
            className="mt-4 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Manage Security
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;