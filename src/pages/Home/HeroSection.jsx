import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-100">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 py-20 lg:flex-row">

        {/* ============================= */}
        {/* Left Side */}
        {/* ============================= */}

        <div className="flex-1">

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 lg:text-7xl">
            Land Your Dream Job

            <span className="mt-2 block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              with AI Resume Builder
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-8 text-slate-600">
            Build ATS-friendly resumes in minutes using AI.
            Choose beautiful templates and download your resume instantly.
          </p>

          <div className="mt-10 flex gap-5">

            <button
              onClick={() => navigate("/login")}
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-2xl"
            >
              🚀 Build Resume →
            </button>

            <button
              type="button"
              className="rounded-xl border-2 border-blue-600 px-8 py-4 font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-blue-50"
            >
              📄 View Templates
            </button>

          </div>

          <div className="mt-8 flex items-center gap-3">

            <div className="flex text-lg text-yellow-400">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="text-sm font-medium text-slate-500">
              Trusted by 10,000+ Job Seekers
            </p>

          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-8">

            <div>
              <h3 className="text-3xl font-bold text-blue-600">
                10K+
              </h3>

              <p className="text-gray-500">
                Users
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-600">
                95%
              </h3>

              <p className="text-gray-500">
                ATS Score
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-blue-600">
                500+
              </h3>

              <p className="text-gray-500">
                Templates
              </p>
            </div>

          </div>

        </div>

        {/* ============================= */}
        {/* Right Side */}
        {/* ============================= */}

        <div className="relative flex flex-1 items-center justify-center">

          {/* Resume Card */}

          <div className="w-full max-w-lg rounded-[32px] border border-slate-100 bg-white p-8 shadow-[0_35px_80px_rgba(15,23,42,0.15)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_45px_100px_rgba(37,99,235,0.18)]">

            {/* Header */}

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-2xl font-bold text-white">
                YN
              </div>

              <div>

                <h3 className="text-2xl font-bold text-slate-900">
                  Your Name
                </h3>

                <p className="text-slate-500">
                  Your Professional Title
                </p>

                <div className="mt-3 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  🟢 AI Generated Resume
                </div>

              </div>

            </div>

            <hr className="my-6" />

            {/* ============================= */}
            {/* Summary */}
            {/* ============================= */}

            <h4 className="font-semibold text-slate-900">
              PROFESSIONAL SUMMARY
            </h4>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Create a professional ATS-friendly resume with AI-powered
              tools, modern templates, and personalized career content.
            </p>

            {/* ============================= */}
            {/* Skills */}
            {/* ============================= */}

            <h4 className="mt-8 font-semibold text-slate-900">
              TECH STACK
            </h4>

            <div className="mt-4 flex flex-wrap gap-3">

              {[
                "React",
                "JavaScript",
                "Tailwind",
                "Node.js",
                "MongoDB",
              ].map((item) => (

                <span
                  key={item}
                  className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                >
                  {item}
                </span>

              ))}

            </div>

            {/* ============================= */}
            {/* Experience */}
            {/* ============================= */}

            <h4 className="mt-8 font-semibold text-slate-900">
              EXPERIENCE
            </h4>

            <div className="mt-4 rounded-xl border border-slate-200 p-4">

              <h5 className="text-lg font-bold text-slate-900">
                Professional Experience
              </h5>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                • Professional Skills Development
                <br />
                • Project Experience
                <br />
                • Modern Technology
                <br />
                • ATS-Friendly Resume
              </p>

            </div>

          </div>

          {/* ============================= */}
          {/* ATS Card */}
          {/* ============================= */}

          <div className="absolute -right-10 top-10 rounded-3xl border border-green-100 bg-white px-6 py-5 shadow-2xl">

            <h2 className="mt-1 text-5xl font-bold text-green-600">
              95%
            </h2>

            <p className="mt-1 text-xs font-semibold text-green-600">
              ATS Optimized
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;