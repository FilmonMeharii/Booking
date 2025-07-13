import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navigation: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <nav>
      <div>
        <Link to="/admin/dashboard">Dashboard</Link> |
        <Link to="/admin/bookings">Bokningar</Link> |
        <Link to="/admin/profile">Profil</Link>
      </div>
      <button onClick={handleLogout}>Logga ut</button>
    </nav>
  );
};