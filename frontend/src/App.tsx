import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { BookingForm } from './components/BookingForm';
import { BookingList } from './components/BookingList';
import { Profile } from './components/Profile';
import { Navigation } from './components/Navigation';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="/bookings" />} />
          <Route 
            path="/bookings" 
            element={
              <ProtectedRoute>
                <div>
                  <Navigation />
                  <BookingForm onBookingCreated={() => window.location.reload()} />
                  <BookingList />
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
                  <Profile />
                </div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;