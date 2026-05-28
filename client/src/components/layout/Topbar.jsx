import {
  LogOut,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  useNavigate,
} from "react-router-dom";

import { useState } from "react";
const Topbar = () => {
  const navigate =
    useNavigate();

  const handleLogout = () => {
  setShowLogoutPopup(true);
};
const confirmLogout = () => {

  localStorage.removeItem("token");

  toast.success("Logged out successfully");

  navigate("/login");
};

const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6">

      <h2 className="text-xl font-semibold text-black dark:text-white">
        Dashboard
      </h2>

      <button
        onClick={
          handleLogout
        }
        className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-xl flex items-center gap-2 text-white"
      >
        <LogOut size={18} />
        Logout
      </button>
{
  showLogoutPopup && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl w-80">

        <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
          Confirm Logout
        </h2>

        <p className="text-zinc-600 dark:text-zinc-300 mb-6">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={() => setShowLogoutPopup(false)}
            className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700"
          >
            Cancel
          </button>

          <button
            onClick={confirmLogout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  )
}
    </header>
  );
};

export default Topbar;