
import {
  useEffect,
  useState,
} from "react";

import {
  searchLiveJobs,
} from "../../api/authApi";

import toast from "react-hot-toast";
import { saveJob, } from "../../api/authApi";

const Jobs = () => {

  const [jobs,
    setJobs] =
    useState([]);

  const [keyword,
    setKeyword] =
    useState("React Developer");

  const [loading,
    setLoading] =
    useState(false);

  const fetchJobs =
    async () => {

      try {

        setLoading(true);

        const res =
          await searchLiveJobs(
            keyword
          );

        setJobs(
          res.data
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to fetch jobs"
        );

      } finally {

        setLoading(false);
      }
    };

  
const handleSaveJob =
  async (job) => {
 alert("SAVE WORKING");
    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await saveJob(

        {
          jobId:
            job.job_id,

          title:
            job.job_title,

          company:
            job.employer_name,

          location:
            job.job_city,

          url:
            job.job_apply_link,
        },

        token
      );

      toast.success(
        "Job Saved"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to save job"
      );
    }
  };



  useEffect(() => {

    fetchJobs();

  }, []);

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-black dark:text-white">

          Live Jobs

        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 mt-2">

          Search real-time jobs

        </p>

      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">

        <div className="flex flex-col md:flex-row gap-4">

          <input

            type="text"

            value={keyword}

            onChange={(e) =>
              setKeyword(
                e.target.value
              )
            }

            placeholder="Search jobs..."

            className="flex-1 bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none"
          />

          <button

            onClick={fetchJobs}

            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Search
          </button>

        </div>

      </div>

      {loading ? (

        <div className="text-center text-zinc-500">

          Loading jobs...

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {jobs.map((job, index) => (

            <div

              key={index}

              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4"
            >

              <div className="flex items-center gap-4">

                <img src={ job.employer_logo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" } 
                alt="logo" className="w-14 h-14 rounded-xl object-cover bg-white p-1" />

                <div>

                  <h2 className="font-bold text-lg text-black dark:text-white">

                    {job.job_title}

                  </h2>

                  <p className="text-zinc-500">

                    {
                      job.employer_name
                    }

                  </p>

                </div>

              </div>

              <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">

                <p>

                  📍 {
                    job.job_city
                  }

                </p>

                <p>

                  🌎 {
                    job.job_country
                  }

                </p>

                <p>

                  💼 {
                    job.job_employment_type
                  }

                </p>

              </div>

            
<div className="flex gap-3 mt-4">

  <a
    href={job.job_apply_link}
    target="_blank"
    rel="noreferrer"
    className="
      flex-1
      bg-blue-600
      hover:bg-blue-700
      text-white
      py-3
      rounded-xl
      text-center
      font-medium
      transition
    "
  >
    Apply Now
  </a>

  <button
    onClick={() => { 
      console.log("SAVE BUTTON CLICKED");
       handleSaveJob(job); }} 
       className=" flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium " > 
       Save
  </button>

</div>


            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Jobs;

