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
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://careerpilot-lilac-five.vercel.app"
];

app.use(
  cors({
    origin: "https://careerpilot-lilac-five.vercel.app", credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));


app.use(express.json());

app.use("/api/job-search", jobSearchRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/saved-jobs", savedJobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/cover-letter", coverLetterRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});