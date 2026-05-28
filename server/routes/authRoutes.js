const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  uploadResume,
  getProfile,
} = require("../controllers/authController");

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const upload = require("../middleware/uploadMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get(
  "/profile",
  protect,
  getProfile
);

router.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  uploadResume
);

module.exports = router;