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
    <aside className="sticky top-24 h-fit w-72 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-bold text-slate-800">
        Resume Sections
      </h2>

      <div className="space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            activeSection === item.value;

          return (
            <button
              key={item.value}
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