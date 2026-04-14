require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Database config - uses environment variables from .env
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

app.get('/api/test_connection', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.end();
    res.json({ success: true, message: 'Connected to database' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
  }

  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
    const [result] = await conn.execute(sql, [name, email, subject || '', message]);
    await conn.end();

    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ success: false, message: 'Server error: ' + err.message });
  }
});

app.listen(port, () => {
  console.log(`Vaagai backend running on http://localhost:${port}`);
});
