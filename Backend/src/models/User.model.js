import pool from "../config/db.js";

export const createUser = async (name, email, password, role) => {
  const res = await pool.query(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1,$2,$3,$4)
     RETURNING id,name,email,role`,
    [name, email, password, role]
  );
  return res.rows[0];
};

export const findUserByEmail = async (email) => {
  const res = await pool.query(
    `SELECT * FROM users WHERE email=$1`,
    [email]
  );
  return res.rows[0];
};

export const getAllUsers = async () => {
  const res = await pool.query(
    `SELECT id,name,email,role FROM users`
  );
  return res.rows;
};

export const deleteUserById = async (id) => {
  await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
};
