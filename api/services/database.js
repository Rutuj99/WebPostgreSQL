const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'todo_db',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});


pool.connect()
  .then(client => {
    console.log("Connected to PostgreSQL successfully!");
    client.release(); // release back to pool
  })
  .catch(err => {
    console.error("PostgreSQL connection error:", err);
  });

module.exports = pool;