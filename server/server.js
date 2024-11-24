const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('ssh2'); // ייבוא של ssh2
const net = require('net'); // ייבוא של net עבור Telnet
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
    console.log('SSH Client :: ready');
    conn.exec('uptime', (err, stream) => {
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

// Telnet Connection Endpoint
app.post('/api/connect-telnet', (req, res) => {
  const { host, port } = req.body;
  const client = new net.Socket();

  client.connect(port, host, () => {
    console.log('Connected to Telnet server');
    client.write('Hello from client!\n');
  });

  client.on('data', (data) => {
    res.json({ success: true, output: data.toString() });
    client.destroy(); // סגירת החיבור
  });

  client.on('error', (err) => {
    res.status(500).json({ success: false, error: `Telnet connection error: ${err.message}` });
  });

  client.on('close', () => {
    console.log('Telnet connection closed');
  });
});

// CLI Connection Endpoint
app.post('/api/connect-cli', (req, res) => {
  const { chips } = req.body; // מערך של שלושת הצ'יפים: [{host, username, password}, ...]
  const responses = [];

  chips.forEach((chip, index) => {
    const conn = new Client();

    conn.on('ready', () => {
      console.log(`CLI Client :: ready for Chip ${index + 1}`);
      conn.exec('python3', (err, stream) => {
        if (err) {
          responses.push({ success: false, error: err.message, chip: index + 1 });
          if (responses.length === chips.length) {
            res.json(responses);
          }
          return;
        }
        let data = '';
        stream
          .on('close', () => {
            conn.end();
            responses.push({ success: true, output: data, chip: index + 1 });
            if (responses.length === chips.length) {
              res.json(responses);
            }
          })
          .on('data', (chunk) => {
            data += chunk;
          })
          .stderr.on('data', (chunk) => {
            console.error(`STDERR Chip ${index + 1}: ` + chunk);
          });
      });
    }).connect({
      host: chip.host,
      username: chip.username,
      password: chip.password,
    }).on('error', (err) => {
      responses.push({ success: false, error: `CLI connection error: ${err.message}`, chip: index + 1 });
      if (responses.length === chips.length) {
        res.json(responses);
      }
    });
  });
});

// Power Toggle Endpoint
app.post('/api/toggle-power', (req, res) => {
  const { machineId, powerState } = req.body; // machineId לזיהוי מכונה
  const newState = !powerState; // הפיכת המצב הנוכחי
  // דוגמה: כאן ניתן להוסיף לוגיקה לביצוע פעולה במכונה לפי ID
  res.json({ success: true, newState });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
