import { ReportModel } from '../models/reportModel.js';

export const ReportController = {
    async getStatistics(req, res) {
        try {
            const stats = await ReportModel.getStats();
            res.json({
                status: "success",
                message: "Statistik perpustakaan berhasil diambil",
                data: stats
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};