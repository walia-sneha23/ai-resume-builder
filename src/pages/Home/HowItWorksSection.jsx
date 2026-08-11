function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      icon: "📝",
      title: "Fill Your Details",
      desc: "Enter your personal, education and experience details.",
    },
    {
      id: 2,
      icon: "🤖",
      title: "AI Generates Resume",
      desc: "Our AI creates a professional ATS-friendly resume instantly.",
    },
    {
      id: 3,
      icon: "📥",
      title: "Download PDF",
      desc: "Preview your resume and download it in one click.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-4xl font-bold text-gray-900">
          How It Works
        </h2>

        <p className="mt-4 text-center text-gray-500">
          Build your resume in just 3 easy steps.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-3xl border bg-white p-10 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-6xl">{step.icon}</div>

              <h3 className="mt-6 text-2xl font-bold">
                {step.title}
              </h3>

              <p className="mt-4 text-gray-500">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;