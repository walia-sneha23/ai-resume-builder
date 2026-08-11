import { Award, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useResume } from "../../context/ResumeContext";

function CertificationsForm({ setActiveSection }) {
  const { resumeData, updateResume } =
    useResume();

  // ==========================================
  // Certifications
  // No default certificate
  // ==========================================

  const [certifications, setCertifications] =
    useState(
      Array.isArray(resumeData.certifications)
        ? resumeData.certifications
        : []
    );

  // ==========================================
  // Sync With Resume Context
  // ==========================================

  useEffect(() => {
    updateResume(
      "certifications",
      certifications
    );
  }, [certifications]);

  // ==========================================
  // Update Certification
  // ==========================================

  const updateCertification = (
    index,
    field,
    value
  ) => {
    const updatedCertifications = [
      ...certifications,
    ];

    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };

    setCertifications(
      updatedCertifications
    );
  };

  // ==========================================
  // Add Certification
  // ==========================================

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        title: "",
        issuer: "",
        year: "",
        credentialId: "",
      },
    ]);
  };

  // ==========================================
  // Remove Certification
  // ==========================================

  const removeCertification = (
    index
  ) => {
    const updatedCertifications =
      certifications.filter(
        (_, certificationIndex) =>
          certificationIndex !== index
      );

    setCertifications(
      updatedCertifications
    );
  };

  // ==========================================
  // Continue
  // ==========================================

  const handleContinue = () => {
    updateResume(
      "certifications",
      certifications
    );

    setActiveSection("languages");
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">

      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Award
            className="text-blue-600"
            size={28}
          />

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Certifications
            </h2>

            <p className="text-slate-500">
              Add your professional
              certifications.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={addCertification}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Certificate
        </button>

      </div>

      {/* ====================================== */}
      {/* Empty State */}
      {/* ====================================== */}

      {certifications.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">

          <Award
            size={34}
            className="mx-auto mb-3 text-slate-300"
          />

          <p className="font-medium text-slate-600">
            No certifications added yet
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Add certifications to
            strengthen your resume.
          </p>

          <button
            type="button"
            onClick={addCertification}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Add Certificate
          </button>

        </div>
      )}

      {/* ====================================== */}
      {/* Certification Cards */}
      {/* ====================================== */}

      <div className="space-y-6">

        {certifications.map(
          (certificate, index) => (

            <div
              key={index}
              className="space-y-6 rounded-xl border border-slate-200 p-6"
            >

              {/* Certificate Name */}

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Certificate Name
                </label>

                <input
                  type="text"
                  value={
                    certificate.title ||
                    ""
                  }
                  onChange={(e) =>
                    updateCertification(
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="AWS Cloud Practitioner"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Issuer */}

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Issued By
                </label>

                <input
                  type="text"
                  value={
                    certificate.issuer ||
                    ""
                  }
                  onChange={(e) =>
                    updateCertification(
                      index,
                      "issuer",
                      e.target.value
                    )
                  }
                  placeholder="Amazon Web Services"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Year + Credential */}

              <div className="grid gap-5 md:grid-cols-2">

                {/* Year */}

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Issue Year
                  </label>

                  <input
                    type="text"
                    value={
                      certificate.year ||
                      ""
                    }
                    onChange={(e) =>
                      updateCertification(
                        index,
                        "year",
                        e.target.value
                      )
                    }
                    placeholder="2026"
                    maxLength={4}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Credential ID */}

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Credential ID
                  </label>

                  <input
                    type="text"
                    value={
                      certificate.credentialId ||
                      ""
                    }
                    onChange={(e) =>
                      updateCertification(
                        index,
                        "credentialId",
                        e.target.value
                      )
                    }
                    placeholder="ABC123XYZ"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

              {/* Remove */}

              <div className="flex justify-end">

                <button
                  type="button"
                  onClick={() =>
                    removeCertification(
                      index
                    )
                  }
                  className="flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={18} />
                  Remove
                </button>

              </div>

            </div>
          )
        )}

      </div>

      {/* ====================================== */}
      {/* Navigation */}
      {/* ====================================== */}

      <div className="mt-8 flex items-center justify-between">

        <button
          type="button"
          onClick={() =>
            setActiveSection(
              "projects"
            )
          }
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          ← Previous
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Save & Continue →
        </button>

      </div>

    </div>
  );
}

export default CertificationsForm;