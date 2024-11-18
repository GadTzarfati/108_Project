const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('ssh2'); // ייבוא של ssh2
require('dotenv').config(); // טוען את קובץ .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // מאפשר קריאות בין דומיינים שונים
app.use(bodyParser.json()); // מאפשר עיבוד בקשות JSON

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // מסיים את השרת במקרה של כישלון
  });

// Health Check Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Server is up and running!',
    timestamp: new Date(),
  });
});

// SSH Connection Endpoint
app.post('/api/connect-ssh', (req, res) => {
  const { host, port, username, password } = req.body;
  const conn = new Client();

  conn.on('ready', () => {
    console.log('Client :: ready');
    conn.exec('uptime', (err, stream) => { // כאן תוכל לשנות את הפקודה ל-SSH לפי הצורך שלך
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      let data = '';
      stream
        .on('close', () => {
          conn.end();
          res.json({ success: true, output: data });
        })
        .on('data', (chunk) => {
          data += chunk;
        })
        .stderr.on('data', (chunk) => {
          console.error('STDERR: ' + chunk);
        });
    });
  }).connect({
    host,
    port,
    username,
    password,
  }).on('error', (err) => {
    res.status(500).json({ success: false, error: `SSH connection error: ${err.message}` });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
