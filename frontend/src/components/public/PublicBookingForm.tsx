import React, { useState } from 'react';

interface PublicBookingFormProps {
  onBookingCreated: () => void;
}

export const PublicBookingForm: React.FC<PublicBookingFormProps> = ({ onBookingCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    passportNumber: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.passportNumber || !formData.appointmentDate) {
      setMessage('❗ Alla obligatoriska fält måste fyllas i');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (formData.appointmentDate < today) {
      setMessage('❗ Datumet kan inte vara i det förflutna');
      return;
    }

    try {
      // TODO: Implementera API-anrop för publik bokning
      console.log('Publik bokning:', formData);
      setMessage('✅ Bokning skapad! Vi återkommer med bekräftelse.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        passportNumber: '',
        appointmentDate: '',
        appointmentTime: '',
        reason: ''
      });
      onBookingCreated();
    } catch (err) {
      setMessage('❌ Kunde inte skapa bokning');
    }
  };

  return (
    <div className="card">
      <h2>Boka ambassadtid</h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#7f8c8d' }}>
        Fyll i formuläret nedan för att boka en tid på ambassaden
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Namn *</label>
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
          <label htmlFor="email">E-post *</label>
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
          <label htmlFor="phone">Telefonnummer</label>
          <input
            id="phone"
            type="tel"
            placeholder="Ange telefonnummer"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="passport">Passnummer *</label>
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
          <label htmlFor="date">Önskat datum *</label>
          <input
            id="date"
            type="date"
            value={formData.appointmentDate}
            onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="time">Önskad tid</label>
          <select
            id="time"
            value={formData.appointmentTime}
            onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
          >
            <option value="">Välj tid</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="reason">Anledning till besök</label>
          <textarea
            id="reason"
            placeholder="Beskriv kortfattat anledningen till ditt besök"
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            rows={3}
          />
        </div>
        
        <button type="submit" className="btn-primary">Skicka bokningsförfrågan</button>
      </form>
      
      {message && (
        <p className={`message ${message.includes('✅') ? 'success' : message.includes('❗') ? 'warning' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
}; 