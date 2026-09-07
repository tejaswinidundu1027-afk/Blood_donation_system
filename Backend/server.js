const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const authRoutes = require('./routes/auth');
const donorRoutes = require('./routes/donors');
const requestRoutes = require('./routes/requests');
const bloodBankRoutes = require('./routes/bloodbanks');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ===== STATIC FILES =====
app.use(express.static('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend'));

// ===== API ROUTES =====
app.use('/auth', authRoutes);
app.use('/donors', donorRoutes);
app.use('/requests', requestRoutes);
app.use('/bloodbanks', bloodBankRoutes);

// ===== PAGE ROUTES =====
app.get('/', (req, res) => {
  res.sendFile('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend/index.html');
});

app.get('/register', (req, res) => {
  res.sendFile('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend/register.html');
});

app.get('/admin', (req, res) => {
  res.sendFile('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend/admin.html');
});

app.get('/admin-page', (req, res) => {
  res.sendFile('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend/donors.html');
});

app.get('/add', (req, res) => {
  res.sendFile('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend/add_donor.html');
});

app.get('/request', (req, res) => {
  res.sendFile('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend/requests.html');
});

app.get('/add-request', (req, res) => {
  res.sendFile('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend/add_request.html');
});

app.get('/user-page', (req, res) => {
  res.sendFile('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend/user.html');
});

app.get('/learn', (req, res) => {
  res.sendFile('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend/learn.html');
});

app.get('/mission', (req, res) => {
  res.sendFile('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend/mission.html');
});
// Blood banks route
app.get('/blood-banks', (req, res) => {
  res.sendFile('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend/blood_banks.html');
});

// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).sendFile('C:/Users/dell/OneDrive/Desktop/blood_donation_system/Frontend/index.html');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});