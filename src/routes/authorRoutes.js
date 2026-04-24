import express from 'express';
import { AuthorController } from '../controllers/authorController.js';

const router = express.Router();
router.get('/', AuthorController.getAuthors);
router.post('/', AuthorController.addAuthor);
router.delete('/:id', AuthorController.deleteAuthor);
router.put('/:id', AuthorController.updateAuthor);

export default router;