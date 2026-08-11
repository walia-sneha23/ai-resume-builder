import { useNavigate } from "react-router-dom";

function Greeting() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const firstName = user?.fullName?.split(" ")[0] || "User";

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg dark:from-blue-800 dark:to-indigo-900 lg:p-8">
      {/* Background Effects */}
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
            🚀 AI Resume Builder
          </span>

          <h1 className="mt-4 text-3xl font-bold lg:text-5xl">
            Welcome back, {firstName} 👋
          </h1>

          <p className="mt-4 text-lg leading-7 text-blue-100 dark:text-blue-200">
            Build ATS-friendly resumes, generate AI-powered content, and
            download professional resumes in minutes.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/resume-builder")}
              className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition hover:scale-105 hover:bg-slate-100"
            >
              Create Resume
            </button>

            <button
              onClick={() => navigate("/templates")}
              className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Browse Templates
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="hidden lg:block">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm text-blue-100">
              Ready to create your next ATS resume?
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              Let's build something amazing.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Greeting;