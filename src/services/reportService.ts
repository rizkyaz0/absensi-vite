import { mockDashboardStats, mockChartData, mockRecentActivities } from '../mock/dashboard';
import { mockAssets } from '../mock/assets';
import { assetService } from './assetService';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const reportService = {
  async getDashboardStats() {
    await delay(200);
    const summary = await assetService.getSummary();
    return { ...summary, total_kategori: 8, total_pegawai_terdaftar: 10 };
  },

  async getChartData() {
    await delay(200);
    return mockChartData;
  },

  async getRecentActivities() {
    await delay(150);
    return mockRecentActivities;
  },

  async getDepreciationReport() {
    await delay(300);
    return mockAssets
      .filter((a) => a.status !== 'dihapus')
      .map((a) => ({
        id: a.id,
        kode: a.kode,
        nama: a.nama,
        nilai_perolehan: a.nilai_perolehan,
        nilai_saat_ini: a.nilai_saat_ini,
        depresiasi_per_tahun: a.depresiasi_per_tahun,
        masa_manfaat: a.masa_manfaat,
        tanggal_perolehan: a.tanggal_perolehan,
        sisa_manfaat: Math.max(0, a.masa_manfaat - Math.floor(
          (Date.now() - new Date(a.tanggal_perolehan).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
        )),
      }))
      .sort((a, b) => a.nilai_saat_ini - b.nilai_saat_ini);
  },

  async getMaintenanceReport(tahun: number = 2024) {
    await delay(300);
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      bulan: i + 1,
      jumlah: 0,
      total_biaya: 0,
    }));

    // Simplified - return summary
    return {
      tahun,
      total_maintenance: 12,
      total_biaya: 67250000,
      monthly: monthlyData,
    };
  },
};
