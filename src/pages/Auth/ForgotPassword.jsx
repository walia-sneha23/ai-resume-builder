import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Forgot Password 🔑
          </h1>

          <p className="mt-3 text-slate-600">
            Enter your email and we'll send you a password reset link.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6">

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            Send Reset Link
          </button>

        </form>

        <p className="mt-8 text-center text-slate-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Login
          </Link>
        </p>

      </div>
    </section>
  );
}

export default ForgotPassword;