const mysql = require('mysql');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection to MySQL using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME ,
  ssl: { rejectUnauthorized: false } // Optional, if Render requires SSL for MySQL
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
