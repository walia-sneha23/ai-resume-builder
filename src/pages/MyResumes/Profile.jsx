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

import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    professionalTitle: "",
  });

  // ==========================================
  // Fetch Logged-in User
  // ==========================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user =
          response.data?.user ||
          response.data?.data ||
          response.data;

        setProfile({
          fullName:
            user?.fullName ||
            user?.name ||
            "",
          email:
            user?.email ||
            "",
          phone:
            user?.phone ||
            "",
          location:
            user?.location ||
            user?.address ||
            "",
          professionalTitle:
            user?.professionalTitle ||
            user?.title ||
            "",
        });
      } catch (error) {
        console.error(
          "PROFILE FETCH ERROR:",
          error
        );

        // Try previously saved profile data
        const savedProfile =
          localStorage.getItem("profileData");

        if (savedProfile) {
          try {
            setProfile(
              JSON.parse(savedProfile)
            );
          } catch {
            console.error(
              "Invalid saved profile data"
            );
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ==========================================
  // Handle Input
  // ==========================================

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==========================================
  // Save Profile
  // ==========================================

  const handleSave = () => {
    try {
      setSaving(true);

      localStorage.setItem(
        "profileData",
        JSON.stringify(profile)
      );

      alert(
        "Profile changes saved successfully ✅"
      );
    } catch (error) {
      console.error(
        "PROFILE SAVE ERROR:",
        error
      );

      alert("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // Avatar
  // ==========================================

  const avatarName =
    profile.fullName || "User";

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    avatarName
  )}&background=2563eb&color=fff&size=150`;

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your personal information and
          professional details.
        </p>
      </div>

      {/* Profile Card */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Profile Header */}

        <div className="border-b border-slate-100 bg-slate-50 px-6 py-8 md:px-8">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={avatarUrl}
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
              {profile.fullName ||
                "Your Name"}
            </h2>

            <div className="mt-1 flex items-center gap-2 text-slate-500">
              <Briefcase size={16} />

              <span>
                {profile.professionalTitle ||
                  "Professional"}
              </span>
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
              Update your personal and contact
              information.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Full Name */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <User
                  size={17}
                  className="text-blue-600"
                />

                Full Name
              </label>

              <input
                type="text"
                value={profile.fullName}
                onChange={(e) =>
                  handleChange(
                    "fullName",
                    e.target.value
                  )
                }
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Mail
                  size={17}
                  className="text-blue-600"
                />

                Email Address
              </label>

              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  handleChange(
                    "email",
                    e.target.value
                  )
                }
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Phone
                  size={17}
                  className="text-blue-600"
                />

                Phone Number
              </label>

              <input
                type="text"
                value={profile.phone}
                onChange={(e) =>
                  handleChange(
                    "phone",
                    e.target.value
                  )
                }
                placeholder="Enter your phone number"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Location */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <MapPin
                  size={17}
                  className="text-blue-600"
                />

                Location
              </label>

              <input
                type="text"
                value={profile.location}
                onChange={(e) =>
                  handleChange(
                    "location",
                    e.target.value
                  )
                }
                placeholder="City, State"
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
                Add information that helps
                personalize your resume.
              </p>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Briefcase
                  size={17}
                  className="text-blue-600"
                />

                Professional Title
              </label>

              <input
                type="text"
                value={
                  profile.professionalTitle
                }
                onChange={(e) =>
                  handleChange(
                    "professionalTitle",
                    e.target.value
                  )
                }
                placeholder="e.g. Cloud Engineer"
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
                Your profile information is used
                to personalize your resume and
                AI-generated content.
              </p>
            </div>
          </div>

          {/* Save Button */}

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={18} />

              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;