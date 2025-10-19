// src/models/userModel.js
import pool from '../config/db.js';

/**
 * Data access functions for 'users' table.
 * All functions return either rows / row[0] or null.
 */

export async function findAllUsers() {
  const res = await pool.query('SELECT id, name, email, created_at, updated_at FROM users ORDER BY id ASC');
  return res.rows;
}

export async function findUserById(id) {
  const res = await pool.query('SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1', [id]);
  return res.rows[0] || null;
}

export async function createUser({ name, email }) {
  const res = await pool.query(
    `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email, created_at, updated_at`,
    [name, email]
  );
  return res.rows[0];
}

export async function updateUserById(id, { name, email }) {
  const res = await pool.query(
    `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at, updated_at`,
    [name, email, id]
  );
  return res.rows[0] || null;
}

export async function deleteUserById(id) {
  const res = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING id, name, email, created_at, updated_at`, [id]);
  return res.rows[0] || null;
}
