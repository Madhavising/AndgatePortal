import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts & Pages
import Layout from "../layout/Layout";

import HrLayout from "../layout/HrLayout";

import CandidateList from "../hr/CandidateList";

import Approvals from "../hr/Approvals";
import HrSettings from "../hr/HrSetting";
import HrDashboard from "../hr/HrDashboard";
import AssignedCandidatePage from "../hr/AssignedPage";
import Unauthorized from "../pages/unauthorized";
import LoginScreen from "../pages/authPage/Login";

import TeamsPage from "../hr/Teams";
import CandidateRegistration from "../pages/Registration/registrations";
import ApplicationTracker from "../pages/Applications/applicationTracker";

// import UserDashboard from '../pages/UserPage/userDashboard';
// import SuperAdminPanel from '../pages/SuperAdmin/panel';
// import Unauthorized from '../pages/Common/unauthorized';

// Route Wrappers
const PrivateRoute = ({ isAuth }) =>
  isAuth ? <Outlet /> : <Navigate to="/Login" replace />;
const PublicRoute = ({ isAuth }) =>
  !isAuth ? <Outlet /> : <Navigate to="/Dashboard" replace />;
const AdminRoute = ({ user }) =>
  user?.role === "admin" || user?.role === "hr" ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
// const SuperAdminRoute = ({ user }) => user?.role === 'superadmin' ? <Outlet /> : <Navigate to="/unauthorized" replace />;
// const UserRoute = ({ user }) => user?.role === 'User' ? <Outlet /> : <Navigate to="/unauthorized" replace />;

const AppRouter = ({ isAuth }) => {
  const user = useSelector((state) => state.user.userData);

  return (
    <Routes>

      <Route element={<PublicRoute isAuth={isAuth} />}> {/* Public */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/candidate-registration" element={<CandidateRegistration />} />
      </Route>

      <Route element={<PrivateRoute isAuth={isAuth} />}> {/* Private */}

        <Route element={<AdminRoute user={user} />}>  {/* HR Portal */}
          <Route element={<HrLayout />}>
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/settings" element={<HrSettings />} />
            <Route path="/dashboard" element={<HrDashboard />} />
            <Route path="/candidates" element={<CandidateList />} />
            <Route path="/application-tracker" element={<ApplicationTracker />} />
            <Route path="/assigned-candidates" element={<AssignedCandidatePage />} />
          </Route>
        </Route>

        {/* <Route element={<SuperAdminRoute user={user} />}> Super Admin Routes
          <Route element={<Layout />}>
            <Route path="/superadmin" element={<SuperAdminPanel />} />
          </Route>
        </Route> */}

        {/* <Route element={<UserRoute user={user} />}> User Routes
          <Route element=  {<Layout />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
          </Route>
        </Route> */}
      </Route>

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Catch-All */}
      <Route path="*" element={<Navigate to={isAuth ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
};

export default AppRouter;
