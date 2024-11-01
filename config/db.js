const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection to MySQL using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '04082004@DJj',
  database: process.env.DB_NAME || 'studentresultmanagementDB'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = db;
