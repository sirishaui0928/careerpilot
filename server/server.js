const express = require("express");

const dotenv = require("dotenv");




const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");

const jobRoutes = require("./routes/jobRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const jobSearchRoutes = require("./routes/jobSearchRoutes");
const coverLetterRoutes = require("./routes/coverLetterRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin:
      ["http://localhost:5173", "https://careerpilot-lilac-five.vercel.app"],

    methods: ["GET", "POST", "PUT", "DELETE"], credentials: true
  }));

app.use(express.json());

app.use("/api/job-search", jobSearchRoutes);
app.use("/api/resume", resumeRoutes);

app.use("/api/saved-jobs", savedJobRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

app.use(
  "/uploads",
  express.static("uploads")
);
app.use("/api/cover-letter", coverLetterRoutes);

app.use("/api/job-search", jobSearchRoutes);


const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});






// app.use("/api/auth", authRoutes);

// app.use("/api/jobs", jobRoutes);

// app.use("/api/resume", resumeRoutes);


