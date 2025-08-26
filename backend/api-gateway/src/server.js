import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// ---------- AUTH SERVICE ----------
app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:5001", // auth-service
    changeOrigin: true,
  })
);

// ---------- PATIENT SERVICE ----------
app.use(
  "/patient",
  createProxyMiddleware({
    target: "http://localhost:5000", // patient-service
    changeOrigin: true,
    pathRewrite: { "^/patient": "" },
  })
);

// ---------- DOCTOR SERVICE ----------
app.use(
  "/doctor",
  createProxyMiddleware({
    target: "http://localhost:5003", // doctor-service
    changeOrigin: true,
    pathRewrite: { "^/doctor": "" },
  })
);

// ---------- APPOINTMENT SERVICE ----------
app.use(
  "/appointment",
  createProxyMiddleware({
    target: "http://localhost:5004", // appointment-service
    changeOrigin: true,
    pathRewrite: { "^/appointment": "" },
  })
);

// ---------- PRESCRIPTION SERVICE ----------
app.use(
  "/prescription",
  createProxyMiddleware({
    target: "http://localhost:5004", // prescription-service
    changeOrigin: true,
    pathRewrite: { "^/prescription": "" }, // /prescription/... → /...
  })
);

// ---------- PROFILE CONTROL SERVICE ----------
app.use(
  "/profile",
  createProxyMiddleware({
    target: "http://localhost:5008", // profile-control-service
    changeOrigin: true,
    pathRewrite: { "^/profile": "" }, // /profile/update → /update
  })
);

app.listen(4000, () => {
  console.log("API Gateway running on port 4000");
});
