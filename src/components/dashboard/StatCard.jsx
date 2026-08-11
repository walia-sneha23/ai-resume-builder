function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Top */}
      <div className="flex items-center justify-between">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
        >
          <Icon className="text-white" size={22} />
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          Overview
        </span>

      </div>

      {/* Value */}
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </h2>

      {/* Title */}
      <p className="mt-2 text-sm text-slate-500">
        {title}
      </p>

      {/* Bottom Line */}
      <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 group-hover:w-full ${color}`}
          style={{ width: "70%" }}
        ></div>
      </div>

    </div>
  );
}

export default StatCard;