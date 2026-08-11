function FormNavigation({
  previous,
  next,
  setActiveSection,
  isLast = false,
}) {
  return (
    <div className="mt-8 flex items-center justify-between">

      <button
        type="button"
        onClick={() => previous && setActiveSection(previous)}
        disabled={!previous}
        className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        ← Previous
      </button>

      <button
        type="button"
        onClick={() => next && setActiveSection(next)}
        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {isLast ? "Finish Resume 🎉" : "Save & Continue →"}
      </button>

    </div>
  );
}

export default FormNavigation;