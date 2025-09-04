const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
   user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'todo_db',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});



async function runMigrations() {
  try {
    const files = [
  'tables/todo_master.sql',
  'functions/fo_get_todo_masterdata_list.sql',
  'functions/fo_insert_update_delete_todomasterdata.sql'
];

for (let file of files) {
  const query = fs.readFileSync(path.join(__dirname, file), 'utf8'); 
  await pool.query(query);
  console.log(`${file} executed`);
}

    console.log("Database setup complete");
    pool.end();
  } catch (err) {
    console.error("Error running migrations:", err);
  }
}

runMigrations();
