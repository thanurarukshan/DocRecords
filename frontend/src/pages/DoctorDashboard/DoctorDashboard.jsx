import React, { useState, useEffect } from 'react';
import './DoctorDashboard.css';
import { useLocation } from "react-router-dom";

function DoctorDashboard() {
  const location = useLocation();
  const { user } = location.state || {}; // user object passed from Login page

  const [doctorProfile, setDoctorProfile] = useState({});
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState(null);
  const [newPrescription, setNewPrescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setDoctorProfile(user); // set doctor profile from login data
    }
  }, [user]);

  // 🔍 Fetch patient info by ID
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!patientId) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/patient/patients/${patientId}`);
      if (!response.ok) {
        throw new Error("Patient not found");
      }
      const data = await response.json();
      setPatient(data);
    } catch (error) {
      console.error("Error fetching patient:", error);
      setPatient(null);
      alert('Patient not found!');
    } finally {
      setLoading(false);
    }
  };

  // 💊 Add prescription
  const handleAddPrescription = async (e) => {
    e.preventDefault();
    if (!newPrescription || !patient) return;

    try {
      const response = await fetch(`http://localhost:4000/patient/patients/${patientId}/prescriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prescription: newPrescription,
          doctor_name: doctorProfile.fullName || "Unknown Doctor",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save prescription");
      }

      const updatedHistory = await response.json();

      // Update patient with new history
      setPatient((prev) => ({
        ...prev,
        medicalHistory: updatedHistory.medicalHistory,
      }));

      setNewPrescription('');
    } catch (error) {
      console.error("Error adding prescription:", error);
      alert("Failed to add prescription");
    }
  };

  return (
    <div className="doctor-dashboard">
      <h2>Welcome, {doctorProfile.fullName || "Doctor"}</h2>

      <section className="profile-section">
        <h3>Your Profile</h3>
        <div className="profile-info">
          <p><strong>Full Name:</strong> {doctorProfile.fullName || "-"}</p>
          <p><strong>Age:</strong> {doctorProfile.age || "-"}</p>
          <p><strong>Gender:</strong> {doctorProfile.gender || "-"}</p>
          <p><strong>Birthday:</strong> {doctorProfile.birthday || "-"}</p>
          <p><strong>Mobile:</strong> {doctorProfile.mobile || "-"}</p>
          <p><strong>Email:</strong> {doctorProfile.email || "-"}</p>
          <p><strong>MBBS Reg No:</strong> {doctorProfile.mbbsReg || "-"}</p>
        </div>
      </section>

      <section className="search-section">
        <h3>Search Patient</h3>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </section>

      {patient && (
        <section className="patient-section">
          <h3>Patient Info</h3>
          <p><strong>Full Name:</strong> {patient.full_name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>

          <h3>Medical History</h3>
          {patient.medicalHistory?.length > 0 ? (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Prescription</th>
                </tr>
              </thead>
              <tbody>
                {patient.medicalHistory.map((record, index) => (
                  <tr key={index}>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{record.prescription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No medical history available.</p>
          )}

          <h3>Add Prescription</h3>
          <form onSubmit={handleAddPrescription}>
            <textarea
              placeholder="Enter prescription details"
              value={newPrescription}
              onChange={(e) => setNewPrescription(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="btn-primary">Add Prescription</button>
          </form>
        </section>
      )}
    </div>
  );
}

export default DoctorDashboard;
