// ----------------- Load environment variables -----------------
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Serve static frontend (index.html, script.js, style.css)
app.use(express.static(path.join(__dirname)));

// ----------------- MongoDB Setup -----------------
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sih_bins')
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Bin Schema
const binSchema = new mongoose.Schema({
  binId: String,
  lat: Number,
  lng: Number,
  level: Number,
  status: String,
  updated: { type: Date, default: Date.now }
});

const Bin = mongoose.model('Bin', binSchema);

// ----------------- API Routes -----------------

// Dummy bins for testing (before hardware connects)
app.get('/api/dummy', (req, res) => {
  const dummyBins = [
    { binId: "B-101", lat: 12.9716, lng: 77.5946, level: 25, status: "CLEANED", updated: new Date() },
    { binId: "B-102", lat: 12.975, lng: 77.59, level: 55, status: "HALF_FULL", updated: new Date() },
    { binId: "B-103", lat: 12.978, lng: 77.592, level: 92, status: "TO_BE_CLEANED", updated: new Date() },
    { binId: "B-104", lat: 12.973, lng: 77.596, level: 40, status: "CLEANED", updated: new Date() },
    { binId: "B-105", lat: 12.976, lng: 77.598, level: 80, status: "HALF_FULL", updated: new Date() }
  ];
  res.json(dummyBins); // ✅ corrected
});

// Receive bin data from hardware
app.post('/api/binData', async (req, res) => {
  try {
    const { binId, lat, lng, level } = req.body;

    // Decide status
    let status = 'CLEANED';
    if (level >= 90) status = 'TO_BE_CLEANED';
    else if (level >= 50) status = 'HALF_FULL';

    // Insert or update bin
    const bin = await Bin.findOneAndUpdate(
      { binId },
      { binId, lat, lng, level, status, updated: new Date() },
      { new: true, upsert: true }
    );

    // Emit update to all connected clients
    io.emit('binUpdate', bin);

    res.json({ ok: true, bin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Get all bins
app.get('/api/bins', async (req, res) => {
  try {
    const bins = await Bin.find();
    res.json(bins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ----------------- Socket.IO -----------------
io.on('connection', (socket) => {
  console.log('✅ Client connected');

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected');
  });
});

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
