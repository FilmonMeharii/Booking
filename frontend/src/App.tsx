import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/admin/LoginForm';
import { BookingForm } from './components/admin/BookingForm';
import { BookingList } from './components/admin/BookingList';
import { Profile } from './components/admin/Profile';
import { Navigation } from './components/shared/Navigation';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { Dashboard } from './components/admin/Dashboard';
import { HomePage } from './components/public/HomePage';
import { UserLogin } from './components/public/UserLogin';
import { PublicBookingForm } from './components/public/PublicBookingForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
                  <Routes>
          {/* Publika routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<PublicBookingForm onBookingCreated={() => {}} />} />
          <Route path="/login" element={<UserLogin />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<LoginForm />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <div>
                  <Navigation />
                  <Dashboard />
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/bookings" 
            element={
              <ProtectedRoute>
                <div>
                  <Navigation />
                  <div style={{ padding: '2rem' }}>
                    <BookingForm onBookingCreated={() => window.location.reload()} />
                    <BookingList />
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/profile" 
            element={
              <ProtectedRoute>
                <div>
                  <Navigation />
                  <div style={{ padding: '2rem' }}>
                    <Profile />
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;