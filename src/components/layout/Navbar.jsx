import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AI Resume Builder
        </Link>

        {/* Menu */}
        <div className="hidden gap-8 md:flex">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Templates
          </Link>

          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Pricing
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="rounded-lg border border-blue-600 px-5 py-2 text-blue-600 hover:bg-blue-50">
            Login
          </button>

          <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;