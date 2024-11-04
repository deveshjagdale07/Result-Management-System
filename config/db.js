const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

// Log the environment variables for debugging (remove in production)
//console.log('DB_HOST:', process.env.DB_HOST);
//console.log('DB_USER:', process.env.DB_USER);
//console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
//console.log('DB_NAME:', process.env.DB_NAME);
//console.log('DB_PORT:', process.env.DB_PORT);

// Create a connection to MySQL using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306 // Use 3306 as default if not set
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.code); // Log the error code for debugging
    console.error('Error connecting to MySQL:', err.message); // Log the error message for debugging
    return;
  }
  console.log('Connected to MySQL database!');
});

module.exports = db;
