import {
  Briefcase,
  CheckCircle,
  Clock,
  XCircle,
  Trash2,
  Pencil,
} from "lucide-react";
import DashboardChart from "../../components/charts/DashboardChart";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  getJobs,
  createJob,
  deleteJob,
  uploadResume,
  updateJob,
} from "../../api/authApi";

const DashboardHome = () => {
  const [jobs, setJobs] = useState([]);

  const [company, setCompany] =
    useState("");

  const [role, setRole] =
    useState("");

  const [status, setStatus] =
    useState("Applied");

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("All");

  const [resume, setResume] =
    useState(null);
  
    const [editingId, setEditingId] =
  useState(null);

  const [showDeleteModal,
setShowDeleteModal] =
useState(false);

const [selectedJobId,
setSelectedJobId] =
useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await getJobs(token);

      setJobs(res.data);

    } catch (error) {
      console.log(error);
    }
  };

const handleAddJob = async () => {
  try {

    const token =
      localStorage.getItem("token");

    if (editingId) {

      await updateJob(
        editingId,
        {
          company,
          role,
          status,
        },
        token
      );

      toast.success(
        "Job Updated Successfully"
      );

      setEditingId(null);

    } else {

      await createJob(
        {
          company,
          role,
          status,
        },
        token
      );

      toast.success(
        "Job Added Successfully"
      );
    }

    setCompany("");
    setRole("");
    setStatus("Applied");

    fetchJobs();

  } catch (error) {

    console.log(error);

    toast.error(
      "Operation Failed"
    );
  }
};

const handleEditJob = (
  job
) => {

  setCompany(
    job.company
  );

  setRole(
    job.role
  );

  setStatus(
    job.status
  );

  setEditingId(
    job._id
  );
};
  const handleDeleteJob = async (
    id
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await deleteJob(
        id,
        token
      );

      toast.success(
        "Job Deleted Successfully"
      );

      fetchJobs();

    } catch (error) {
      console.log(error);

      toast.error(
        "Failed To Delete Job"
      );
    }
  };

  const handleResumeUpload =
    async () => {
      try {
        if (!resume) {
          return toast.error(
            "Please select a PDF"
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

        await uploadResume(
          formData,
          token
        );

        toast.success(
          "Resume Uploaded Successfully"
        );

        setResume(null);

      } catch (error) {
        console.log(error);

        toast.error(
          "Resume Upload Failed"
        );
      }
    };

  const filteredJobs = jobs.filter(
    (job) => {
      const matchesSearch =
        job.company
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        filterStatus === "All"
          ? true
          : job.status ===
            filterStatus;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  const stats = [
    {
      title: "Total Applications",
      value: jobs.length,
      icon: (
        <Briefcase size={22} />
      ),
      color: "bg-blue-600",
    },

    {
      title: "Interviews",
      value: jobs.filter(
        (job) =>
          job.status ===
          "Interview"
      ).length,
      icon: <Clock size={22} />,
      color: "bg-yellow-500",
    },

    {
      title: "Selected",
      value: jobs.filter(
        (job) =>
          job.status ===
          "Selected"
      ).length,
      icon: (
        <CheckCircle size={22} />
      ),
      color: "bg-green-600",
    },

    {
      title: "Rejected",
      value: jobs.filter(
        (job) =>
          job.status ===
          "Rejected"
      ).length,
      icon: (
        <XCircle size={22} />
      ),
      color: "bg-red-600",
    },
  ];

  return (
    <div className="space-y-8 text-black dark:text-white">

      {/* Heading */}
      <div>

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Welcome back 👋
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex items-center justify-between"
          >
            <div>

              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {item.value}
              </h2>

            </div>

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
            >
              {item.icon}
            </div>

          </div>
        ))}

      </div>

      {/* Add Job */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Add Job
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) =>
              setCompany(
                e.target.value
              )
            }
            className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none"
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
            className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none"
          >
            <option>
              Applied
            </option>

            <option>
              Interview
            </option>

            <option>
              Selected
            </option>

            <option>
              Rejected
            </option>

          </select>

        </div>

        <button
          onClick={handleAddJob}
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white"
        >
          {editingId
  ? "Update Job"
  : "Add Job"}
        </button>

      </div>

      {/* Resume Upload */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Upload Resume
        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setResume(
                e.target.files[0]
              )
            }
            className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3"
          />

          <button
            onClick={
              handleResumeUpload
            }
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white"
          >
            Upload Resume
          </button>

        </div>

      </div>

      {/* Search */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Search by company..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none"
          />

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value
              )
            }
            className="bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none"
          >
            <option value="All">
              All Status
            </option>

            <option value="Applied">
              Applied
            </option>

            <option value="Interview">
              Interview
            </option>

            <option value="Selected">
              Selected
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

        </div>

      </div>

      {/* Jobs Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Recent Applications
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="text-left text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">

                <th className="pb-4">
                  Company
                </th>

                <th className="pb-4">
                  Role
                </th>

                <th className="pb-4">
                  Status
                </th>

                <th className="pb-4">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredJobs.map(
                (job) => (
                  <tr
                    key={job._id}
                    className="border-b border-zinc-200 dark:border-zinc-800"
                  >
                    <td className="py-4">
                      {job.company}
                    </td>

                    <td>
                      {job.role}
                    </td>

                    <td>
                      <span className="bg-blue-500/20 text-blue-500 px-3 py-1 rounded-full text-sm">
                        {job.status}
                      </span>
                    </td>

                   <td className="flex gap-3 py-4">

  <button
  onClick={() =>
    handleEditJob(job)
  }
  className="
    text-yellow-500
    hover:text-yellow-400
  "
>
  <Pencil size={18} />
</button>

 <button
  onClick={() => {

    setSelectedJobId(
      job._id
    );

    setShowDeleteModal(
      true
    );

  }}
  className="
    text-red-500
    hover:text-red-400
  "
>
  <Trash2 size={18} />
</button>
</td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>
      {/* Delete Modal */}

{showDeleteModal && (

  <div className="
    fixed inset-0
    bg-black/50
    flex items-center
    justify-center
    z-50
  ">

    <div className="
      bg-white
      dark:bg-zinc-900
      rounded-2xl
      p-6
      w-[90%]
      max-w-md
      border
      border-zinc-200
      dark:border-zinc-800
    ">

      <h2 className="
        text-xl
        font-semibold
        mb-3
      ">
        Delete Job
      </h2>

      <p className="
        text-zinc-600
        dark:text-zinc-400
        mb-6
      ">
        Are you sure you want to delete this job application?
      </p>

      <div className="
        flex justify-end
        gap-4
      ">

        <button
          onClick={() =>
            setShowDeleteModal(
              false
            )
          }
          className="
            px-4 py-2
            rounded-xl
            border
            border-zinc-300
            dark:border-zinc-700
          "
        >
          Cancel
        </button>

        <button
          onClick={() => {

            handleDeleteJob(
              selectedJobId
            );

            setShowDeleteModal(
              false
            );

          }}
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-4 py-2
            rounded-xl
          "
        >
          Delete
        </button>

      </div>

    </div>

  </div>
)}
<DashboardChart jobs={jobs} />
</div>
  );
};

export default DashboardHome;