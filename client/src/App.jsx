
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Jobs from "./pages/jobs/Jobs";
import ResumeAnalyzer from "./pages/dashboard/ResumeAnalyzer";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import Login from "./pages/auth/Login";
//import SavedJobs from "./pages/dashboard/SavedJobs";
import CoverLetter from "./pages/dashboard/CoverLetter";
import SavedJobs from "./pages/dashboard/SavedJobs";


function App() {

  return (

    <BrowserRouter>

      <Routes>
        
<Route
  path="/login"
  element={<Login />}
/>



        {/* Dashboard Layout */}

      <Route path="/" element={ <ProtectedRoute> <DashboardLayout /> </ProtectedRoute> } >

          {/* Dashboard */}

          <Route
            index
            element={<DashboardHome />}
          />
         <Route path="/saved-jobs" element={<SavedJobs />} />

          {/* Jobs */}

          <Route
            path="jobs"
            element={<Jobs />}
          />

          {/* Resume */}

          <Route
            path="resume-analyzer"
            element={<ResumeAnalyzer />}
          />
<Route path="cover-letter" element={<CoverLetter />} />
          {/* Profile */}

          <Route
            path="profile"
            element={<Profile />}
          />

          {/* Settings */}

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
