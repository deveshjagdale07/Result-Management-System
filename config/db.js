const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection pool to PostgreSQL using environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432, // Use 5432 as default for PostgreSQL
});

// Test the connection pool
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err.code); // Log the error code for debugging
    console.error('Error connecting to PostgreSQL:', err.message); // Log the error message for debugging
    return;
  }
  console.log('Connected to PostgreSQL database!');
  release(); // Release the client back to the pool
});

// Export the pool for use in other parts of the application
module.exports = pool;
