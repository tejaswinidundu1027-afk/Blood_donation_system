const db = require('../db');

// Get all donors
const getAll = (callback) => {
  db.query(
    'SELECT * FROM donors ORDER BY created_at DESC',
    callback
  );
};

// Get donor by ID
const getById = (id, callback) => {
  db.query(
    'SELECT * FROM donors WHERE id = ?',
    [id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    }
  );
};

// Create new donor
const create = (data, callback) => {
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
  } = data;

  db.query(
    `INSERT INTO donors 
    (name, email, gender, phone, age, bloodGroup, address, lastDonationDate, medicalConditions) 
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
    callback
  );
};

// Update donor
const update = (id, data, callback) => {
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
  } = data;

  db.query(
    `UPDATE donors SET 
    name=?, email=?, gender=?, phone=?, age=?, 
    bloodGroup=?, address=?, lastDonationDate=?, medicalConditions=? 
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
      id
    ],
    callback
  );
};

// Delete donor
const deleteDonor = (id, callback) => {
  db.query(
    'DELETE FROM donors WHERE id = ?',
    [id],
    callback
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteDonor
};