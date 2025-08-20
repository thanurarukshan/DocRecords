import React, { useState, useEffect } from 'react';
import './PatientDashboard.css';
import { useLocation } from "react-router-dom";

function PatientDashboard() {
  const location = useLocation();
  const { user } = location.state || {}; // user object passed from login page

  const [profile, setProfile] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      setProfile(user); // set patient profile from login data
    }

    // TODO: fetch medical history from API
    // For now, using dummy data
    const dummyMedicalHistory = [
      { id: 1, doctor: 'Dr. Smith', date: '2025-08-01', prescription: 'Paracetamol 500mg, 3 times a day' },
      { id: 2, doctor: 'Dr. Jane', date: '2025-08-10', prescription: 'Amoxicillin 250mg, 2 times a day' },
    ];
    setHistory(dummyMedicalHistory);
  }, [user]);

  return (
    <div className="patient-dashboard">
      <h2>Welcome, {profile.fullName || "Patient"}</h2>

      <section className="profile-section">
        <h3>Your Profile</h3>
        <div className="profile-info">
          <p><strong>Full Name:</strong> {profile.fullName || "-"}</p>
          <p><strong>Age:</strong> {profile.age || "-"}</p>
          <p><strong>Gender:</strong> {profile.gender || "-"}</p>
          <p><strong>Birthday:</strong> {profile.birthday || "-"}</p>
          <p><strong>Mobile:</strong> {profile.mobile || "-"}</p>
          <p><strong>Email:</strong> {profile.email || "-"}</p>
        </div>
      </section>

      <section className="history-section">
        <h3>Medical History</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor</th>
              <th>Prescription</th>
            </tr>
          </thead>
          <tbody>
            {history.map(record => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.doctor}</td>
                <td>{record.prescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default PatientDashboard;
