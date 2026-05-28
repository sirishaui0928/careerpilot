import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  FileText,
  User,
  Settings,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";



const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },

  {
    title: "Jobs",
    icon: Briefcase,
     path: "/jobs",
  },
  { title: "Saved Jobs", 
    icon: Bookmark, 
    path: "/saved-jobs",
   },

  { title: "Cover Letter", 
    icon: FileText, 
    path: "/cover-letter",
   },

  {
    title: "Resume Analyzer",
    icon: FileText,
    path: "/resume-analyzer",
  },

  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },

  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },

];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="w-72 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 hidden md:flex flex-col">

      {/* Logo */}
     


<div className="flex justify-center py-6">
   <img src="/logo.png" alt="logo" className=" w-36 h-auto object-contain -ml-0 " />
    </div>




      {/* Menu */}
      <div className="flex-1 p-4 space-y-2">

        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              to={item.path}
              key={index}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
             ${
  location.pathname === item.path
    ? "bg-blue-600 text-white"
    : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-black dark:text-zinc-300"
}`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>

            </Link>
          );
        })}

      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">

        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4">

          <p className="font-semibold text-black dark:text-white">
            Welcome Back
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Ready to apply today?
          </p>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;