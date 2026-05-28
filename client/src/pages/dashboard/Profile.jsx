import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { getProfile } from "../../api/authApi";

const Profile = () => {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await getProfile(
        token
      );

      setUser(res.data);

    } catch (error) {
      console.log(error);

      toast.error(
        "Failed To Load Profile"
      );
    }
  };

  if (!user) {
    return (
      <p className="text-white">
        Loading...
      </p>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your account
        </p>
      </div>

     <div className="
bg-white
dark:bg-zinc-900
border
border-zinc-200
dark:border-zinc-800
rounded-2xl
p-8
max-w-2xl
">

        <div className="flex items-center gap-4 mb-8">

          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
            {user.name[0]}
          </div>

          <div>
            <h2 className="text-2xl font-semibold dark:text-white">
              {user.name}
            </h2>

            <p className="text-gray-700 dark:text-zinc-400">
              {user.email}
            </p>
          </div>

        </div>

        <div className="space-y-4 ">

          <div>
            <p className="text-2xl font-semibold dark:text-white">
              Resume
            </p>

            {user.resume ? (
              <a
                href={`http://localhost:5000/${user.resume}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl dark:text-white"
              >
                View Resume
              </a>
            ) : (
              <p className="mt-2 text-red-400 dark:text-white">
                No Resume Uploaded
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;