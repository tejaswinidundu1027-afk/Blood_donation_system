const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all blood banks
router.get('/', (req, res) => {
  db.query(
    'SELECT * FROM blood_banks ORDER BY blood_group, city',
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    }
  );
});

// Get blood banks by blood group
router.get('/group/:bloodGroup', (req, res) => {
  db.query(
    'SELECT * FROM blood_banks WHERE blood_group = ? ORDER BY units_available DESC',
    [req.params.bloodGroup],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    }
  );
});

module.exports = router;