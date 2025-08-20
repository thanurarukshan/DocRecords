// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // TODO: add routes
// app.get("/", (req, res) => {
//   res.send("Welcome to prescription-service API 🚀");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log("prescription-service running on port " + PORT));


import express from "express";
import cors from "cors";
import pool from "./db.js"; // import DB pool
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ----------------- ROUTES -----------------

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to prescription-service API 🚀");
});

// Get medical history for a patient by user_id
app.get("/medical-history/:patientId", async (req, res) => {
  const { patientId } = req.params;

  try {
    const [rows] = await pool.query(
    `SELECT 
        c.consultation_id, 
        c.visit_date AS date,  -- updated column
        c.prescription, 
        d.full_name AS doctor_name
    FROM patient_db.consultations c
    JOIN auth_db.users d ON c.doctor_id = d.user_id
    WHERE c.patient_id = ?
    ORDER BY c.visit_date DESC`,
    [patientId]
);


    res.json({ medicalHistory: rows });
  } catch (err) {
    console.error("Error fetching medical history:", err);
    res.status(500).json({ message: "Database error" });
  }
});


// ----------------- START SERVER -----------------
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log("prescription-service running on port " + PORT));
