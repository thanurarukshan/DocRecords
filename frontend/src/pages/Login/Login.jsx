import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState('patient'); // default role
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    birthday: '',
    mobile: '',
    email: '',
    password: '',
    mbbsReg: '', // only for doctors
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        const payload = { ...formData, role };
        if (role !== "doctor") delete payload.mbbsReg;

        const response = await fetch("http://localhost:4000/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Signup successful! Please login.");
          setIsSignup(false);
        } else {
          alert(data.message || "Signup failed!");
        }
      } else {
        const response = await fetch("http://localhost:4000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password, role }),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", role);

          // Check MBBS registration to prevent dashboard misuse
          const isDoctor = !!data.user.mbbsReg; // true if mbbsReg exists

          if (role === "doctor") {
            if (!isDoctor) {
              alert("You are not registered as a doctor. Cannot access Doctor Dashboard.");
              return;
            }
            navigate("/doctor", { state: { user: data.user } });
          } else {
            if (isDoctor) {
              alert("Doctors cannot access Patient Dashboard.");
              return;
            }
            navigate("/patient", { state: { user: data.user } });
          }
        } else {
          alert(data.message || "Login failed!");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required min="0" />

            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label>Birthday</label>
            <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />

            <label>Mobile No</label>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />
          </>
        )}

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <div className="role-select">
          <label>
            <input 
              type="radio" 
              value="patient" 
              checked={role === "patient"} 
              onChange={(e) => setRole(e.target.value)} 
            />
            Patient
          </label>
          <label>
            <input 
              type="radio" 
              value="doctor" 
              checked={role === "doctor"} 
              onChange={(e) => setRole(e.target.value)} 
            />
            Doctor
          </label>
        </div>

        {isSignup && role === 'doctor' && (
          <>
            <label>MBBS Registration No</label>
            <input type="text" name="mbbsReg" value={formData.mbbsReg} onChange={handleChange} required />
          </>
        )}

        <button type="submit" className="btn-primary">
          {isSignup ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <p className="toggle-text">
        {isSignup ? "Already have an account?" : "Not a user?"}{" "}
        <button 
          type="button" 
          className="toggle-btn" 
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}

export default Login;
