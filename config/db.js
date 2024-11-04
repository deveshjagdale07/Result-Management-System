const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection pool to PostgreSQL using environment variables
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

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
