import { LoanModel } from '../models/loanModel.js';

export const LoanController = {
  async createLoan(req, res) {
    const { book_id, member_id, due_date } = req.body;
    try {
      const loan = await LoanModel.createLoan(book_id, member_id, due_date);
      res.status(201).json({
        message: "Peminjaman berhasil dicatat!",
        data: loan
      });
    } catch (err) {
      // Jika stok habis atau ID salah, kirim status 400 (Bad Request)
      res.status(400).json({ error: err.message });
    }
  },

  async getLoans(req, res) {
    try {
      const loans = await LoanModel.getAllLoans();
      res.json(loans);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async returnLoan(req, res) {
    try {
      // Ambil loan_id dari form / request body
      const { loan_id } = req.body;
      if (!loan_id) {
        return res.status(400).json({ error: "loan_id perlu disertakan" });
      }

      const returnedLoan = await LoanModel.returnLoan(loan_id);
      res.status(200).json({
        message: "Buku berhasil dikembalikan!",
        data: returnedLoan
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
