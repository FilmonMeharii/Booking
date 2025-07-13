import React from 'react';

export const Profile: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Min profil</h1>
        <p>Administratörsinformation och inställningar</p>
      </div>
      
      <div className="card">
        <h2>Kontoinformation</h2>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Användarnamn:</strong> admin
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Roll:</strong> Administratör
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Inloggad sedan:</strong> {new Date().toLocaleString('sv-SE')}
        </div>
      </div>
      
      <div className="card">
        <h2>Systeminformation</h2>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Version:</strong> 1.0.0
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Senaste uppdatering:</strong> {new Date().toLocaleDateString('sv-SE')}
        </div>
      </div>
    </div>
  );
};