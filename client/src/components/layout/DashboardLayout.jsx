import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import {
  Outlet,
} from "react-router-dom";

const DashboardLayout = () => {

  return (

    <div className="flex min-h-screen">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="flex-1">

        {/* Navbar */}

        <Topbar />

        {/* Page Content */}

        <main
          className="
            p-8

            bg-zinc-100
            dark:bg-zinc-950

            min-h-screen
          "
        >

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;
