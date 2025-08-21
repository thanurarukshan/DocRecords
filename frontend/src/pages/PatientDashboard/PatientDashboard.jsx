// PatientDashboard.jsx
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

      // Fetch medical history from prescription-service via API Gateway
      const fetchMedicalHistory = async () => {
        try {
          const token = localStorage.getItem("token"); // send JWT for auth if needed
          const response = await fetch(
            `http://localhost:4000/prescription/medical-history/${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // optional
              },
            }
          );

          const data = await response.json();
          if (response.ok) {
            setHistory(data.medicalHistory || []); // use medicalHistory array
          } else {
            console.error("Failed to fetch medical history:", data.message);
          }
        } catch (err) {
          console.error("Error fetching medical history:", err);
        }
      };

      fetchMedicalHistory();
    }
  }, [user]);

  return (
    <div className="patient-dashboard">
      <h2>Welcome, {profile.fullName || "Patient"}</h2>

      <section className="profile-section">
        <h3>Your Profile</h3>
        <div className="profile-info">
          <p><strong>User ID:</strong> {profile.id || "-"}</p>
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
            {history.length > 0 ? (
              history.map(record => (
                <tr key={record.consultation_id}>
                  <td>{new Date(record.visit_date).toLocaleDateString()}</td>
                  <td>{record.doctor_name || record.doctor_id}</td>
                  <td>{record.prescription}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No medical history available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default PatientDashboard;
