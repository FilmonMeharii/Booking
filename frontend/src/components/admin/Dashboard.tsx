import React, { useState, useEffect } from 'react';
import { bookingApi } from '../../services/api';
import { Booking } from '../../types';

export const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  });

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await bookingApi.getAll();
      const allBookings = response.data;
      setBookings(allBookings);
      
      // Beräkna statistik
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getFullYear(), now.getMonth() - 1, now.getDate());

      const todayBookings = allBookings.filter(b => 
        new Date(b.appointmentDate) >= today
      );
      
      const weekBookings = allBookings.filter(b => 
        new Date(b.appointmentDate) >= weekAgo
      );
      
      const monthBookings = allBookings.filter(b => 
        new Date(b.appointmentDate) >= monthAgo
      );

      setStats({
        total: allBookings.length,
        today: todayBookings.length,
        thisWeek: weekBookings.length,
        thisMonth: monthBookings.length
      });
    } catch (err) {
      console.error('Kunde inte ladda bokningar');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Laddar dashboard...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Översikt över bokningar och statistik</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Totalt antal bokningar</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.today}</div>
          <div className="stat-label">Bokningar idag</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.thisWeek}</div>
          <div className="stat-label">Denna vecka</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.thisMonth}</div>
          <div className="stat-label">Denna månad</div>
        </div>
      </div>

      <div className="card">
        <h2>Senaste bokningar</h2>
        {bookings.slice(0, 5).map(booking => (
          <div key={booking._id} className="booking-item">
            <div className="booking-info">
              <div className="booking-name">{booking.name}</div>
              <div className="booking-details">
                {booking.passportNumber} • {new Date(booking.appointmentDate).toLocaleDateString('sv-SE')}
              </div>
            </div>
          </div>
        ))}
        {bookings.length === 0 && (
          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Inga bokningar ännu</p>
        )}
      </div>
    </div>
  );
}; 