function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Frontend Developer",
      review:
        "This AI Resume Builder helped me get interview calls within a week. Amazing templates!",
    },
    {
      id: 2,
      name: "Priya Mehta",
      role: "Software Engineer",
      review:
        "Very easy to use and ATS-friendly. I loved the professional designs.",
    },
    {
      id: 3,
      name: "Aman Gupta",
      role: "UI/UX Designer",
      review:
        "Best resume builder I've used. The interface is clean and modern.",
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-gray-900">
          What Our Users Say
        </h2>

        <p className="mt-4 text-center text-gray-500">
          Thousands of professionals trust our Resume Builder.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((user) => (
            <div
              key={user.id}
              className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="text-5xl">😊</div>

              <p className="mt-6 text-gray-600 italic">
                "{user.review}"
              </p>

              <h3 className="mt-8 text-xl font-bold">
                {user.name}
              </h3>

              <p className="text-gray-500">
                {user.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;