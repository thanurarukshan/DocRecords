import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";  // using your db.js connection pool

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to patient-service API 🚀");
});

// Search patient by ID
app.get("/patients/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT user_id, email, full_name, age, gender, birthday, mobile FROM users WHERE user_id = ? AND role = 'patient'",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(rows[0]); // return first matching patient
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`patient-service running on port ${PORT}`)
);
