
const express =
  require("express");

const router =
  express.Router();

const {
  analyzeResume,
} = require(
  "../controllers/resumeController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const upload =
  require(
    "../middleware/uploadMiddleware"
  );

router.post(
  "/analyze",
  protect,
  upload.single("resume"),
  analyzeResume
);

module.exports =
  router;

