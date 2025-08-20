// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // TODO: add routes
// app.get("/", (req, res) => {
//   res.send("Welcome to api-gateway API 🚀");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log("api-gateway running on port " + PORT));


// backend/api-gateway/src/server.js

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// ---------- AUTH SERVICE ----------
app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:5001",  // auth-service
    changeOrigin: true,
  })
);

// ---------- PATIENT SERVICE ----------
app.use(
  "/patient",
  createProxyMiddleware({
    target: "http://localhost:5002",  // patient-service
    changeOrigin: true,
    pathRewrite: { "^/patient": "" }
  })
);

// ---------- DOCTOR SERVICE ----------
app.use(
  "/doctor",
  createProxyMiddleware({
    target: "http://localhost:5003",  // doctor-service
    changeOrigin: true,
    pathRewrite: { "^/doctor": "" }
  })
);

// ---------- APPOINTMENT SERVICE ----------
app.use(
  "/appointment",
  createProxyMiddleware({
    target: "http://localhost:5004",  // appointment-service
    changeOrigin: true,
    pathRewrite: { "^/appointment": "" }
  })
);

// ---------- PRESCRIPTION SERVICE ----------
app.use(
  "/prescription",
  createProxyMiddleware({
    target: "http://localhost:5004",  // prescription-service
    changeOrigin: true,
    pathRewrite: { "^/prescription": "" }  // /prescription/medical-history/:id → /medical-history/:id
  })
);

app.listen(4000, () => {
  console.log("API Gateway running on port 4000");
});
