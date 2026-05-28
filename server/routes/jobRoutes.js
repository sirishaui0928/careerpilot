
const express =
    require("express");

const router =
    express.Router();

const {
    getJobs,
    createJob,
    updateJob,
    deleteJob,
} = require(
    "../controllers/jobController"
);

// Get Jobs
router.get(
    "/",
    getJobs
);

// Create Job
router.post(
    "/create",
    createJob
);

// Update Job
router.put(
    "/:id",
    updateJob
);

// Delete Job
router.delete(
    "/:id",
    deleteJob
);

module.exports =
    router;

