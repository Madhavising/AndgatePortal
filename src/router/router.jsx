import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts & Pages
import Layout from '../layout/layout';
import LoginScreen from '../pages/AuthPage/login';
import Dashboard from '../pages/Dashboard/dashboard';
import CandidateRegistration from '../pages/Registration/registrations';
// import UserDashboard from '../pages/UserPage/userDashboard';
// import SuperAdminPanel from '../pages/SuperAdmin/panel';
// import Unauthorized from '../pages/Common/unauthorized';

// Route Wrappers
const PrivateRoute = ({ isAuth }) => isAuth ? <Outlet /> : <Navigate to="/login" replace />;
const PublicRoute = ({ isAuth }) => !isAuth ? <Outlet /> : <Navigate to="/dashboard" replace />;
const AdminRoute = ({ user }) => user?.role === 'admin' ? <Outlet /> : <Navigate to="/unauthorized" replace />;
// const SuperAdminRoute = ({ user }) => user?.role === 'superadmin' ? <Outlet /> : <Navigate to="/unauthorized" replace />;
// const UserRoute = ({ user }) => user?.role === 'User' ? <Outlet /> : <Navigate to="/unauthorized" replace />;

const AppRouter = ({ isAuth }) => {
    const user = useSelector((state) => state.user.userData);

    return (
        <Routes>
            {/* Public */}
            <Route element={<PublicRoute isAuth={isAuth} />}>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/candidate-registration" element={<CandidateRegistration />} />
            </Route>

            {/* Private */}
            <Route element={<PrivateRoute isAuth={isAuth} />}>

                {/* Admin Route */}
                <Route element={<AdminRoute user={user} />}>
                    <Route element={<Layout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/* Add more admin routes here */}
                    </Route>
                </Route>

                {/* <Route element={<SuperAdminRoute user={user} />}>
          <Route element={<Layout />}>
            <Route path="/superadmin" element={<SuperAdminPanel />} />
          </Route>
        </Route> */}

                {/* <Route element={<UserRoute user={user} />}>
          <Route element=  {<Layout />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
          </Route>
        </Route> */}
            </Route>

            {/* Unauthorized */}
            {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

            {/* Catch-All */}
            <Route path="*" element={<Navigate to={isAuth ? "/dashboard" : "/login"} replace />} />
        </Routes>
    );
};

export default AppRouter;
