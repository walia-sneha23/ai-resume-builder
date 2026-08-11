import PDFDocument from "pdfkit";
import Resume from "../models/Resume.js";

// ======================================================
// Download Resume PDF
// ======================================================

export const downloadResumePDF = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("=================================");
    console.log("PDF DOWNLOAD REQUEST");
    console.log("Resume ID:", id);
    console.log("Logged-in User:", req.user?._id);
    console.log("=================================");

    // ==================================================
    // Find Resume
    // IMPORTANT:
    // Resume is fetched by ID first because we also
    // perform an explicit ownership check below.
    // ==================================================

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    // ==================================================
    // User Data Isolation / Ownership Check
    // ==================================================

    if (
      !resume.user ||
      resume.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to download this resume.",
      });
    }

    console.log("Resume found:", resume.title);
    console.log("Template:", resume.template);

    // ==================================================
    // Selected Template
    // ==================================================

    const selectedTemplate =
      resume.template || "Professional";

    // ==================================================
    // PDF Setup
    // ==================================================

    const doc = new PDFDocument({
      size: "A4",
      margins: {
        top: 42,
        bottom: 42,
        left: 45,
        right: 45,
      },
      bufferPages: true,
      autoFirstPage: true,
    });

    // ==================================================
    // Safe Filename
    // ==================================================

    const safeTitle = (resume.title || "resume")
      .replace(/[^a-z0-9]/gi, "_")
      .replace(/_+/g, "_");

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeTitle}.pdf"`
    );

    doc.pipe(res);

    // ==================================================
    // Page Constants
    // ==================================================

    const PAGE_WIDTH = 595.28;
    const PAGE_HEIGHT = 841.89;

    const LEFT = 45;
    const RIGHT = 45;
    const CONTENT_WIDTH =
      PAGE_WIDTH - LEFT - RIGHT;

    const BOTTOM_LIMIT = PAGE_HEIGHT - 55;

    // ==================================================
    // Template Colors
    // ==================================================

    const templateConfig = {
      Professional: {
        accent: "#1e293b",
        accentLight: "#f1f5f9",
        text: "#334155",
        muted: "#64748b",
        border: "#cbd5e1",
        headerType: "professional",
      },

      Modern: {
        accent: "#2563eb",
        accentLight: "#eff6ff",
        text: "#334155",
        muted: "#64748b",
        border: "#bfdbfe",
        headerType: "modern",
      },

      Minimal: {
        accent: "#475569",
        accentLight: "#f8fafc",
        text: "#334155",
        muted: "#64748b",
        border: "#cbd5e1",
        headerType: "minimal",
      },

      Creative: {
        accent: "#9333ea",
        accentLight: "#faf5ff",
        text: "#334155",
        muted: "#64748b",
        border: "#e9d5ff",
        headerType: "creative",
      },

      Corporate: {
        accent: "#1e293b",
        accentLight: "#f1f5f9",
        text: "#334155",
        muted: "#64748b",
        border: "#94a3b8",
        headerType: "corporate",
      },

      "ATS Friendly": {
        accent: "#000000",
        accentLight: "#ffffff",
        text: "#000000",
        muted: "#111827",
        border: "#000000",
        headerType: "ats",
      },
    };

    const config =
      templateConfig[selectedTemplate] ||
      templateConfig.Professional;

    // ==================================================
    // Helpers
    // ==================================================

    const ensureSpace = (requiredHeight = 60) => {
      if (doc.y + requiredHeight > BOTTOM_LIMIT) {
        doc.addPage();
      }
    };

    const drawHorizontalLine = (
      color = config.border,
      width = 1
    ) => {
      const y = doc.y;

      doc
        .save()
        .strokeColor(color)
        .lineWidth(width)
        .moveTo(LEFT, y)
        .lineTo(
          PAGE_WIDTH - RIGHT,
          y
        )
        .stroke()
        .restore();
    };

  const addSectionTitle = (
  title,
  options = {}
) => {
  ensureSpace(45);

  doc.x = LEFT;

  doc.moveDown(
        options.marginTop ?? 0.6
      );

      const sectionTitle =
        title.toUpperCase();

      if (
        selectedTemplate === "Corporate"
      ) {
        doc
          .fillColor("#ffffff")
          .rect(
            LEFT,
            doc.y,
            CONTENT_WIDTH,
            22
          )
          .fill(config.accent);

        doc
          .fillColor("#ffffff")
          .font("Helvetica-Bold")
          .fontSize(10)
          .text(
            sectionTitle,
            LEFT + 8,
            doc.y + 6,
            {
              width:
                CONTENT_WIDTH - 16,
            }
          );

        doc.moveDown(1.15);
        return;
      }

      if (
        selectedTemplate === "Modern"
      ) {
        doc
          .fillColor(config.accent)
          .rect(
            LEFT,
            doc.y,
            4,
            20
          )
          .fill();

        doc
          .fillColor(config.accent)
          .font("Helvetica-Bold")
          .fontSize(12)
          .text(
            sectionTitle,
            LEFT + 12,
            doc.y + 3
          );

        doc.moveDown(0.9);
        return;
      }

      if (
        selectedTemplate === "Creative"
      ) {
        doc
          .fillColor(config.accent)
          .font("Helvetica-Bold")
          .fontSize(12)
          .text(sectionTitle);

        doc.moveDown(0.2);

        doc
          .save()
          .strokeColor(config.border)
          .lineWidth(1)
          .moveTo(LEFT, doc.y)
          .lineTo(
            LEFT + 80,
            doc.y
          )
          .stroke()
          .restore();

        doc.moveDown(0.45);
        return;
      }

      if (
        selectedTemplate ===
        "ATS Friendly"
      ) {
        doc
          .fillColor("#000000")
          .font("Helvetica-Bold")
          .fontSize(11)
          .text(sectionTitle);

        doc.moveDown(0.15);
        drawHorizontalLine(
          "#000000",
          0.8
        );

        doc.moveDown(0.35);
        return;
      }

      if (
        selectedTemplate ===
        "Minimal"
      ) {
        doc
          .fillColor(config.accent)
          .font("Helvetica-Bold")
          .fontSize(10)
          .text(sectionTitle);

        doc.moveDown(0.2);

        drawHorizontalLine(
          config.border,
          0.7
        );

        doc.moveDown(0.35);
        return;
      }

      // Professional
      doc
        .fillColor(config.accent)
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(sectionTitle);

      doc.moveDown(0.2);

      drawHorizontalLine(
        config.border,
        0.7
      );

      doc.moveDown(0.4);
    };

    const addBullet = (text) => {
      if (!text) return;

      ensureSpace(30);

      const cleanText = String(text)
        .replace(/^[-•]\s*/, "")
        .trim();

      doc
        .fillColor(config.text)
        .font("Helvetica")
        .fontSize(9.5)
        .text(`• ${cleanText}`, {
          width: CONTENT_WIDTH - 12,
          indent: 8,
          lineGap: 2,
        });

      doc.moveDown(0.18);
    };

    const addBodyText = (
  text,
  size = 9.5
) => {
  if (!text) return;

  ensureSpace(35);

  doc.x = LEFT;

  doc
        .fillColor(config.text)
        .font("Helvetica")
        .fontSize(size)
        .text(String(text), {
          width: CONTENT_WIDTH,
          lineGap: 2.5,
        });
    };

    const addCard = (
  callback,
  minHeight = 70
) => {
  ensureSpace(minHeight);

  doc.x = LEFT;

  const startY = doc.y;
      callback();

      const endY = doc.y;

      if (
        selectedTemplate ===
        "Professional"
      ) {
        doc
          .save()
          .strokeColor(config.border)
          .lineWidth(0.6)
          .roundedRect(
            LEFT,
            startY - 5,
            CONTENT_WIDTH,
            Math.max(
              endY - startY + 10,
              minHeight
            ),
            5
          )
          .stroke()
          .restore();
      }

      doc.moveDown(0.25);
    };

    // ==================================================
    // Personal Information
    // ==================================================

    const personalInfo =
      resume.personalInfo || {};

    const fullName =
      personalInfo.fullName ||
      "Your Name";

    const title =
      resume.title ||
      "Professional Title";

    // ==================================================
    // Header
    // ==================================================

    if (
      config.headerType ===
      "modern"
    ) {
      doc
        .fillColor(config.accent)
        .roundedRect(
          LEFT,
          doc.y,
          CONTENT_WIDTH,
          92,
          10
        )
        .fill();

      const headerStart = doc.y;

      doc
        .fillColor("#ffffff")
        .font("Helvetica-Bold")
        .fontSize(24)
        .text(
          fullName,
          LEFT + 18,
          headerStart + 17,
          {
            width:
              CONTENT_WIDTH - 36,
          }
        );

      doc
        .fillColor("#dbeafe")
        .font("Helvetica")
        .fontSize(11)
        .text(
          title,
          LEFT + 18,
          headerStart + 49
        );

      const contact = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.address,
      ]
        .filter(Boolean)
        .join("  |  ");

      if (contact) {
        doc
          .fillColor("#eff6ff")
          .fontSize(8.5)
          .text(
            contact,
            LEFT + 18,
            headerStart + 68,
            {
              width:
                CONTENT_WIDTH - 36,
            }
          );
      }

      doc.y =
        headerStart + 104;
    } else if (
      config.headerType ===
      "creative"
    ) {
      doc
        .fillColor("#faf5ff")
        .roundedRect(
          LEFT,
          doc.y,
          CONTENT_WIDTH,
          100,
          10
        )
        .fill();

      const headerStart = doc.y;

      doc
        .fillColor(config.accent)
        .font("Helvetica-Bold")
        .fontSize(24)
        .text(
          fullName,
          LEFT + 18,
          headerStart + 17,
          {
            width:
              CONTENT_WIDTH - 36,
          }
        );

      doc
        .fillColor("#9333ea")
        .font("Helvetica")
        .fontSize(11)
        .text(
          title,
          LEFT + 18,
          headerStart + 50
        );

      const contact = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.address,
      ]
        .filter(Boolean)
        .join("  |  ");

      if (contact) {
        doc
          .fillColor("#7e22ce")
          .fontSize(8.5)
          .text(
            contact,
            LEFT + 18,
            headerStart + 70,
            {
              width:
                CONTENT_WIDTH - 36,
            }
          );
      }

      doc.y =
        headerStart + 112;
    } else if (
      config.headerType ===
      "corporate"
    ) {
      doc
        .fillColor("#0f172a")
        .font("Helvetica-Bold")
        .fontSize(23)
        .text(fullName);

      doc.moveDown(0.2);

      doc
        .fillColor("#475569")
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(title);

      doc.moveDown(0.45);

      const contact = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.address,
        personalInfo.linkedin,
        personalInfo.github,
      ]
        .filter(Boolean)
        .join("  |  ");

      if (contact) {
        doc
          .fillColor("#475569")
          .font("Helvetica")
          .fontSize(8.5)
          .text(contact, {
            width: CONTENT_WIDTH,
          });
      }

      doc.moveDown(0.65);

      doc
        .save()
        .strokeColor("#334155")
        .lineWidth(3)
        .moveTo(LEFT, doc.y)
        .lineTo(
          PAGE_WIDTH - RIGHT,
          doc.y
        )
        .stroke()
        .restore();

      doc.moveDown(0.5);
    } else {
      // Professional / Minimal / ATS
      doc
        .fillColor(
          config.headerType === "ats"
            ? "#000000"
            : "#0f172a"
        )
        .font(
          "Helvetica-Bold"
        )
        .fontSize(
          config.headerType ===
            "minimal"
            ? 24
            : 25
        )
        .text(fullName, {
          align: "center",
        });

      doc.moveDown(0.2);

      doc
        .fillColor(config.text)
        .font("Helvetica")
        .fontSize(11)
        .text(title, {
          align: "center",
        });

      doc.moveDown(0.45);

      const contact = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.address,
      ]
        .filter(Boolean)
        .join("  |  ");

      if (contact) {
        doc
          .fillColor(config.muted)
          .fontSize(8.5)
          .text(contact, {
            align: "center",
            width: CONTENT_WIDTH,
          });
      }

      const links = [
        personalInfo.linkedin,
        personalInfo.github,
        personalInfo.portfolio,
      ]
        .filter(Boolean)
        .join("  |  ");

      if (links) {
        doc
          .moveDown(0.2)
          .fillColor(config.muted)
          .fontSize(8.5)
          .text(links, {
            align: "center",
            width: CONTENT_WIDTH,
          });
      }

      doc.moveDown(0.7);

      drawHorizontalLine(
        config.border,
        config.headerType ===
          "ats"
          ? 1
          : 0.8
      );

      doc.moveDown(0.2);
    }

    // ==================================================
    // Professional Summary
    // ==================================================

    if (personalInfo.summary) {
      addSectionTitle(
        "Professional Summary"
      );

      addBodyText(
        personalInfo.summary
      );
    }

    // ==================================================
    // Skills
    // ==================================================

    if (
      Array.isArray(
        resume.skills
      ) &&
      resume.skills.length > 0
    ) {
      addSectionTitle("Skills");

      const skillList = [];

      resume.skills.forEach(
        (skill) => {
          if (!skill) return;

          if (
            typeof skill ===
            "string"
          ) {
            skillList.push(skill);
            return;
          }

          if (
            Array.isArray(
              skill.items
            )
          ) {
            skill.items.forEach(
              (item) => {
                if (
                  item &&
                  typeof item ===
                    "string"
                ) {
                  skillList.push(
                    item
                  );
                }
              }
            );
          }

          if (
            skill.name
          ) {
            skillList.push(
              skill.name
            );
          }

          if (
            skill.skill
          ) {
            skillList.push(
              skill.skill
            );
          }
        }
      );

      const uniqueSkills =
        [
          ...new Set(
            skillList.filter(
              Boolean
            )
          ),
        ];

      if (
        selectedTemplate ===
        "ATS Friendly"
      ) {
        addBodyText(
          uniqueSkills.join(
            ", "
          )
        );
      } else {
        let x = LEFT;
        let y = doc.y;

        uniqueSkills.forEach(
          (skill) => {
            const width =
              Math.min(
                doc.widthOfString(
                  skill,
                  {
                    font:
                      "Helvetica",
                    size: 9,
                  }
                ) + 20,
                130
              );

            if (
              x + width >
              PAGE_WIDTH -
                RIGHT
            ) {
              x = LEFT;
              y += 25;
            }

            if (
              y + 20 >
              BOTTOM_LIMIT
            ) {
              doc.addPage();
              x = LEFT;
              y = doc.y;
            }

            doc
              .save()
              .fillColor(
                config.accentLight
              )
              .roundedRect(
                x,
                y,
                width,
                19,
                selectedTemplate ===
                  "Minimal"
                  ? 2
                  : 8
              )
              .fill();

            doc
              .fillColor(
                config.accent
              )
              .font("Helvetica")
              .fontSize(9)
              .text(
                skill,
                x + 10,
                y + 5,
                {
                  width:
                    width - 20,
                  lineBreak: false,
                }
              );

            doc.restore();

            x += width + 7;
          }
        );

      doc.y = y + 28;
      doc.x = LEFT;
      }
    }

    // ==================================================
    // Education
    // ==================================================

    if (
      Array.isArray(
        resume.education
      ) &&
      resume.education.length >
        0
    ) {
      addSectionTitle(
        "Education"
      );

      resume.education.forEach(
        (edu) => {
          if (!edu) return;

          addCard(() => {
            if (edu.degree) {
              doc
                .fillColor(
                  config.accent
                )
                .font(
                  "Helvetica-Bold"
                )
                .fontSize(11)
                .text(
                  edu.degree
                );
            }

            if (
              edu.institute
            ) {
              doc
                .moveDown(0.15)
                .fillColor(
                  config.text
                )
                .font(
                  "Helvetica"
                )
                .fontSize(9.5)
                .text(
                  edu.institute
                );
            }

            const years = [
              edu.startYear,
              edu.endYear,
            ]
              .filter(Boolean)
              .join(" - ");

            if (years) {
              doc
                .moveDown(0.15)
                .fillColor(
                  config.muted
                )
                .fontSize(8.5)
                .text(years);
            }

            if (edu.location) {
              doc
                .moveDown(0.15)
                .fillColor(
                  config.muted
                )
                .fontSize(8.5)
                .text(
                  edu.location
                );
            }

            if (edu.cgpa) {
              doc
                .moveDown(0.15)
                .fillColor(
                  config.text
                )
                .font(
                  "Helvetica-Bold"
                )
                .fontSize(8.5)
                .text(
                  `CGPA / Percentage: ${edu.cgpa}`
                );
            }
          });
        }
      );
    }

    // ==================================================
    // Experience
    // ==================================================

    if (
      Array.isArray(
        resume.experience
      ) &&
      resume.experience.length >
        0
    ) {
      addSectionTitle(
        "Work Experience"
      );

      resume.experience.forEach(
        (exp) => {
          if (!exp) return;

          ensureSpace(100);

          const startY = doc.y;

          if (
            selectedTemplate !==
            "ATS Friendly"
          ) {
            doc
              .save()
              .strokeColor(
                config.accent
              )
              .lineWidth(
                selectedTemplate ===
                  "Minimal"
                  ? 1
                  : 2
              )
              .moveTo(
                LEFT,
                startY
              )
              .lineTo(
                LEFT,
                startY + 55
              )
              .stroke()
              .restore();
          }

          const textLeft =
            selectedTemplate ===
              "ATS Friendly"
              ? LEFT
              : LEFT + 12;

          if (
            exp.position
          ) {
            doc
              .fillColor(
                config.text
              )
              .font(
                "Helvetica-Bold"
              )
              .fontSize(11)
              .text(
                exp.position,
                textLeft,
                startY,
                {
                  width:
                    CONTENT_WIDTH -
                    (textLeft -
                      LEFT),
                }
              );
          }

          if (
            exp.company
          ) {
            doc
              .moveDown(0.15)
              .fillColor(
                config.text
              )
              .font(
                "Helvetica-Bold"
              )
              .fontSize(9.5)
              .text(
                exp.company,
                textLeft
              );
          }

          const dates = [
            exp.startDate,
            exp.endDate,
          ]
            .filter(Boolean)
            .join(" - ");

          if (dates) {
            doc
              .moveDown(0.15)
              .fillColor(
                config.muted
              )
              .font(
                "Helvetica"
              )
              .fontSize(8.5)
              .text(
                dates,
                textLeft
              );
          }

          if (exp.location) {
            doc
              .moveDown(0.15)
              .fillColor(
                config.muted
              )
              .fontSize(8.5)
              .text(
                exp.location,
                textLeft
              );
          }

          if (
            exp.description
          ) {
            doc.moveDown(0.25);

            const lines =
              String(
                exp.description
              )
                .split(/\n+/)
                .map((line) =>
                  line.trim()
                )
                .filter(Boolean);

            lines.forEach(
              (line) => {
                const clean =
                  line.replace(
                    /^[-•]\s*/,
                    ""
                  );

                doc
                  .fillColor(
                    config.text
                  )
                  .font(
                    "Helvetica"
                  )
                  .fontSize(9)
                  .text(
                    `• ${clean}`,
                    textLeft,
                    doc.y,
                    {
                      width:
                        CONTENT_WIDTH -
                        (textLeft -
                          LEFT),
                      lineGap: 2,
                    }
                  );

                doc.moveDown(
                  0.15
                );
              }
            );
          }

          doc.moveDown(0.45);
        }
      );
    }

    // ==================================================
    // Projects
    // ==================================================

    if (
      Array.isArray(
        resume.projects
      ) &&
      resume.projects.length >
        0
    ) {
      addSectionTitle(
        "Projects"
      );

      resume.projects.forEach(
        (project) => {
          if (!project) return;

          addCard(() => {
            if (
              project.title
            ) {
              doc
                .fillColor(
                  config.text
                )
                .font(
                  "Helvetica-Bold"
                )
                .fontSize(11)
                .text(
                  project.title
                );
            }

            if (
              project.technologies
            ) {
              doc
                .moveDown(0.15)
                .fillColor(
                  config.accent
                )
                .font(
                  "Helvetica-Bold"
                )
                .fontSize(8.5)
                .text(
                  `Technologies: ${project.technologies}`
                );
            }

            if (
              project.description
            ) {
              doc
                .moveDown(0.2)
                .fillColor(
                  config.text
                )
                .font(
                  "Helvetica"
                )
                .fontSize(9.2)
                .text(
                  project.description,
                  {
                    width:
                      CONTENT_WIDTH,
                    lineGap: 2,
                  }
                );
            }

            if (
              project.github
            ) {
              doc
                .moveDown(0.2)
                .fillColor(
                  config.muted
                )
                .fontSize(8.5)
                .text(
                  `GitHub: ${project.github}`
                );
            }

            const liveLink =
              project.liveLink ||
              project.liveDemo ||
              "";

            if (liveLink) {
              doc
                .moveDown(0.15)
                .fillColor(
                  config.muted
                )
                .fontSize(8.5)
                .text(
                  `Live Demo: ${liveLink}`
                );
            }
          });
        }
      );
    }

    // ==================================================
    // Certifications
    // ==================================================

    if (
      Array.isArray(
        resume.certifications
      ) &&
      resume.certifications.length >
        0
    ) {
      addSectionTitle(
        "Certifications"
      );

      resume.certifications.forEach(
        (cert) => {
          if (!cert) return;

          const name =
            cert.name ||
            cert.title ||
            "";

          const issuer =
            cert.issuedBy ||
            cert.issuer ||
            "";

          const year =
            cert.issueDate ||
            cert.year ||
            "";

          const credentialId =
            cert.credentialId ||
            "";

          if (
            !name &&
            !issuer &&
            !year &&
            !credentialId
          ) {
            return;
          }

          ensureSpace(50);

          if (name) {
            doc
              .fillColor(
                config.text
              )
              .font(
                "Helvetica-Bold"
              )
              .fontSize(9.8)
              .text(name);
          }

          const details = [
            issuer,
            year,
          ]
            .filter(Boolean)
            .join(" - ");

          if (details) {
            doc
              .moveDown(0.15)
              .fillColor(
                config.muted
              )
              .font(
                "Helvetica"
              )
              .fontSize(8.5)
              .text(details);
          }

          if (credentialId) {
            doc
              .moveDown(0.15)
              .fillColor(
                config.muted
              )
              .fontSize(8)
              .text(
                `Credential ID: ${credentialId}`
              );
          }

          doc.moveDown(0.4);
        }
      );
    }

    // ==================================================
    // Languages
    // ==================================================

    if (
      Array.isArray(
        resume.languages
      ) &&
      resume.languages.length >
        0
    ) {
      addSectionTitle(
        "Languages"
      );

      const languageList =
        resume.languages
          .map((language) => {
            if (
              typeof language ===
              "string"
            ) {
              return language;
            }

            return (
              language?.name ||
              language?.language ||
              ""
            );
          })
          .filter(Boolean);

      if (
        languageList.length
      ) {
        addBodyText(
          languageList.join(
            ", "
          )
        );
      }
    }

    // ==================================================
    // Footer
    // IMPORTANT:
    // Do NOT use doc.text() near y=800 because PDFKit
    // can create extra blank pages.
    // ==================================================

    const pageRange =
      doc.bufferedPageRange();

    for (
      let i = 0;
      i < pageRange.count;
      i++
    ) {
      doc.switchToPage(i);

      const footerY =
        PAGE_HEIGHT - 30;

      // Temporarily disable the bottom margin so PDFKit
      // does not create a new page while drawing the footer.
      const originalBottomMargin =
        doc.page.margins.bottom;

      doc.page.margins.bottom = 0;

      doc
        .save()
        .fillColor("#94a3b8")
        .font("Helvetica")
        .fontSize(7)
        .text(
          `Page ${i + 1} of ${pageRange.count}`,
          LEFT,
          footerY,
          {
            width: CONTENT_WIDTH,
            align: "center",
            lineBreak: false,
          }
        )
        .restore();

      doc.page.margins.bottom =
        originalBottomMargin;
    }

    // ==================================================
    // Finish PDF
    // ==================================================

    doc.end();
  } catch (error) {
    console.error(
      "PDF DOWNLOAD ERROR:",
      error
    );

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to generate PDF.",
      });
    }
  }
};