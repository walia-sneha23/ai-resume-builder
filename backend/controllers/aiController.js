import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==========================================
// AI MODEL
// ==========================================

const AI_MODEL = "gemini-3.5-flash-lite";

// ==========================================
// Helper - Generate AI Content
// ==========================================

const generateAI = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: AI_MODEL,
      contents: prompt,
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("GEMINI ERROR:", error);

    // Rate limit / quota error
    if (
      error?.status === 429 ||
      error?.code === 429 ||
      error?.message?.includes(
        "RESOURCE_EXHAUSTED"
      ) ||
      error?.message?.includes(
        "TooManyRequests"
      )
    ) {
      const quotaError = new Error(
        "AI quota/rate limit reached. Please wait a little and try again."
      );

      quotaError.status = 429;

      throw quotaError;
    }

    throw error;
  }
};

// ==========================================
// Generate Professional Summary
// ==========================================

export const generateSummary = async (
  req,
  res
) => {
  try {
    const {
      jobRole,
      experience,
      skills,
    } = req.body;

    if (
      !jobRole ||
      !experience ||
      !skills
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide jobRole, experience and skills.",
      });
    }

    const prompt = `
You are an expert professional resume writer.

Create a professional ATS-friendly resume summary.

Job Role:
${jobRole}

Experience:
${experience}

Skills:
${
  Array.isArray(skills)
    ? skills.join(", ")
    : skills
}

Requirements:
- Write 80-120 words.
- Make it professional and natural.
- Focus on relevant technical skills.
- Highlight experience and strengths.
- Do not invent companies, degrees, certifications or achievements.
- Avoid generic filler.
- Use ATS-friendly keywords.
- Return ONLY the summary text.
`;

    const summary =
      await generateAI(prompt);

    return res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error(
      "GENERATE SUMMARY ERROR:",
      error
    );

    return res.status(
      error.status === 429
        ? 429
        : 500
    ).json({
      success: false,
      message:
        error.message ||
        "Failed to generate summary.",
    });
  }
};

// ==========================================
// Generate AI Skills
// ==========================================

export const generateSkills = async (
  req,
  res
) => {
  try {
    const {
      jobRole,
      experience,
    } = req.body;

    if (
      !jobRole ||
      !experience
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide jobRole and experience.",
      });
    }

    const prompt = `
You are an expert ATS resume writer.

Generate relevant skills for:

Job Role:
${jobRole}

Experience Level:
${experience}

Return ONLY valid JSON.

Use exactly this format:

{
  "technicalSkills": [
    "Skill 1",
    "Skill 2",
    "Skill 3",
    "Skill 4",
    "Skill 5"
  ],
  "professionalSkills": [
    "Skill 1",
    "Skill 2",
    "Skill 3",
    "Skill 4",
    "Skill 5"
  ],
  "softSkills": [
    "Skill 1",
    "Skill 2",
    "Skill 3",
    "Skill 4",
    "Skill 5"
  ]
}

Rules:
- Skills must be relevant to the job role.
- Do not invent unrealistic technologies.
- Return JSON only.
`;

    let text =
      await generateAI(prompt);

    text = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const skills =
      JSON.parse(text);

    return res.status(200).json({
      success: true,
      skills,
    });
  } catch (error) {
    console.error(
      "GENERATE SKILLS ERROR:",
      error
    );

    return res.status(
      error.status === 429
        ? 429
        : 500
    ).json({
      success: false,
      message:
        error.message ||
        "Failed to generate skills.",
    });
  }
};

// ==========================================
// Generate AI Project Description
// ==========================================

export const generateProjectDescription =
  async (req, res) => {
    try {
      const {
        projectName,
        techStack,
      } = req.body;

      if (
        !projectName ||
        !techStack
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide projectName and techStack.",
        });
      }

      const prompt = `
You are an expert ATS resume writer.

Write a professional resume project description.

Project Name:
${projectName}

Tech Stack:
${techStack}

Requirements:
- Write 4 concise professional sentences.
- Focus on what the project does.
- Mention technologies naturally.
- Mention useful technical contributions.
- Do not invent fake statistics.
- Keep it concise enough for a resume.
- Return ONLY the description.
`;

      const description =
        await generateAI(prompt);

      return res.status(200).json({
        success: true,
        description,
      });
    } catch (error) {
      console.error(
        "GENERATE PROJECT DESCRIPTION ERROR:",
        error
      );

      return res.status(
        error.status === 429
          ? 429
          : 500
      ).json({
        success: false,
        message:
          error.message ||
          "Failed to generate project description.",
      });
    }
  };

// ==========================================
// Generate AI Experience
// ==========================================

export const generateExperience =
  async (req, res) => {
    try {
      const {
        jobRole,
        company,
        experienceLevel,
      } = req.body;

      if (
        !jobRole ||
        !company ||
        !experienceLevel
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide jobRole, company and experienceLevel.",
        });
      }

      const prompt = `
You are an expert ATS Resume Writer.

Generate exactly 5 professional resume experience bullet points.

Job Role:
${jobRole}

Company:
${company}

Experience Level:
${experienceLevel}

Rules:
- Exactly 5 bullet points.
- Start each point with a strong action verb.
- ATS friendly.
- Mention technologies only when relevant.
- Do not invent fake statistics.
- Keep each point between 18-25 words.
- Keep the content concise.
- Return plain text only.
`;

      const experience =
        await generateAI(prompt);

      return res.status(200).json({
        success: true,
        experience,
      });
    } catch (error) {
      console.error(
        "GENERATE EXPERIENCE ERROR:",
        error
      );

      return res.status(
        error.status === 429
          ? 429
          : 500
      ).json({
        success: false,
        message:
          error.message ||
          "Failed to generate experience.",
      });
    }
  };

// ==========================================
// Generate AI Achievements
// ==========================================

export const generateAchievements =
  async (req, res) => {
    try {
      const {
        jobRole,
        experienceLevel,
      } = req.body;

      if (
        !jobRole ||
        !experienceLevel
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide jobRole and experienceLevel.",
        });
      }

      const prompt = `
You are an expert ATS Resume Writer.

Generate exactly 5 professional resume achievements.

Job Role:
${jobRole}

Experience Level:
${experienceLevel}

Rules:
- Exactly 5 bullet points.
- Start each point with a strong action verb.
- ATS friendly.
- Highlight measurable impact only when information supports it.
- Never invent fake statistics.
- Keep each point between 15-25 words.
- Return plain text only.
`;

      const achievements =
        await generateAI(prompt);

      return res.status(200).json({
        success: true,
        achievements,
      });
    } catch (error) {
      console.error(
        "GENERATE ACHIEVEMENTS ERROR:",
        error
      );

      return res.status(
        error.status === 429
          ? 429
          : 500
      ).json({
        success: false,
        message:
          error.message ||
          "Failed to generate achievements.",
      });
    }
  };

// ==========================================
// Generate AI Cover Letter
// ==========================================

export const generateCoverLetter =
  async (req, res) => {
    try {
      const {
        fullName,
        jobRole,
        companyName,
        experience,
        skills,
      } = req.body;

      if (
        !fullName ||
        !jobRole ||
        !companyName ||
        !experience ||
        !skills
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide fullName, jobRole, companyName, experience and skills.",
        });
      }

      const prompt = `
You are an expert professional cover letter writer.

Write a professional cover letter.

Candidate Name:
${fullName}

Job Role:
${jobRole}

Company:
${companyName}

Experience:
${experience}

Skills:
${
  Array.isArray(skills)
    ? skills.join(", ")
    : skills
}

Requirements:
- Around 250-300 words.
- Professional tone.
- Mention relevant skills naturally.
- Do not invent achievements.
- Show genuine interest in the role.
- End with a professional closing.
- Return ONLY the cover letter.
`;

      const coverLetter =
        await generateAI(prompt);

      return res.status(200).json({
        success: true,
        coverLetter,
      });
    } catch (error) {
      console.error(
        "GENERATE COVER LETTER ERROR:",
        error
      );

      return res.status(
        error.status === 429
          ? 429
          : 500
      ).json({
        success: false,
        message:
          error.message ||
          "Failed to generate cover letter.",
      });
    }
  };

// ==========================================
// ATS Resume Analyzer
// ==========================================

export const analyzeATS = async (
  req,
  res
) => {
  try {
    const {
      summary,
      skills,
      experience,
      projects,
      jobRole,
    } = req.body;

    if (
      !summary ||
      !skills ||
      !experience ||
      !projects ||
      !jobRole
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide summary, skills, experience, projects and jobRole.",
      });
    }

    const prompt = `
You are an ATS Resume Expert.

Analyze this resume for:

Job Role:
${jobRole}

Resume Summary:
${summary}

Skills:
${
  Array.isArray(skills)
    ? skills.join(", ")
    : skills
}

Experience:
${experience}

Projects:
${projects}

Return ONLY valid JSON in this exact format:

{
  "score": 92,
  "strengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3"
  ],
  "improvements": [
    "Improvement 1",
    "Improvement 2",
    "Improvement 3"
  ],
  "missingKeywords": [
    "Keyword1",
    "Keyword2",
    "Keyword3"
  ]
}

Rules:
- Score must be a number from 0 to 100.
- Do not return markdown.
- Do not return explanations.
- Return JSON only.
`;

    let text =
      await generateAI(prompt);

    text = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const ats =
      JSON.parse(text);

    return res.status(200).json({
      success: true,
      analysis: ats,
    });
  } catch (error) {
    console.error(
      "ATS ANALYZER ERROR:",
      error
    );

    return res.status(
      error.status === 429
        ? 429
        : 500
    ).json({
      success: false,
      message:
        error.message ||
        "Failed to analyze resume.",
    });
  }
};