import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Välkommen till Ambassadbokning</h1>
        <p>Boka en tid på ambassaden enkelt och smidigt</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Online bokning</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">15 min</div>
          <div className="stat-label">Genomsnittlig tid</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">99%</div>
          <div className="stat-label">Nöjda kunder</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">5</div>
          <div className="stat-label">Dagar i veckan</div>
        </div>
      </div>

      <div className="card">
        <h2>Vad kan vi hjälpa dig med?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', border: '1px solid #e1e8ed', borderRadius: '8px' }}>
            <h3>Pass och visum</h3>
            <p>Ansök om nytt pass eller visum för resor</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #e1e8ed', borderRadius: '8px' }}>
            <h3>Medborgarskap</h3>
            <p>Information om medborgarskap och uppehållstillstånd</p>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #e1e8ed', borderRadius: '8px' }}>
            <h3>Dokument</h3>
            <p>Intyg och dokument som behöver stämplas</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Kom igång</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/book" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ minWidth: '200px' }}>
              Boka tid
            </button>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button className="btn-success" style={{ minWidth: '200px' }}>
              Logga in
            </button>
          </Link>
        </div>
      </div>

      <div className="card">
        <h2>Öppettider</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <strong>Måndag - Fredag:</strong><br />
            09:00 - 16:00
          </div>
          <div>
            <strong>Lördag:</strong><br />
            10:00 - 14:00
          </div>
          <div>
            <strong>Söndag:</strong><br />
            Stängt
          </div>
        </div>
      </div>
    </div>
  );
}; 