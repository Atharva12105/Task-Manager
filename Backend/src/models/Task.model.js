import pool from "../config/db.js";

export const createTask = async (task) => {
  const { title, description, status, priority, userId } = task;
  const res = await pool.query(
    `INSERT INTO tasks (title, description, status, priority, user_id)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [title, description, status, priority, userId]
  );
  return res.rows[0];
};

export const getTasksByUser = async (userId) => {
    const res = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    return res.rows;
  };

  export const getAllTasks = async () => {
    const res = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    return res.rows;
  };

export const getTaskById = async (id) => {
  const res = await pool.query(
    `SELECT * FROM tasks WHERE id=$1`,
    [id]
  );
  return res.rows[0];
};

export const updateTask = async (id, data) => {
  const { title, description, status, priority } = data;
  const res = await pool.query(
    `UPDATE tasks SET title=$1, description=$2, status=$3, priority=$4
     WHERE id=$5 RETURNING *`,
    [title, description, status, priority, id]
  );
  return res.rows[0];
};

export const deleteTask = async (id) => {
  await pool.query(`DELETE FROM tasks WHERE id=$1`, [id]);
};
