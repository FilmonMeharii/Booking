import React, { useState } from 'react';
import { bookingApi } from '../services/api';

interface BookingFormProps {
  onBookingCreated: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onBookingCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    passportNumber: '',
    appointmentDate: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.passportNumber || !formData.appointmentDate) {
      setMessage('❗ Alla fält måste fyllas i');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (formData.appointmentDate < today) {
      setMessage('❗ Datumet kan inte vara i det förflutna');
      return;
    }

    try {
      await bookingApi.create(formData);
      setMessage('✅ Bokning skapad!');
      setFormData({ name: '', passportNumber: '', appointmentDate: '' });
      onBookingCreated();
    } catch (err) {
      setMessage('❌ Kunde inte skapa bokning');
    }
  };

  return (
    <div>
      <h1>Boka ambassadtid</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Namn"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="Passnummer"
          value={formData.passportNumber}
          onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
        />
        <input
          type="date"
          value={formData.appointmentDate}
          onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
        />
        <button type="submit">Boka</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};