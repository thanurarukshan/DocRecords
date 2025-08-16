import React, { useState, useEffect } from 'react';
import './DoctorDashboard.css';

// Dummy doctor profile
const dummyDoctorProfile = {
  fullName: 'Dr. John Smith',
  age: 40,
  gender: 'Male',
  birthday: '1985-05-15',
  mobile: '0779876543',
  email: 'dr.john@example.com',
  mbbsReg: 'MBBS12345',
};

// Dummy patient data
const dummyPatients = {
  101: {
    fullName: 'John Doe',
    age: 30,
    gender: 'Male',
    medicalHistory: [
      { id: 1, date: '2025-08-01', prescription: 'Paracetamol 500mg, 3 times a day' },
      { id: 2, date: '2025-08-10', prescription: 'Amoxicillin 250mg, 2 times a day' },
    ],
  },
  102: {
    fullName: 'Jane Smith',
    age: 25,
    gender: 'Female',
    medicalHistory: [],
  },
};

function DoctorDashboard() {
  const [doctorProfile, setDoctorProfile] = useState({});
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState(null);
  const [newPrescription, setNewPrescription] = useState('');

  useEffect(() => {
    // TODO: fetch doctor profile from API
    setDoctorProfile(dummyDoctorProfile);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const foundPatient = dummyPatients[patientId];
    if (foundPatient) {
      setPatient(foundPatient);
    } else {
      setPatient(null);
      alert('Patient not found!');
    }
  };

  const handleAddPrescription = (e) => {
    e.preventDefault();
    if (!newPrescription) return;
    const updatedHistory = [
      ...patient.medicalHistory,
      { id: Date.now(), date: new Date().toISOString().split('T')[0], prescription: newPrescription },
    ];
    setPatient({ ...patient, medicalHistory: updatedHistory });
    setNewPrescription('');
    // TODO: call API to save prescription
  };

  return (
    <div className="doctor-dashboard">
      <h2>Welcome, {doctorProfile.fullName}</h2>

      <section className="profile-section">
        <h3>Your Profile</h3>
        <div className="profile-info">
          <p><strong>Full Name:</strong> {doctorProfile.fullName}</p>
          <p><strong>Age:</strong> {doctorProfile.age}</p>
          <p><strong>Gender:</strong> {doctorProfile.gender}</p>
          <p><strong>Birthday:</strong> {doctorProfile.birthday}</p>
          <p><strong>Mobile:</strong> {doctorProfile.mobile}</p>
          <p><strong>Email:</strong> {doctorProfile.email}</p>
          <p><strong>MBBS Reg No:</strong> {doctorProfile.mbbsReg}</p>
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
          <button type="submit" className="btn-primary">Search</button>
        </form>
      </section>

      {patient && (
        <section className="patient-section">
          <h3>Patient Info</h3>
          <p><strong>Full Name:</strong> {patient.fullName}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>

          <h3>Medical History</h3>
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Prescription</th>
              </tr>
            </thead>
            <tbody>
              {patient.medicalHistory.map(record => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.prescription}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
