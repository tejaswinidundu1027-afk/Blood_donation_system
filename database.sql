-- Create database
CREATE DATABASE IF NOT EXISTS bloodserve;
USE bloodserve;

-- Users table (for login/register)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donors table
CREATE TABLE IF NOT EXISTS donors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  blood_group VARCHAR(10) NOT NULL,
  location VARCHAR(100) NOT NULL,
  contact VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Requests table
CREATE TABLE IF NOT EXISTS requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  blood_group VARCHAR(10) NOT NULL,
  hospital VARCHAR(150) NOT NULL,
  urgency ENUM('Normal','Critical') NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example donor data (limit 50 for testing)
INSERT INTO donors (name, age, blood_group, location, contact, email) VALUES
('Ravi Kumar', 30, 'A+', 'Visakhapatnam', '9876543210', 'ravi@example.com'),
('Sita Devi', 28, 'B+', 'Hyderabad', '9876543211', 'sita@example.com'),
('Arjun Reddy', 35, 'O+', 'Chennai', '9876543212', 'arjun@example.com'),
('Meena Sharma', 40, 'AB+', 'Delhi', '9876543213', 'meena@example.com');

-- Example request data (limit 50 for testing)
INSERT INTO requests (patient_name, blood_group, hospital, urgency, quantity) VALUES
('Hospital A', 'A+', 'Apollo Hospital', 'Normal', 2),
('Hospital B', 'B+', 'Care Hospital', 'Critical', 3),
('Hospital C', 'O+', 'KIMS Hospital', 'Normal', 1),
('Hospital D', 'AB+', 'AIIMS Delhi', 'Critical', 4);
ALTER TABLE donors 
ADD COLUMN lastDonationDate DATE,
ADD COLUMN medicalConditions TEXT;
ALTER TABLE requests
ADD COLUMN urgency ENUM('Normal','Urgent','Critical') DEFAULT 'Normal';


CREATE TABLE IF NOT EXISTS blood_banks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hospital_name VARCHAR(200) NOT NULL,
  location VARCHAR(200) NOT NULL,
  city VARCHAR(100) NOT NULL,
  phone VARCHAR(15),
  blood_group ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-') NOT NULL,
  units_available INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO blood_banks (hospital_name, location, city, phone, blood_group, units_available)
VALUES
('Apollo Hospital', 'Jubilee Hills', 'Hyderabad', '9876543210', 'A+', 15),
('Apollo Hospital', 'Jubilee Hills', 'Hyderabad', '9876543210', 'B+', 10),
('Apollo Hospital', 'Jubilee Hills', 'Hyderabad', '9876543210', 'O+', 20),
('Apollo Hospital', 'Jubilee Hills', 'Hyderabad', '9876543210', 'AB+', 5),
('KIMS Hospital', 'Secunderabad', 'Hyderabad', '8765432109', 'A+', 8),
('KIMS Hospital', 'Secunderabad', 'Hyderabad', '8765432109', 'B-', 6),
('KIMS Hospital', 'Secunderabad', 'Hyderabad', '8765432109', 'O-', 12),
('Care Hospital', 'Banjara Hills', 'Hyderabad', '7654321098', 'A-', 4),
('Care Hospital', 'Banjara Hills', 'Hyderabad', '7654321098', 'AB-', 3),
('Care Hospital', 'Banjara Hills', 'Hyderabad', '7654321098', 'O+', 9),
('Government Hospital', 'MG Road', 'Vijayawada', '6543210987', 'A+', 11),
('Government Hospital', 'MG Road', 'Vijayawada', '6543210987', 'B+', 7),
('Government Hospital', 'MG Road', 'Vijayawada', '6543210987', 'O+', 14),
('Manipal Hospital', 'Dwarka Nagar', 'Vizag', '9988776655', 'A+', 6),
('Manipal Hospital', 'Dwarka Nagar', 'Vizag', '9988776655', 'AB+', 4),
('Manipal Hospital', 'Dwarka Nagar', 'Vizag', '9988776655', 'O-', 8);


CREATE TABLE IF NOT EXISTS donor_matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  request_id INT NOT NULL,
  donor_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE,
  FOREIGN KEY (donor_id) REFERENCES donors(id) ON DELETE CASCADE
);