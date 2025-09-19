const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Schema
const searchSchema = new mongoose.Schema({
  city: String,
  date: { type: Date, default: Date.now }
});
const Search = mongoose.model("Search", searchSchema);

// Weather API Route
app.get("/api/weather/:city", async (req, res) => {
  const { city } = req.params;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}&units=metric`
    );

    const newSearch = new Search({ city });
    await newSearch.save();

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "City not found or API error" });
  }
});

app.get("/api/history", async (req, res) => {
  const history = await Search.find().sort({ date: -1 }).limit(5);
  res.json(history);
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
