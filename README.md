# 🩸 Blood Donation System

A web-based **Blood Donation Management System** designed to connect blood donors with people who need blood and help manage blood donation requests and blood bank information efficiently.

The system provides separate frontend and backend components with a MySQL database for storing users, donor details, blood requests, and blood bank information.

---

## 📌 Project Overview

Finding the required blood group during an emergency can be difficult and time-consuming.

The **Blood Donation System** provides a centralized platform where users can:

* Register and log in
* Register as blood donors
* View available donors
* Search blood-related information
* Submit blood requests
* View blood requests
* Find blood banks
* Check blood availability
* Manage information through an admin interface

The backend provides APIs for handling the application's data, while the frontend provides a user-friendly web interface.

---

## 🎯 Objectives

* Make blood donation information easily accessible.
* Connect blood donors with people who need blood.
* Help users find suitable blood groups.
* Manage blood requests efficiently.
* Provide blood bank availability information.
* Maintain donor and request records in a centralized database.
* Reduce the time required to find blood during emergencies.

---

## ✨ Features

### 👤 User Features

* User registration
* User login
* Donor registration
* Donor information management
* View available donors
* Blood request submission
* View blood requests
* Blood bank information
* Blood availability information
* Educational information about blood donation

### 🩸 Donor Management

Donors can provide information such as:

* Name
* Age
* Blood group
* Location
* Contact information
* Email
* Last donation date
* Medical conditions

These details are stored in the database for managing donor information.

### 🚨 Blood Requests

Users can create blood requests by specifying:

* Required blood group
* Hospital
* Urgency
* Required quantity

Urgency levels include:

* Normal
* Urgent
* Critical

### 🏥 Blood Bank Management

The system stores blood bank information including:

* Hospital/Blood bank name
* Location
* City
* Phone number
* Blood group
* Available units

This allows users to check blood availability at registered blood banks.

### 👨‍💼 Admin

The project includes an admin interface for managing system information and records.

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Development Tools

* Visual Studio Code
* Git
* GitHub
* MySQL / MySQL Workbench

---

## 🏗️ System Architecture

```text
                ┌──────────────────────┐
                │       User           │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │      Frontend        │
                │ HTML + CSS + JS      │
                └──────────┬───────────┘
                           │
                           │ API Requests
                           ▼
                ┌──────────────────────┐
                │       Backend        │
                │ Node.js + Express.js │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │       MySQL          │
                │      Database        │
                └──────────────────────┘
```

---

## 📁 Project Structure

```text
Blood_donation_system/
│
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── Frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── register.html
│   ├── user.html
│   ├── donors.html
│   ├── add_donor.html
│   ├── requests.html
│   ├── add_request.html
│   ├── blood_banks.html
│   ├── admin.html
│   ├── learn.html
│   └── mission.html
│
├── database.sql
│
└── README.md
```

The repository currently separates the application into `Frontend` and `Backend` directories and includes a `database.sql` file for the MySQL database setup.

---

## 🗄️ Database

The project uses a MySQL database named:

```text
bloodserve
```

The database contains tables for:

* Users
* Donors
* Blood Requests
* Blood Banks

The donor records contain information such as blood group, location, contact details, last donation date, and medical conditions. Blood requests contain the required blood group, hospital, urgency, and quantity.

