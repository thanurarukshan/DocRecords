import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

// Dummy data (replace with API calls later)
const dummyDoctors = [
  { id: 1, fullName: 'Dr. John Smith', email: 'dr.john@example.com', mbbsReg: 'MBBS12345' },
  { id: 2, fullName: 'Dr. Jane Doe', email: 'dr.jane@example.com', mbbsReg: 'MBBS67890' },
];

const dummyPatients = [
  { id: 101, fullName: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 102, fullName: 'Jane Smith', email: 'jane@example.com', age: 25 },
];

function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // TODO: fetch doctors & patients from API
    setDoctors(dummyDoctors);
    setPatients(dummyPatients);
  }, []);

  const handleDeleteDoctor = (id) => {
    if(window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors(doctors.filter(doc => doc.id !== id));
      // TODO: call API to delete doctor
    }
  };

  const handleDeletePatient = (id) => {
    if(window.confirm("Are you sure you want to delete this patient?")) {
      setPatients(patients.filter(p => p.id !== id));
      // TODO: call API to delete patient
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <section className="table-section">
        <h3>Doctors</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>MBBS Reg</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doc => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.fullName}</td>
                <td>{doc.email}</td>
                <td>{doc.mbbsReg}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDeleteDoctor(doc.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="table-section">
        <h3>Patients</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.fullName}</td>
                <td>{p.email}</td>
                <td>{p.age}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDeletePatient(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
}

export default AdminDashboard;
