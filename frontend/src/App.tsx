import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { BookingForm } from './components/BookingForm';
import { BookingList } from './components/BookingList';
import { Profile } from './components/Profile';
import { Navigation } from './components/Navigation';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
                  <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route 
            path="/dashboard" 
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
            path="/bookings" 
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
            path="/profile" 
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