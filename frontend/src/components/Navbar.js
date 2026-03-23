import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="navbar">
      <div className="logo">🏦 Online Banking System</div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
        {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        <span style={{ color: '#aaa', marginLeft: 20 }}>👤 {user?.name}</span>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
}
