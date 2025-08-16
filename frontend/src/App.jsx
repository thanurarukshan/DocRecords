import React from 'react';
import './App.css'


// Configure React Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login.jsx'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx'
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard.jsx'
import PatientDashboard from './pages/PatientDashboard/PatientDashboard.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/patient" element={<PatientDashboard/>} />
        <Route path="/doctor" element={<DoctorDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;