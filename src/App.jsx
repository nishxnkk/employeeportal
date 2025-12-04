import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useCustomHooks';
import Login from './pages/Login';
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Leaves from './pages/Leaves';
import Payroll from './pages/Payroll';
import Calendar from './pages/Calendar';
import Feed from './pages/Feed';
import FeedAttempt from './pages/FeedAttempt';
import EmployeeOfTheMonth from './pages/EmployeeOfTheMonth';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Chat from './pages/Chat';
import Recognition from './pages/Recognition';
import Events from './pages/Events';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="leaves" element={<Leaves />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="feed" element={<Feed />} />
        <Route path="feed/attempt" element={<FeedAttempt />} />
        <Route path="feed/employee-of-the-month" element={<EmployeeOfTheMonth />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="chat" element={<Chat />} />
        <Route path="recognition" element={<Recognition />} />
        <Route path="events" element={<Events />} />
        {/* Add other routes here later */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
