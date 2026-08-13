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
You are an expert professional resume writer specializing in ATS-friendly resumes.

IMPORTANT ROLE ACCURACY RULE:
The provided Job Role is the SOURCE OF TRUTH.
You MUST write the summary strictly for the provided Job Role.
NEVER change, reinterpret, replace, or assume a different career field or profession.

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
- Make it professional, natural, and ATS-friendly.
- Keep the candidate's Job Role exactly aligned with the provided Job Role.
- Focus on skills, experience, responsibilities, and strengths relevant to the provided Job Role.
- Use technical terminology appropriate for the provided Job Role.
- Do NOT assume a career transition unless it is explicitly provided in the input.
- Do NOT change a non-IT/engineering/business/medical/etc. role into a software or IT role.
- Do NOT introduce technologies merely because they appear in the skills list if they are not relevant to the Job Role.
- Do not invent companies, degrees, certifications, achievements, responsibilities, or experience.
- Do not add a different profession or career path.
- Avoid generic filler.
- Use relevant ATS keywords naturally.
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

IMPORTANT ROLE ACCURACY RULE:
The provided Job Role is the SOURCE OF TRUTH.
Generate skills strictly relevant to that Job Role.
NEVER replace, reinterpret, or change the Job Role into another profession or career field.

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
- Every skill must be relevant to the provided Job Role.
- Prefer standard, industry-recognized skills for that profession.
- Do not add unrelated software/IT technologies just because they are popular.
- Do not infer a career transition.
- Do not change the profession based on assumptions.
- Do not invent unrealistic technologies or qualifications.
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
- Clearly describe what the project does.
- Mention the provided technologies naturally.
- Mention useful technical contributions.
- Keep the description relevant to the actual project.
- Do not invent fake statistics.
- Do not invent features, technologies, achievements, or responsibilities that were not provided.
- Do not change the project type or assume an unrelated career field.
- Keep it concise and suitable for a professional resume.
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

IMPORTANT ROLE ACCURACY RULE:
The provided Job Role is the SOURCE OF TRUTH.
Generate experience bullet points strictly for that Job Role.
NEVER change, reinterpret, replace, or assume a different profession or career field.

Job Role:
${jobRole}

Company:
${company}

Experience Level:
${experienceLevel}

Requirements:
- Generate exactly 5 professional resume experience bullet points.
- Start each point with a strong action verb.
- Keep every bullet strictly relevant to the provided Job Role.
- Mention tools, technologies, processes, equipment, methods, or responsibilities only when relevant to that profession.
- Do not introduce unrelated software/IT responsibilities.
- Do not assume a career transition.
- Do not invent fake statistics.
- Do not invent responsibilities, projects, achievements, qualifications, or experience.
- Keep each point between 18-25 words.
- Keep the content concise and ATS-friendly.
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

IMPORTANT ROLE ACCURACY RULE:
The provided Job Role is the SOURCE OF TRUTH.
Write the cover letter strictly for that Job Role.
NEVER change, reinterpret, replace, or assume a different profession or career field.

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
- Keep the entire letter aligned with the provided Job Role.
- Mention only skills relevant to the provided Job Role.
- Do not introduce unrelated technologies or a different career field.
- Do not assume a career transition unless explicitly stated.
- Do not invent achievements, experience, qualifications, or responsibilities.
- Show genuine interest in the role without making unsupported claims.
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
You are an expert ATS Resume Analyzer.

IMPORTANT ROLE ACCURACY RULE:
The provided Job Role is the SOURCE OF TRUTH.
Evaluate the resume against that exact Job Role only.
NEVER judge the candidate against a different profession or career field.
NEVER assume a career transition that is not explicitly provided.

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
- Evaluate the resume only against the provided Job Role.
- Evaluate skills, experience, projects, summary, and keywords based on that exact profession.
- Do not penalize the resume for not containing skills from an unrelated profession.
- Do not suggest unrelated software/IT keywords for a non-IT role.
- Do not invent missing facts.
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