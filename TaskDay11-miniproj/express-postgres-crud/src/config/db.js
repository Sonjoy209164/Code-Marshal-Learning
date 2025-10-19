// src/config/db.js - pg pool
import pkg from 'pg';
import { DATABASE_URL } from './config.js';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: DATABASE_URL,
  // optionally add ssl and other config for production
});

pool.on('error', (err) => {
  console.error('Unexpected PG client error', err);
  process.exit(-1);
});

export default pool;
