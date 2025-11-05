import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard.jsx";
import ParentDashboard from "./pages/Parent/ParentDashboard.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

function App() {
  // To store logged-in user info even after page refresh
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/"
        element={
          !user ? <Login setUser={setUser} /> : <Navigate to={`/${user.role}`} />
        }
      />

      {/* Dashboards */}
      <Route
        path="/teacher"
        element={
          user?.role === "teacher" ? <TeacherDashboard setUser={setUser}/> : <Navigate to="/" />
        }
      />
      <Route
        path="/parent"
        element={
          user?.role === "parent" ? <ParentDashboard setUser={setUser}/> : <Navigate to="/" />
        }
      />
      <Route
        path="/admin"
        element={
          user?.role === "admin" ? <AdminDashboard setUser={setUser}/> : <Navigate to="/" />
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
