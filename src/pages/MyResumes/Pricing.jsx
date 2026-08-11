import { Check, Crown, Star } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    duration: "/month",
    button: "Current Plan",
    featured: false,
    features: [
      "1 Resume",
      "Basic Templates",
      "Resume Preview",
      "Download PDF",
    ],
  },
  {
    name: "Pro",
    price: "₹299",
    duration: "/month",
    button: "Upgrade Now",
    featured: true,
    features: [
      "Unlimited Resumes",
      "AI Resume Generator",
      "ATS Score Checker",
      "Premium Templates",
      "Cover Letter Generator",
      "Priority Support",
    ],
  },
  {
    name: "Enterprise",
    price: "₹999",
    duration: "/month",
    button: "Contact Sales",
    featured: false,
    features: [
      "Everything in Pro",
      "Team Management",
      "Cloud Storage",
      "Admin Dashboard",
      "24/7 Premium Support",
    ],
  },
];

function Pricing() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          Choose Your Plan
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Unlock premium features and build professional resumes faster.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl border p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
              plan.featured
                ? "border-blue-600 bg-gradient-to-b from-blue-50 to-white shadow-blue-500/10 dark:from-blue-950 dark:via-slate-900 dark:to-slate-800"
                : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
            }`}
          >
            {/* Popular Badge */}
            {plan.featured && (
              <div className="mb-5 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Star size={18} fill="currentColor" />

                <span className="font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan Name */}
            <div className="flex items-center gap-3">
              <Crown
                className={
                  plan.featured
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-500 dark:text-slate-400"
                }
              />

              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                {plan.name}
              </h2>
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-5xl font-bold text-slate-900 dark:text-white">
                {plan.price}
              </span>

              <span className="ml-1 text-slate-500 dark:text-slate-400">
                {plan.duration}
              </span>
            </div>

            {/* Features */}
            <ul className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <Check
                    className="shrink-0 text-green-600"
                    size={18}
                  />

                  <span className="text-slate-700 dark:text-slate-200">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              type="button"
              className={`mt-10 w-full rounded-xl py-3 font-semibold transition-all ${
                plan.featured
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-lg"
                  : "border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;