import {
  Moon,
  Sun,
} from "lucide-react";

import {
  useTheme,
} from "../../context/ThemeContext";

const Settings = () => {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold dark:text-white text-black">
          Settings
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your preferences
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 max-w-2xl">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold dark:text-white text-black">
              Theme
            </h2>

            <p className="text-zinc-400 mt-1">
              Switch between dark and light mode
            </p>
          </div>

          <button
            onClick={
              toggleTheme
            }
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white"
          >
            {theme ===
            "dark" ? (
              <>
                <Sun size={20} />
                Light
              </>
            ) : (
              <>
                <Moon size={20} />
                Dark
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
};

export default Settings;