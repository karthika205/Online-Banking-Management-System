import React, { useEffect, useState } from 'react';
import API from '../utils/api';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/users/all').then(({ data }) => setUsers(data));
  }, []);

  const toggle = async (id) => {
    await API.put(`/users/toggle/${id}`);
    setUsers(users.map(u => u._id === id ? { ...u, isActive: !u.isActive } : u));
  };

  return (
    <div className="page">
      <h2>Admin Panel — All Users</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Account No</th><th>Balance</th><th>Role</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.accountNumber}</td>
                <td>₹{u.balance?.toFixed(2)}</td>
                <td style={{ textTransform: 'capitalize' }}>{u.role}</td>
                <td><span className={`badge badge-${u.isActive ? 'active' : 'inactive'}`}>{u.isActive ? 'Active' : 'Inactive'}</span></td>
                <td>
                  <button
                    onClick={() => toggle(u._id)}
                    style={{ padding: '5px 12px', border: 'none', borderRadius: 6, cursor: 'pointer',
                      background: u.isActive ? '#fce4ec' : '#e8f5e9',
                      color: u.isActive ? '#c62828' : '#2e7d32' }}>
                    {u.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
