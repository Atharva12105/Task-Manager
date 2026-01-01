import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useState } from "react";
import TaskForm from "./components/Taskform";

import api from "./api/axios";

/* ---------- Protected Route Wrapper ---------- */
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

/* ---------- Admin Only Route ---------- */
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.role === "admin" ? children : <Navigate to="/" />;
};

function AppContent() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  /* ---------- Create or Update Task ---------- */
  const handleSaveTask = async (data) => {
    if (editTask) {
      await api.put(`/tasks/${editTask.id}`, data);
    } else {
      await api.post("/tasks", data);
    }
    setShowForm(false);
    setEditTask(null);
    window.location.reload(); // simple refresh
  };

  return (
    <>
      {user && (
        <Navbar
          onCreate={() => {
            setEditTask(null);
            setShowForm(true);
          }}
        />
      )}

      {showForm && (
        <TaskForm
          task={editTask}
          onSubmit={handleSaveTask}
        />
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard
                onEdit={(task) => {
                  setEditTask(task);
                  setShowForm(true);
                }}
              />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <AdminRoute>
                <Users />
              </AdminRoute>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

/* ---------- Root App ---------- */
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
