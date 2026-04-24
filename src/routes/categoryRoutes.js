import express from 'express';
import { CategoryController } from '../controllers/categoryController.js';

const router = express.Router();
router.get('/', CategoryController.getCategories);
router.post('/', CategoryController.addCategory);
router.delete('/:id', CategoryController.deleteCategory);
router.put('/:id', CategoryController.updateCategory);

export default router;