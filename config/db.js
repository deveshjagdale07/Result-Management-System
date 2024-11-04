const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection pool to MySQL using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Use 3306 as default if not set
});

// Test the connection pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.code); // Log the error code for debugging
    console.error('Error connecting to MySQL:', err.message); // Log the error message for debugging
    return;
  }
  console.log('Connected to MySQL database!');
  connection.release(); // Release the connection back to the pool
});

module.exports = pool;
