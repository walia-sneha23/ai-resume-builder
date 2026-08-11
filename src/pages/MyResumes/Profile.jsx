import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Briefcase,
  ShieldCheck,
} from "lucide-react";

function Profile() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your personal information and professional details.
        </p>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Profile Header */}
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-8 md:px-8">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src="https://ui-avatars.com/api/?name=Sneha+Walia&background=2563eb&color=fff&size=150"
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-white shadow-md"
              />

              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700"
              >
                <Camera size={17} />
              </button>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-800">
              Sneha Walia
            </h2>

            <div className="mt-1 flex items-center gap-2 text-slate-500">
              <Briefcase size={16} />
              <span>MERN Stack Developer</span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your personal and contact information.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Full Name */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <User size={17} className="text-blue-600" />
                Full Name
              </label>

              <input
                type="text"
                defaultValue="Sneha Walia"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Mail size={17} className="text-blue-600" />
                Email Address
              </label>

              <input
                type="email"
                defaultValue="sneha@email.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Phone size={17} className="text-blue-600" />
                Phone Number
              </label>

              <input
                type="text"
                defaultValue="+91 9876543210"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <MapPin size={17} className="text-blue-600" />
                Location
              </label>

              <input
                type="text"
                defaultValue="Kaithal, Haryana"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="mt-10 border-t border-slate-100 pt-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-800">
                Professional Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add information that helps personalize your resume.
              </p>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Briefcase size={17} className="text-blue-600" />
                Professional Title
              </label>

              <input
                type="text"
                defaultValue="MERN Stack Developer"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Security Info */}
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Your information is secure
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Your profile information is used to personalize your resume
                and AI-generated content.
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;