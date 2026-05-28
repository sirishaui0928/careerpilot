
const express =
    require("express");

const router =
    express.Router();

const {
    saveJob,
    getSavedJobs,
    deleteSavedJob,
} = require(
    "../controllers/savedJobController"
);

const {
    protect,
} = require(
    "../middleware/authMiddleware"
);

router.post(
    "/",
    protect,
    saveJob
);

router.get(
    "/",
    protect,
    getSavedJobs
);

router.delete(
    "/:id",
    protect,
    deleteSavedJob
);

module.exports =
    router;

