
import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getSavedJobs,
  deleteSavedJob,
} from "../../api/authApi";

const SavedJobs = () => {

  const [jobs, setJobs] =
    useState([]);

  const fetchSavedJobs =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await getSavedJobs(
            token
          );

        setJobs(
          res.data
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to fetch saved jobs"
        );
      }
    };

  const handleDelete =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await deleteSavedJob(
          id,
          token
        );

        toast.success(
          "Job Removed"
        );

        fetchSavedJobs();

      } catch (error) {

        console.log(error);

        toast.error(
          "Delete Failed"
        );
      }
    };

useEffect(() => {

  const fetchJobs =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await getSavedJobs(
            token
          );

        console.log(res.data);

        setJobs(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  fetchJobs();

}, []);



  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-black dark:text-white">
          Saved Jobs
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Your bookmarked jobs
        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {jobs.map((job) => (

          <div
            key={job._id}
            className="
              bg-white
              dark:bg-zinc-900
              border
              border-zinc-200
              dark:border-zinc-800
              rounded-2xl
              p-6
              space-y-4
            "
          >

            <div>

              <h2 className="text-xl font-bold text-black dark:text-white">
                {job.title}
              </h2>

              <p className="text-zinc-500">
                {job.company}
              </p>

            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              📍 {job.location || "Remote"}
            </p>

            <div className="flex gap-3">

              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="
                  flex-1
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  text-center
                  py-3
                  rounded-xl
                "
              >
                Apply
              </a>

              <button
                onClick={() =>
                  handleDelete(
                    job._id
                  )
                }
                className="
                  flex-1
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  py-3
                  rounded-xl
                "
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default SavedJobs;

