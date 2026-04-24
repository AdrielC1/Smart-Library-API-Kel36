import { BookModel } from '../models/bookModel.js';

export const BookController = {
  async getAllBooks(req, res) {
    try {
      const title = req.query.title || Object.keys(req.query)[0];
      const books = await BookModel.getAll(title);

      if (books.length === 0) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }

      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async createBook(req, res) {
    try {
      const newBook = await BookModel.create(req.body);
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deleteBook(req, res) {
    try {
      const { id } = req.params;

      const result = await BookModel.delete(id);

      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const updatedBook = await BookModel.update(id, req.body);

      if (!updatedBook) {
        return res.status(404).json({ error: "Buku tidak ditemukan" });
      }

      res.json({
        message: "Buku berhasil diperbarui",
        data: updatedBook
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
