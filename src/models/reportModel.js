import { pool } from '../config/db.js';

export const ReportModel = {
    async getStats() {

        const queries = [
            pool.query('SELECT COUNT(*) FROM books'),
            pool.query('SELECT COUNT(*) FROM authors'),
            pool.query('SELECT COUNT(*) FROM categories'),
            pool.query("SELECT COUNT(*) FROM loans WHERE status = 'BORROWED'")
        ];

        const [books, authors, categories, borrowed] = await Promise.all(queries);

        return {
            total_books: parseInt(books.rows[0].count),
            total_authors: parseInt(authors.rows[0].count),
            total_categories: parseInt(categories.rows[0].count),
            total_active_borrowings: parseInt(borrowed.rows[0].count)
        };
    }
};