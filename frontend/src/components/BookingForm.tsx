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
    <div className="card">
      <h2>Boka ambassadtid</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Namn</label>
          <input
            id="name"
            type="text"
            placeholder="Ange fullständigt namn"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passport">Passnummer</label>
          <input
            id="passport"
            type="text"
            placeholder="Ange passnummer"
            value={formData.passportNumber}
            onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Datum för besök</label>
          <input
            id="date"
            type="date"
            value={formData.appointmentDate}
            onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="btn-primary">Boka tid</button>
      </form>
      {message && (
        <p className={`message ${message.includes('✅') ? 'success' : message.includes('❗') ? 'warning' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
};