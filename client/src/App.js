// === BACKEND: Spring Boot + JWT Auth + Role-based Access (see previous section) ===

// === FRONTEND: React Dashboard Starter Code ===
// File: client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        <Route path="/" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/admin"
          element={role === 'ROLE_ADMIN' ? <AdminPage /> : <Navigate to="/dashboard" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

