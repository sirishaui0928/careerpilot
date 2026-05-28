import {
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  analyzeResume,
} from "../../api/authApi";

const ResumeAnalyzer = () => {
  const [resume, setResume] =
    useState(null);

  const [result, setResult] =
    useState(null);

  const handleAnalyze =
    async () => {
      try {
        if (!resume) {
          return toast.error(
            "Upload Resume First"
          );
        }

        const token =
          localStorage.getItem(
            "token"
          );

        const formData =
          new FormData();

        formData.append(
          "resume",
          resume
        );

        const res =
          await analyzeResume(
            formData,
            token
          );

        setResult(res.data);

        toast.success(
          "Resume Analyzed"
        );

      } catch (error) {
        console.log(error);

        toast.error(
          "Analysis Failed"
        );
      }
    };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          AI Resume Analyzer
        </h1>

        <p className="text-zinc-400 mt-2">
          Analyze your resume ATS
          score
        </p>
      </div>

      <div className="
    bg-white
    dark:bg-zinc-900

    border
    border-zinc-200
    dark:border-zinc-800

    shadow-sm
    dark:shadow-none

    rounded-3xl
    p-8
  ">

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setResume(
                e.target.files[0]
              )
            }
            className="bg-zinc-100 dark:bg-black border border-zinc-200 dark:border-blue-700  p-2"
          />

          <button
            onClick={
              handleAnalyze
            }
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl dark:text-white"
          >
            Analyze Resume
          </button>

        </div>

      </div>

      {result && (
  <div
    className="
      bg-white
      dark:bg-zinc-900

      border
      border-zinc-200
      dark:border-zinc-800

      shadow-sm
      dark:shadow-none

      rounded-2xl
      p-8
      space-y-6
    "
  >

          <div>
           <h2
  className="
    text-2xl
    font-bold
    text-zinc-900
    dark:text-white
  "
>
              ATS Score:
              <span className="text-blue-500 ml-2">
              
{result.score}%

              </span>
            </h2>
          </div>

          <div>
            <h3
  className="
    text-lg
    font-semibold
    mb-3
    text-zinc-900
    dark:text-white
  "
>
              Skills Found
            </h3>

            <div className="flex flex-wrap gap-3">

              {result.foundSkills.map(
                (
                  skill,
                  index
                ) => (
                  <span
                    key={index}
                    className="
  bg-blue-100
  dark:bg-blue-900/30

  text-blue-700
  dark:text-blue-300

  px-4 py-2
  rounded-full
"
                  >
                    {skill}
                  </span>
                )
              )}

            </div>
          </div>

          <div>
            <h3
  className="
    text-lg
    font-semibold
    mb-3
    text-zinc-900
    dark:text-white
  "
>
              Suggestions
            </h3>

            <ul
  className="
    space-y-2
    text-zinc-700
    dark:text-zinc-300
  "
>

              {result.feedback.map(
                (
                  item,
                  index
                ) => (
                  <li
                    key={index}
                  >
                    • {item}
                  </li>
                )
              )}

            </ul>
          </div>

        </div>
      )}

    </div>
  );
};

export default ResumeAnalyzer;