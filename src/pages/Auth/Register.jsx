import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setError("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/auth/register", {
        fullName: formData.name,
  email: formData.email,
  password: formData.password,
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Create Account 
          </h1>

          <p className="mt-3 text-slate-600">
            Create your account to start building ATS-friendly resumes with AI.
          </p>
        </div>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          {error && (
            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

        <div>
  <label className="mb-2 block font-medium text-slate-700">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Create a password"
      required
      className="w-full rounded-xl border border-slate-300 py-3 pl-4 pr-12 outline-none transition hover:border-blue-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-blue-600"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
</div>
         <div>
  <label className="mb-2 block font-medium text-slate-700">
    Confirm Password
  </label>

  <div className="relative">
    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      placeholder="Confirm your password"
      required
      className="w-full rounded-xl border border-slate-300 py-3 pl-4 pr-12 outline-none transition hover:border-blue-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-blue-600"
    >
      {showConfirmPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>
  </div>
</div>
          <button
  type="submit"
  disabled={loading}
  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-lg font-semibold text-white transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
>
  {loading ? "Creating Account..." : "Create Account"}
</button>

        </form>

        <p className="mt-8 text-center text-slate-600">
          Already have an account?{" "}
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

export default Register;