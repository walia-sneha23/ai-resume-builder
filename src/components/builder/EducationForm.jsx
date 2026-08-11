import { GraduationCap } from "lucide-react";
import { useResume } from "../../context/ResumeContext";

function EducationForm({ setActiveSection }){
  const { resumeData, updateEducation } = useResume();

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center gap-3">
        <GraduationCap className="text-blue-600" size={28} />

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Education
          </h2>

          <p className="text-slate-500">
            Add your education details.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Degree
          </label>

          <input
            type="text"
            value={resumeData.education.degree}
            onChange={(e) =>
              updateEducation("degree", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            College
          </label>

          <input
            type="text"
            value={resumeData.education.college}
            onChange={(e) =>
              updateEducation("college", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Start Year
          </label>

          <input
            type="text"
            value={resumeData.education.startYear}
            onChange={(e) =>
              updateEducation("startYear", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            End Year
          </label>

          <input
            type="text"
            value={resumeData.education.endYear}
            onChange={(e) =>
              updateEducation("endYear", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            CGPA / Percentage
          </label>

          <input
            type="text"
            value={resumeData.education.cgpa}
            onChange={(e) =>
              updateEducation("cgpa", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

      </div>
      <div className="mt-8 flex items-center justify-between">

  <button
    onClick={() => setActiveSection("personal")}
    className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
  >
    ← Previous
  </button>

  <button
    onClick={() => setActiveSection("experience")}
    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
  >
    Save & Continue →
  </button>

</div>
    </div>
  );
}

export default EducationForm;