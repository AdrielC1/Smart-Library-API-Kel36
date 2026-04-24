import { pool } from '../config/db.js';

export const MemberModel = {
  async getAll(name) {
    let query = 'SELECT * FROM members';
    const values = [];
    if (name) {
      query += ' WHERE full_name ILIKE $1';
      values.push(`%${name}%`);
    }
    query += ' ORDER BY joined_at DESC';
    const result = await pool.query(query, values);
    return result.rows;
  },

  async create(data) {
    const { full_name, email, member_type } = data;
    const query = `
      INSERT INTO members (full_name, email, member_type) 
      VALUES ($1, $2, $3) RETURNING *
    `;
    const result = await pool.query(query, [full_name, email, member_type]);
    return result.rows[0];
  },

  async delete(id) {
    const query = 'DELETE FROM members WHERE id = $1';
    await pool.query(query, [id]);
    return { message: "Anggota berhasil dihapus dari sistem." };
  },

  async update(id, data) {
    const { full_name, email, member_type } = data;
    const query = `
      UPDATE members 
      SET full_name = $1, email = $2, member_type = $3
      WHERE id = $4
      RETURNING *
    `;
    const result = await pool.query(query, [full_name, email, member_type, id]);
    return result.rows[0];
  }
};