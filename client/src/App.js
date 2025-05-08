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

// File: client/src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

// File: client/src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const role = localStorage.getItem('role');

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {role === 'ROLE_ADMIN' && <Link to="/admin">Go to Admin Page</Link>}
    </div>
  );
}

// File: client/src/pages/AdminPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/user', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((res) => setMessage(res.data))
    .catch(() => setMessage('Access denied'));
  }, []);

  return (
    <div>
      <h2>Admin Page</h2>
      <p>{message}</p>
    </div>
  );
}
