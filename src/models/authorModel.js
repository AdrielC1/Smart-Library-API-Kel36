import { pool } from '../config/db.js';

export const AuthorModel = {
  async getAll(name) {
    let query = 'SELECT * FROM authors';
    const values = [];
    if (name) {
      query += ' WHERE name ILIKE $1';
      values.push(`%${name}%`);
    }
    query += ' ORDER BY name ASC';
    const result = await pool.query(query, values);
    return result.rows;
  },
  async create(name, nationality) {
    const query = 'INSERT INTO authors (name, nationality) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [name, nationality]);
    return result.rows[0];
  }
};