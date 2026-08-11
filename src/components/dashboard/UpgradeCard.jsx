import { Crown, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UpgradeCard() {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-6 text-white shadow-xl">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-white/20 p-3">
          <Crown size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Upgrade to Pro
          </h2>

          <p className="text-violet-100">
            Unlock Premium Features
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {[
          "Unlimited AI Resume Generation",
          "Premium Resume Templates",
          "Advanced ATS Score Checker",
          "AI Cover Letter Generator",
          "Priority Support",
        ].map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-3"
          >
            <div className="rounded-full bg-green-500 p-1">
              <Check size={14} />
            </div>

            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate("/pricing")}
        className="mt-8 w-full rounded-xl bg-white py-3 font-semibold text-indigo-600 transition hover:scale-[1.02] hover:bg-slate-100"
      >
        Upgrade Now 🚀
      </button>
    </div>
  );
}

export default UpgradeCard;