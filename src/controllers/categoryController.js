import { CategoryModel } from '../models/categoryModel.js';

export const CategoryController = {
  async getCategories(req, res) {
    try {
      const name = req.query.name || Object.keys(req.query)[0];
      const categories = await CategoryModel.getAll(name);

      if (categories.length === 0) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }

      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async addCategory(req, res) {
    try {
      const category = await CategoryModel.create(req.body.name);
      res.status(201).json(category);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};