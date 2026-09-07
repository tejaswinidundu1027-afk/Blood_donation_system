const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tejume1027@15',
  database: 'bloodserve'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL Connection Error:', err.message);
    process.exit(1);
  }
  console.log('✅ MySQL Connected!');
});

module.exports = db;