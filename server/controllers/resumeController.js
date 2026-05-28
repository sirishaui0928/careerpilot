const fs = require("fs");

const pdfParse = require("pdf-parse");

const analyzeResume = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No resume uploaded",
      });
    }

    const dataBuffer = fs.readFileSync(
      req.file.path
    );

    const pdfData =
      await pdfParse(dataBuffer);

    const text =
      pdfData.text.toLowerCase();

    let score = 0;

    const skills = [
      "react",
      "node",
      "mongodb",
      "javascript",
      "express",
      "html",
      "css",
    ];

    const foundSkills = [];

    skills.forEach((skill) => {
      if (text.includes(skill)) {
        score += 10;

        foundSkills.push(skill);
      }
    });

    let feedback = [];

    if (score < 30) {
      feedback.push(
        "Add more technical skills."
      );
    }

    if (
      !text.includes("project")
    ) {
      feedback.push(
        "Add project experience."
      );
    }

    if (
      !text.includes("experience")
    ) {
      feedback.push(
        "Include work experience."
      );
    }

    res.json({
      score,
      foundSkills,
      feedback,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  analyzeResume,
};