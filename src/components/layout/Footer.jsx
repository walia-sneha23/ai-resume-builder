import {
  Mail,
  Send,
} from "lucide-react";

function Footer() {
  return (
   <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* CTA */}

      <div className="border-b border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-16 text-center lg:flex-row lg:text-left">

          <div>

            <h2 className="text-4xl font-extrabold leading-tight lg:text-5xl">
  Ready to Build Your
  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
    Dream Resume?
  </span>
</h2>

            <p className="mt-4 max-w-xl text-slate-400">
              Create ATS-friendly resumes in minutes using AI and
              increase your chances of getting hired.
            </p>

          </div>

          <button className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/30">
            🚀 Get Started Free
          </button>

        </div>

      </div>

      {/* Footer */}

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-5">

        {/* Logo */}

        <div>

         <h2 className="text-4xl font-extrabold tracking-tight">
  AI <span className="text-blue-500">Resume</span> Builder
</h2>

          <p className="mt-4 text-slate-400">
            Build professional ATS-friendly resumes powered by AI.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
  <button className="rounded-full border border-slate-700 px-4 py-2 text-sm transition hover:border-blue-500 hover:bg-blue-600">
  GitHub
</button>

<button className="rounded-full border border-slate-700 px-4 py-2 text-sm transition hover:border-pink-500 hover:bg-pink-600">
  Instagram
</button>

<button className="rounded-full border border-slate-700 px-4 py-2 text-sm transition hover:border-sky-500 hover:bg-sky-600">
  LinkedIn
</button>
</div>

        </div>

        {/* Product */}

        <div>

          <h3 className="mb-5 text-xl font-semibold">
            Product
          </h3>

          <ul className="space-y-3 text-slate-400">

            <li>Resume Builder</li>
            <li>Templates</li>
            <li>Cover Letter</li>
            <li>ATS Checker</li>

          </ul>

        </div>

        {/* Company */}

        <div>

          <h3 className="mb-5 text-xl font-semibold">
            Company
          </h3>

          <ul className="space-y-3 text-slate-400">

            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Contact</li>

          </ul>

        </div>

        {/* Resources */}

        <div>

          <h3 className="mb-5 text-xl font-semibold">
            Resources
          </h3>

          <ul className="space-y-3 text-slate-400">

            <li>FAQ</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
            <li>Support</li>

          </ul>

        </div>

        {/* Newsletter */}

        <div>

          <h3 className="mb-5 text-xl font-semibold">
            Newsletter
          </h3>

          <p className="mb-4 text-slate-400">
            Get resume tips every week.
          </p>

          <div className="mt-6 flex overflow-hidden rounded-xl border border-slate-700">

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-slate-900 px-4 py-4 text-white placeholder:text-slate-500 outline-none"
            />

            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 transition hover:from-blue-700 hover:to-indigo-700">

              <Send size={20} />

            </button>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-400 md:flex-row">

          <p>
            © 2026 AI Resume Builder. All Rights Reserved.
          </p>

         <span className="font-medium">
  support@airesumebuilder.com
</span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;