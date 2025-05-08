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
