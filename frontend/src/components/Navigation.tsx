import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Navigation: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/bookings">Bokningar</Link> |
      <Link to="/profile">Profil</Link> |
      <button onClick={handleLogout}>Logga ut</button>
    </nav>
  );
};