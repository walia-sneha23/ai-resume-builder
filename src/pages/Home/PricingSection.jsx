import { useState } from "react";
import { Check } from "lucide-react";

function PricingSection() {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      monthly: "₹0",
      yearly: "₹0",
      popular: false,
      button: "Start Free",
      features: [
        "1 Resume",
        "ATS Friendly",
        "PDF Download",
        "Basic Templates",
      ],
    },
    {
      name: "Professional",
      monthly: "₹299",
      yearly: "₹2499",
      popular: true,
      button: "Get Premium",
      features: [
        "Unlimited Resumes",
        "AI Resume Generator",
        "ATS Score Checker",
        "Cover Letter",
        "Premium Templates",
        "Priority Support",
      ],
    },
    {
      name: "Business",
      monthly: "₹599",
      yearly: "₹4999",
      popular: false,
      button: "Contact Sales",
      features: [
        "Everything in Pro",
        "Team Management",
        "Company Branding",
        "Unlimited Downloads",
        "Analytics",
      ],
    },
  ];

  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-5xl font-bold text-slate-900">
          Simple Pricing
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-slate-500">
          Choose a plan that helps you land your dream job faster.
        </p>

        {/* Toggle */}

        <div className="mt-12 flex justify-center">

          <div className="flex rounded-full bg-white p-2 shadow-lg">

            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-6 py-2 font-semibold transition ${
                !yearly
                  ? "bg-blue-600 text-white"
                  : "text-slate-600"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-6 py-2 font-semibold transition ${
                yearly
                  ? "bg-blue-600 text-white"
                  : "text-slate-600"
              }`}
            >
              Yearly
            </button>

          </div>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {plans.map((plan) => (

            <div
              key={plan.name}
              className={`relative rounded-3xl bg-white p-8 transition duration-500 hover:-translate-y-3 hover:shadow-2xl ${
                plan.popular
                  ? "border-2 border-blue-600 shadow-2xl"
                  : "border border-slate-200"
              }`}
            >

              {plan.popular && (

                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
                  ⭐ Most Popular
                </div>

              )}

              <h3 className="text-2xl font-bold">
                {plan.name}
              </h3>

              <h2 className="mt-6 text-5xl font-bold text-blue-600">
                {yearly ? plan.yearly : plan.monthly}
              </h2>

              <p className="mt-2 text-slate-500">
                {yearly ? "per year" : "per month"}
              </p>

              <button
                className={`mt-8 w-full rounded-xl py-4 font-semibold transition ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                }`}
              >
                {plan.button}
              </button>

              <div className="mt-8 space-y-4">

                {plan.features.map((feature) => (

                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >

                    <Check
                      size={18}
                      className="text-green-600"
                    />

                    <span className="text-slate-600">
                      {feature}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default PricingSection;