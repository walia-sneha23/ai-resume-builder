function FeatureSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-4xl font-bold text-gray-900">
          Why Choose AI Resume Builder?
        </h2>

        <p className="mt-4 text-center text-gray-500">
          Everything you need to create an ATS-friendly resume.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          <div className="rounded-2xl border p-8 shadow-sm transition hover:shadow-xl">
            <div className="text-5xl">⚡</div>
            <h3 className="mt-6 text-2xl font-bold">AI Generated</h3>
            <p className="mt-4 text-gray-500">
              Generate your resume in seconds using AI.
            </p>
          </div>

          <div className="rounded-2xl border p-8 shadow-sm transition hover:shadow-xl">
            <div className="text-5xl">🎨</div>
            <h3 className="mt-6 text-2xl font-bold">Beautiful Templates</h3>
            <p className="mt-4 text-gray-500">
              Modern ATS-friendly templates loved by recruiters.
            </p>
          </div>

          <div className="rounded-2xl border p-8 shadow-sm transition hover:shadow-xl">
            <div className="text-5xl">📄</div>
            <h3 className="mt-6 text-2xl font-bold">Download PDF</h3>
            <p className="mt-4 text-gray-500">
              Download your resume instantly in PDF format.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default FeatureSection;