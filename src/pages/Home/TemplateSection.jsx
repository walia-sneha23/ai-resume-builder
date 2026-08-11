function TemplateSection() {
  const templates = [
    {
      id: 1,
      title: "Modern",
      color: "bg-blue-100",
    },
    {
      id: 2,
      title: "Professional",
      color: "bg-green-100",
    },
    {
      id: 3,
      title: "Creative",
      color: "bg-purple-100",
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-4xl font-bold">
          Resume Templates
        </h2>

        <p className="mt-4 text-center text-gray-500">
          Choose your favorite resume design.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {templates.map((template) => (
            <div
              key={template.id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className={`${template.color} h-80`}></div>

              <div className="p-6">
                <h3 className="text-2xl font-bold">
                  {template.title}
                </h3>

                <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700">
                  Use Template
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default TemplateSection;