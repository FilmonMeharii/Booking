import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Försöker logga in med:', credentials);
      const response = await adminApi.login(credentials);
      console.log('Inloggning lyckades:', response.data);
      login(response.data.token);
      navigate('/bookings');
    } catch (err: any) {
      console.error('Inloggningsfel:', err);
      console.error('Fel detaljer:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      const errorMessage = err.response?.data?.message || err.message || 'Fel vid inloggning';
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1>Logga in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Användarnamn"
          value={credentials.username}
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
        <button type="submit">Logga in</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};