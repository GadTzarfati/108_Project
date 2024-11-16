const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // טוען את קובץ .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // מאפשר קריאות בין דומיינים שונים
app.use(bodyParser.json()); // מאפשר עיבוד בקשות JSON

// MongoDB Connection
mongoose.set('strictQuery', true); // מפעיל מצב strict ב-Mongoose
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
