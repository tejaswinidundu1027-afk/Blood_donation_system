const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (results.length === 0) return res.status(401).json({ error: 'User not found. Please register.' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid password' });

    res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  });
});

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, gender, phone, age, bloodGroup, address } = req.body;
  if (!email || !password || !name) return res.status(400).json({ error: 'Name, email, and password are required' });

  db.query('SELECT id FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length > 0) return res.status(409).json({ error: 'Email already registered' });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(
        'INSERT INTO users (name, email, password, gender, phone, age, bloodGroup, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, email, hashedPassword, gender, phone, age, bloodGroup, address],
        (err, result) => {
          if (err) return res.status(500).json({ error: 'Registration failed' });
          res.json({ message: 'Registered successfully!', userId: result.insertId });
        }
      );
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
    }
  });
});

module.exports = router;