const Job = require("../models/Job");

// Get Jobs
const getJobs =
  async (req, res) => {

    try {

      const jobs =
        await Job.find();

      res.json(jobs);

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch jobs",
      });
    }
  };

// Create Job
const createJob =
  async (req, res) => {

    try {

      const job =
        await Job.create(
          req.body
        );

      res.status(201).json(
        job
      );

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to create job",
      });
    }
  };

// Update Job
const updateJob =
  async (req, res) => {

    try {

      const updatedJob =
        await Job.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }
        );

      res.json(
        updatedJob
      );

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to update job",
      });
    }
  };

// Delete Job
const deleteJob =
  async (req, res) => {

    try {

      await Job.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Job deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to delete job",
      });
    }
  };

module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
};

