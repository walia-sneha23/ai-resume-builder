import {
  User,
  GraduationCap,
  Briefcase,
  Code,
  FolderKanban,
  Award,
  Languages,
} from "lucide-react";

const menuItems = [
  {
    title: "Personal Info",
    value: "personal",
    icon: User,
  },
  {
    title: "Education",
    value: "education",
    icon: GraduationCap,
  },
  {
    title: "Experience",
    value: "experience",
    icon: Briefcase,
  },
  {
    title: "Skills",
    value: "skills",
    icon: Code,
  },
  {
    title: "Projects",
    value: "projects",
    icon: FolderKanban,
  },
  {
    title: "Certifications",
    value: "certifications",
    icon: Award,
  },
  {
    title: "Languages",
    value: "languages",
    icon: Languages,
  },
];

function BuilderSidebar({
  activeSection,
  setActiveSection,
}) {
  return (
    <aside className="sticky top-24 w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 md:w-72 md:shrink-0 md:p-6">
      <h2 className="mb-3 text-lg font-bold text-slate-800 md:mb-6">
        Resume Sections
      </h2>

      {/* Mobile / Tablet Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 md:hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            activeSection === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                setActiveSection(item.value)
              }
              className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Icon size={17} />
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden space-y-2 md:block">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            activeSection === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                setActiveSection(item.value)
              }
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default BuilderSidebar;