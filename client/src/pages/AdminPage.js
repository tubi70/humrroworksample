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
