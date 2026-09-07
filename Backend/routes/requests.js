const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all requests
router.get('/', (req, res) => {
  db.query(
    'SELECT * FROM requests ORDER BY created_at DESC',
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    }
  );
});

// Add new request + find matching donors
router.post('/add', (req, res) => {
  const {
    requesterName,
    phone,
    email,
    bloodGroup,
    quantity,
    date,
    location,
    urgency,
    reason
  } = req.body;

  if (!requesterName || !bloodGroup || !quantity || !date || !urgency) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  db.query(
    `INSERT INTO requests 
    (requesterName, phone, email, bloodGroup, 
    quantity, date, location, urgency, reason) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      requesterName, phone, email,
      bloodGroup, quantity, date,
      location || null, urgency,
      reason || null
    ],
    (err, result) => {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      const requestId = result.insertId;

      // Find matching donors by blood group
      db.query(
        `SELECT id, name, phone, bloodGroup, address 
        FROM donors WHERE bloodGroup = ?`,
        [bloodGroup],
        (err, donors) => {
          if (err) {
            console.error('Match error:', err);
            return res.json({
              message: 'Blood request submitted successfully!',
              requestId: requestId,
              matchedDonors: [],
              matchCount: 0
            });
          }

          // Filter by location
          const locationWord = (location || '').toLowerCase();
          const exactMatch = donors.filter(d =>
            locationWord &&
            (d.address || '').toLowerCase().includes(locationWord)
          );

          const matchedDonors = exactMatch.length > 0
            ? exactMatch : donors;

          // Save matches
          if (matchedDonors.length > 0) {
            const values = matchedDonors.map(d => [requestId, d.id]);
            db.query(
              'INSERT INTO donor_matches (request_id, donor_id) VALUES ?',
              [values],
              (err) => {
                if (err) console.error('Match save error:', err);
              }
            );
          }

          res.json({
            message: 'Blood request submitted successfully!',
            requestId: requestId,
            matchedDonors: matchedDonors,
            matchCount: matchedDonors.length
          });
        }
      );
    }
  );
});

// Get matching donors for a request
router.get('/matches/:requestId', (req, res) => {
  db.query(
    `SELECT d.id, d.name, d.phone, d.bloodGroup, d.address 
    FROM donor_matches dm
    JOIN donors d ON dm.donor_id = d.id
    WHERE dm.request_id = ?`,
    [req.params.requestId],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    }
  );
});

// Get request by ID
router.get('/:id', (req, res) => {
  db.query(
    'SELECT * FROM requests WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) {
        return res.status(404).json({ message: 'Request not found' });
      }
      res.json(results[0]);
    }
  );
});

// Update request
router.put('/:id', (req, res) => {
  const {
    requesterName, phone, email,
    bloodGroup, quantity, date,
    location, urgency, reason
  } = req.body;

  db.query(
    `UPDATE requests SET 
    requesterName=?, phone=?, email=?,
    bloodGroup=?, quantity=?, date=?,
    location=?, urgency=?, reason=?
    WHERE id=?`,
    [
      requesterName, phone, email,
      bloodGroup, quantity, date,
      location || null, urgency,
      reason || null, req.params.id
    ],
    (err) => {
      if (err) return res.status(500).json({ error: 'Error updating request' });
      res.json({ message: 'Request updated successfully!' });
    }
  );
});

// Delete request
router.delete('/:id', (req, res) => {
  db.query(
    'DELETE FROM requests WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Error deleting request' });
      res.json({ message: 'Request deleted successfully!' });
    }
  );
});

module.exports = router;