import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQSection() {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      question: "Is AI Resume Builder free to use?",
      answer:
        "Yes. You can create your first ATS-friendly resume completely free. Upgrade anytime for premium templates and AI features.",
    },
    {
      question: "Are the resumes ATS-friendly?",
      answer:
        "Absolutely! Every resume template is optimized for Applicant Tracking Systems (ATS) used by recruiters.",
    },
    {
      question: "Can I download my resume as PDF?",
      answer:
        "Yes. You can preview your resume and download it instantly in high-quality PDF format.",
    },
    {
      question: "Can AI generate my resume?",
      answer:
        "Yes. Our AI helps generate professional summaries, skills, work experience, and resume content within seconds.",
    },
    {
      question: "Can I edit my resume later?",
      answer:
        "Of course! Your resume is saved in your dashboard so you can edit and update it anytime.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">

        <h2 className="text-center text-5xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-slate-500">
          Everything you need to know before creating your resume.
        </p>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg"
            >

              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >

                <h3 className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </h3>

                <ChevronDown
                  className={`transition duration-300 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />

              </button>

              {open === index && (

                <div className="border-t border-slate-200 px-6 pb-6 pt-4">

                  <p className="leading-8 text-slate-600">
                    {faq.answer}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQSection;