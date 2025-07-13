import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserLogin: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  // const navigate = useNavigate(); // TODO: Använd när API är implementerat

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // TODO: Implementera användarlogin
        console.log('Användarlogin:', formData);
        // navigate('/my-bookings');
      } else {
        // TODO: Implementera användarregistrering
        console.log('Användarregistrering:', formData);
        // navigate('/my-bookings');
      }
    } catch (err: any) {
      setError(err.message || 'Ett fel uppstod');
    }
  };

  return (
    <div className="login-container">
      <h1>{isLogin ? 'Logga in' : 'Skapa konto'}</h1>
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Namn</label>
            <input
              id="name"
              type="text"
              placeholder="Ange ditt namn"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required={!isLogin}
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">E-post</label>
          <input
            id="email"
            type="email"
            placeholder="Ange din e-post"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Lösenord</label>
          <input
            id="password"
            type="password"
            placeholder="Ange lösenord"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        
        <button type="submit" className="btn-primary">
          {isLogin ? 'Logga in' : 'Skapa konto'}
        </button>
      </form>
      
      {error && <p className="message error">{error}</p>}
      
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button 
          onClick={() => setIsLogin(!isLogin)}
          style={{ background: 'none', border: 'none', color: '#4A90E2', textDecoration: 'underline' }}
        >
          {isLogin ? 'Har du inget konto? Skapa ett här' : 'Har du redan ett konto? Logga in här'}
        </button>
      </div>
    </div>
  );
}; 