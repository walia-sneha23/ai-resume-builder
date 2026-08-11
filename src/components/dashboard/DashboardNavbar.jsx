import {
  Bell,
  Search,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  CheckCircle,
  Sparkles,
  X,
  FileText,
  LayoutTemplate,
  Target,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashboardNavbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] =
    useState([]);

  const [resumes, setResumes] = useState([]);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // ==========================================
  // Searchable Pages
  // ==========================================

  const pages = [
    {
      title: "Dashboard",
      description: "View dashboard and analytics",
      icon: LayoutTemplate,
      path: "/dashboard",
      keywords: "dashboard analytics home",
    },
    {
      title: "Resume Builder",
      description: "Create and edit your resume",
      icon: FileText,
      path: "/resume-builder",
      keywords: "resume builder create edit",
    },
    {
      title: "My Resumes",
      description: "Manage your saved resumes",
      icon: FileText,
      path: "/my-resumes",
      keywords: "my resumes saved resume",
    },
    {
      title: "Templates",
      description: "Choose a resume template",
      icon: LayoutTemplate,
      path: "/templates",
      keywords: "templates resume design",
    },
    {
      title: "ATS Analyzer",
      description: "Analyze your resume ATS score",
      icon: Target,
      path: "/my-resumes",
      keywords: "ats analyzer score resume",
    },
    {
      title: "AI Cover Letter",
      description: "Generate an AI cover letter",
      icon: Sparkles,
      path: "/cover-letter",
      keywords: "ai cover letter job",
    },
    {
      title: "Profile",
      description: "Manage your profile",
      icon: User,
      path: "/profile",
      keywords: "profile account",
    },
    {
      title: "Settings",
      description: "Manage application settings",
      icon: Settings,
      path: "/settings",
      keywords: "settings preferences",
    },
  ];

  // ==========================================
  // Fetch Resumes for Search
  // ==========================================

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
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

        const data =
          response.data?.resumes ||
          response.data?.data ||
          response.data;

        if (Array.isArray(data)) {
          setResumes(data);
        }
      } catch (error) {
        console.error(
          "Search Resume Fetch Error:",
          error
        );
      }
    };

    fetchResumes();
  }, []);

  // ==========================================
  // Search
  // ==========================================

  useEffect(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setSearchResults([]);
      return;
    }

    const pageResults = pages
      .filter((page) => {
        const searchableText = `
          ${page.title}
          ${page.description}
          ${page.keywords}
        `.toLowerCase();

        return searchableText.includes(query);
      })
      .map((page) => ({
        type: "page",
        ...page,
      }));

    const resumeResults = resumes
      .filter((resume) => {
        const title = (
          resume.title || ""
        ).toLowerCase();

        return title.includes(query);
      })
      .slice(0, 5)
      .map((resume) => ({
        type: "resume",
        title:
          resume.title ||
          "Untitled Resume",
        description: "Open saved resume",
        icon: FileText,
        resumeId: resume._id,
      }));

    setSearchResults([
      ...resumeResults,
      ...pageResults,
    ].slice(0, 8));
  }, [search, resumes]);

  // ==========================================
  // Close Dropdowns on Outside Click
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setShowProfile(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target
        )
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==========================================
  // Search Result Click
  // ==========================================

  const handleSearchResult = (result) => {
    setSearch("");
    setSearchResults([]);

    if (result.type === "resume") {
      localStorage.setItem(
        "selectedResumeId",
        result.resumeId
      );

      navigate("/my-resumes");
      return;
    }

    navigate(result.path);
  };

  // ==========================================
  // Search Enter
  // ==========================================

  const handleSearchKeyDown = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    if (searchResults.length > 0) {
      handleSearchResult(searchResults[0]);
    }
  };

  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem(
      "selectedResumeId"
    );
    localStorage.removeItem(
      "selectedTemplate"
    );

    setShowProfile(false);

    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      {/* Left */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Welcome back 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* ====================================== */}
        {/* Search */}
        {/* ====================================== */}

        <div
          ref={searchRef}
          className="relative hidden items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 lg:flex"
        >
          <Search
            size={18}
            className="text-slate-500 dark:text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={handleSearchKeyDown}
            placeholder="Search..."
            className="ml-2 w-36 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
          />

          {/* Search Results */}

          {search.trim() && (
            <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                  Search Results
                </h3>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSearchResults([]);
                  }}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <X size={15} />
                </button>
              </div>

              {searchResults.length > 0 ? (
                <div className="max-h-80 overflow-y-auto p-2">
                  {searchResults.map(
                    (result, index) => {
                      const Icon = result.icon;

                      return (
                        <button
                          key={`${result.type}-${result.title}-${index}`}
                          type="button"
                          onClick={() =>
                            handleSearchResult(
                              result
                            )
                          }
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
                            <Icon
                              size={17}
                              className="text-blue-600"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                              {result.title}
                            </p>

                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                              {result.description}
                            </p>
                          </div>
                        </button>
                      );
                    }
                  )}

                  <p className="px-3 py-2 text-center text-xs text-slate-400">
                    Press Enter to open the first
                    result
                  </p>
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <Search
                    size={24}
                    className="mx-auto mb-2 text-slate-300"
                  />

                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    No results found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try another search term.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dark Mode Button */}

        <button
          type="button"
          onClick={() =>
            setDarkMode(!darkMode)
          }
          title={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          className="rounded-xl bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          {darkMode ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        {/* Notifications */}

        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => {
              setShowNotifications(
                !showNotifications
              );
              setShowProfile(false);
              setSearchResults([]);
            }}
            title="Notifications"
            className="relative rounded-xl bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <Bell size={18} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                <h3 className="font-semibold text-slate-800 dark:text-white">
                  Notifications
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setShowNotifications(
                      false
                    )
                  }
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                <div className="flex gap-3 border-b border-slate-100 px-4 py-4 dark:border-slate-700">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
                    <CheckCircle
                      size={18}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                      Resume saved successfully
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Your latest resume is safely
                      saved.
                    </p>

                    <span className="mt-1 block text-xs text-slate-400">
                      Recently
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 border-b border-slate-100 px-4 py-4 dark:border-slate-700">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/40">
                    <Sparkles
                      size={18}
                      className="text-violet-600"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                      AI features are ready
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Generate summaries, projects and
                      cover letters.
                    </p>

                    <span className="mt-1 block text-xs text-slate-400">
                      Recently
                    </span>
                  </div>
                </div>

                <div className="px-4 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNotifications(false);
                      navigate("/my-resumes");
                    }}
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    View My Resumes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}

        <div
          ref={profileRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
              setSearchResults([]);
            }}
            title="Profile"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            U
          </button>

          {showProfile && (
            <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="border-b border-slate-200 px-4 py-4 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                    U
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      My Account
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Resume Builder Account
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/profile");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <User size={18} />
                  Profile
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/settings");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <Settings size={18} />
                  Settings
                </button>

                <div className="my-1 border-t border-slate-200 dark:border-slate-700" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;