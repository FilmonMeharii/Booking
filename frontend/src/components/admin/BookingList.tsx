import React, { useState, useEffect } from 'react';
import { bookingApi } from '../../services/api';
import { Booking } from '../../types';
import { SearchFilter } from '../shared/SearchFilter';

export const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const loadBookings = async () => {
    try {
      const response = await bookingApi.getAll();
      setBookings(response.data);
    } catch (err) {
      console.error('Kunde inte ladda bokningar');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Vill du ta bort bokningen?');
    if (!confirmed) return;

    try {
      await bookingApi.delete(id);
      loadBookings();
    } catch (err) {
      console.error('Kunde inte ta bort bokning');
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  if (loading) return <div className="loading">Laddar bokningar...</div>;

  // Filtrera bokningar
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = searchTerm === '' || 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.passportNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = filterDate === '' || 
      booking.appointmentDate === filterDate;
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="booking-list">
      <h2>Alla bokningar</h2>
      
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />
      
      {filteredBookings.length === 0 ? (
        <div className="card">
          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
            {bookings.length === 0 ? 'Inga bokningar hittades' : 'Inga bokningar matchar dina filter'}
          </p>
        </div>
      ) : (
        <div>
          {filteredBookings.map(booking => (
            <div key={booking._id} className="booking-item">
              <div className="booking-info">
                <div className="booking-name">{booking.name}</div>
                <div className="booking-details">
                  Passnummer: {booking.passportNumber} • 
                  Datum: {new Date(booking.appointmentDate).toLocaleDateString('sv-SE')}
                </div>
              </div>
              <div className="booking-actions">
                <button 
                  className="btn-danger"
                  onClick={() => handleDelete(booking._id)}
                >
                  Ta bort
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};