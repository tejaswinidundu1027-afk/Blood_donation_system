const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all donors
router.get('/', (req, res) => {
  db.query(
    'SELECT * FROM donors ORDER BY created_at DESC',
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    }
  );
});

// Add new donor
router.post('/add', (req, res) => {
  const {
    name,
    email,
    gender,
    phone,
    age,
    bloodGroup,
    address,
    lastDonationDate,
    medicalConditions
  } = req.body;

  if (!name || !bloodGroup) {
    return res.status(400).json({ error: 'Name and blood group are required' });
  }

  db.query(
    `INSERT INTO donors 
    (name, email, gender, phone, age, bloodGroup, address, 
    lastDonationDate, medicalConditions) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      email,
      gender,
      phone,
      age,
      bloodGroup,
      address,
      lastDonationDate || null,
      medicalConditions || null
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({
        message: 'Donor added successfully!',
        donorId: result.insertId
      });
    }
  );
});

// Get donor by ID
router.get('/:id', (req, res) => {
  db.query(
    'SELECT * FROM donors WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) {
        return res.status(404).json({ message: 'Donor not found' });
      }
      res.json(results[0]);
    }
  );
});

// Update donor
router.put('/:id', (req, res) => {
  const {
    name,
    email,
    gender,
    phone,
    age,
    bloodGroup,
    address,
    lastDonationDate,
    medicalConditions
  } = req.body;

  db.query(
    `UPDATE donors SET 
    name=?, email=?, gender=?, phone=?, age=?, 
    bloodGroup=?, address=?, lastDonationDate=?, 
    medicalConditions=? 
    WHERE id=?`,
    [
      name,
      email,
      gender,
      phone,
      age,
      bloodGroup,
      address,
      lastDonationDate || null,
      medicalConditions || null,
      req.params.id
    ],
    (err) => {
      if (err) return res.status(500).json({ error: 'Error updating donor' });
      res.json({ message: 'Donor updated successfully!' });
    }
  );
});

// Delete donor
router.delete('/:id', (req, res) => {
  db.query(
    'DELETE FROM donors WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Error deleting donor' });
      res.json({ message: 'Donor deleted successfully!' });
    }
  );
});

module.exports = router;