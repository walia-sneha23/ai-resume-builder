import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    personalInfo: {
      fullName: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
      linkedin: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      portfolio: {
        type: String,
        default: "",
      },
      summary: {
        type: String,
        default: "",
      },
    },

    education: [
      {
        degree: String,
        institute: String,
        location: String,
        startYear: String,
        endYear: String,
        cgpa: String,
      },
    ],

    experience: [
      {
        company: String,
        position: String,
        location: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],

    projects: [
      {
        title: String,
        technologies: String,
        description: String,
        github: String,
        liveLink: String,
      },
    ],

    skills: [
      {
        category: String,
        items: [String],
      },
    ],

    certifications: [
      {
        title: String,
        issuer: String,
        year: String,
      },
    ],

    languages: [String],

    template: {
      type: String,
      default: "modern",
    },

    atsScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resume", resumeSchema);