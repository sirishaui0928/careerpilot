const SavedJob = require("../models/savedJob");

const saveJob =
    async (req, res) => {

        try {

            console.log(req.body);

            console.log(req.user);

            const savedJob =
                await SavedJob.create({

                    user:
                        req.user._id,

                    jobId:
                        req.body.jobId,

                    title:
                        req.body.title,

                    company:
                        req.body.company,

                    location:
                        req.body.location,

                    url:
                        req.body.url,
                });
            console.log(savedJob);
            res.status(201).json(
                savedJob
            );

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message:
                    "Failed to save job",
            });
        }
    };

const getSavedJobs =
    async (req, res) => {

        try {

            const jobs =
                await SavedJob.find({

                    user:
                        req.user._id,
                });

            res.json(jobs);

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message:
                    "Failed to fetch saved jobs",
            });
        }
    };

const deleteSavedJob =
    async (req, res) => {

        try {

            await SavedJob.findByIdAndDelete(
                req.params.id
            );

            res.json({
                message:
                    "Deleted",
            });

        } catch (error) {

            res.status(500).json({
                message:
                    "Delete failed",
            });
        }
    };

module.exports = {
    saveJob,
    getSavedJobs,
    deleteSavedJob,
};

