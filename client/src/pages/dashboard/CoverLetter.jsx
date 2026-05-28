
import {
  useState,
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

const CoverLetter = () => {

  const [company,
    setCompany] =
    useState("");

  const [role,
    setRole] =
    useState("");

  const [skills,
    setSkills] =
    useState("");

  const [coverLetter,
    setCoverLetter] =
    useState("");

  const handleGenerate =
    async () => {

      try {

        const res =
          await axios.post(

            "http://localhost:5000/api/cover-letter/generate",

            {
              company,
              role,
              skills,
            }
          );

        setCoverLetter(
          res.data.coverLetter
        );

        toast.success(
          "Cover Letter Generated"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Generation Failed"
        );
      }
    };

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-black dark:text-white">

          AI Cover Letter

        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 mt-2">

          Generate professional cover letters

        </p>

      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 space-y-4">

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) =>
            setCompany(
              e.target.value
            )
          }
          className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none"
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) =>
            setRole(
              e.target.value
            )
          }
          className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none"
        />

        <textarea
          placeholder="Skills"
          value={skills}
          onChange={(e) =>
            setSkills(
              e.target.value
            )
          }
          className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-3 outline-none h-32"
        />

        <button
          onClick={handleGenerate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Generate Cover Letter
        </button>

      </div>

      {coverLetter && (

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">

            Generated Cover Letter

          </h2>

          <pre className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">

            {coverLetter}

          </pre>

        </div>
      )}

    </div>
  );
};

export default CoverLetter;

