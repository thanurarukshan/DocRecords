const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// TODO: add routes
app.get("/", (req, res) => {
  res.send("Welcome to prescription-service API 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("prescription-service running on port " + PORT));
