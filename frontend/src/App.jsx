import React, { useState, useEffect } from 'react';
import './App.css';
import SplashScreen from '../SplashScreen.jsx';

// Configure React Routing
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Login from './pages/Login/Login.jsx';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard.jsx';
import PatientDashboard from './pages/PatientDashboard/PatientDashboard.jsx';

// A wrapper to handle splash on route change
function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show splash for 1.5s every time the route changes
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) return <SplashScreen />;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/patient" element={<PatientDashboard />} />
      <Route path="/doctor" element={<DoctorDashboard />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
