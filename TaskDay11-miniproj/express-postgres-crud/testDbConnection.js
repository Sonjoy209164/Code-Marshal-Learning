import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ DB Connected:', res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('❌ DB Connection failed:', err.message);
    process.exit(1);
  }
})();
