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

