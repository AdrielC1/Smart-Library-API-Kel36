import { MemberModel } from '../models/memberModel.js';

export const MemberController = {
  // Mendapatkan semua daftar anggota (dengan fitur pencarian)
  async getAllMembers(req, res) {
    try {
      const name = req.query.name || Object.keys(req.query)[0];
      const members = await MemberModel.getAll(name);

      if (members.length === 0) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }

      res.json(members);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Mendaftarkan anggota baru
  async registerMember(req, res) {
    try {
      const newMember = await MemberModel.create(req.body);
      res.status(201).json({
        message: "Anggota berhasil didaftarkan!",
        data: newMember
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Menghapus anggota
  async deleteMember(req, res) {
    try {
      const { id } = req.params;
      const result = await MemberModel.delete(id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Memperbarui data anggota
  async updateMember(req, res) {
    try {
      const { id } = req.params;
      const updatedMember = await MemberModel.update(id, req.body);

      if (!updatedMember) {
        return res.status(404).json({ error: "Anggota tidak ditemukan" });
      }

      res.json({
        message: "Anggota berhasil diperbarui",
        data: updatedMember
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};