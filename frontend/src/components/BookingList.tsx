import React, { useState, useEffect } from 'react';
import { bookingApi } from '../services/api';
import { Booking } from '../types';

export const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Laddar...</div>;

  return (
    <div>
      <h2>Alla bokningar</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            {booking.name} – {booking.passportNumber} – {new Date(booking.appointmentDate).toLocaleDateString()}
            <button 
              className="delete-btn"
              onClick={() => handleDelete(booking._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};