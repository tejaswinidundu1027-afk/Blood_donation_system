const db = require('../db');

// Get all requests
const getAll = (callback) => {
  db.query(
    'SELECT * FROM requests ORDER BY created_at DESC',
    callback
  );
};

// Get request by ID
const getById = (id, callback) => {
  db.query(
    'SELECT * FROM requests WHERE id = ?',
    [id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    }
  );
};

// Create new request
const create = (data, callback) => {
  const {
    requesterName,
    phone,
    email,
    bloodGroup,
    quantity,
    date,
    location,
    patientName,
    urgency,
    reason
  } = data;

  db.query(
    `INSERT INTO requests 
    (requesterName, phone, email, bloodGroup, quantity, date, 
    location, patientName, urgency, reason) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      requesterName,
      phone,
      email,
      bloodGroup,
      quantity,
      date,
      location || null,
      patientName || null,
      urgency,
      reason || null
    ],
    callback
  );
};

// Update request
const update = (id, data, callback) => {
  const {
    requesterName,
    phone,
    email,
    bloodGroup,
    quantity,
    date,
    location,
    patientName,
    urgency,
    reason
  } = data;

  db.query(
    `UPDATE requests SET 
    requesterName=?, phone=?, email=?, bloodGroup=?, 
    quantity=?, date=?, location=?, patientName=?, 
    urgency=?, reason=? 
    WHERE id=?`,
    [
      requesterName,
      phone,
      email,
      bloodGroup,
      quantity,
      date,
      location || null,
      patientName || null,
      urgency,
      reason || null,
      id
    ],
    callback
  );
};

// Delete request
const deleteRequest = (id, callback) => {
  db.query(
    'DELETE FROM requests WHERE id = ?',
    [id],
    callback
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteRequest
};