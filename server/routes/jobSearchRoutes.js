
const express =
    require("express");

const router =
    express.Router();

const {
    searchJobs,
} = require(
    "../controllers/jobSearchController"
);

router.get(
    "/search",
    searchJobs
);

module.exports =
    router;

