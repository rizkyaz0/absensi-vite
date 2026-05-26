import { DashboardStats } from '../types/common';

export const mockDashboardStats: DashboardStats = {
  total_aset: 30,
  aset_tersedia: 13,
  aset_digunakan: 12,
  aset_perawatan: 2,
  aset_rusak: 1,
  total_nilai_perolehan: 37953500000,
  total_nilai_saat_ini: 34301950000,
  total_kategori: 8,
  total_pegawai_terdaftar: 10,
};

export const mockChartData = {
  assetByStatus: [
    { name: 'Tersedia', value: 13, fill: 'var(--color-chart-2)' },
    { name: 'Digunakan', value: 12, fill: 'var(--color-chart-1)' },
    { name: 'Dalam Perawatan', value: 2, fill: 'var(--color-chart-3)' },
    { name: 'Rusak', value: 1, fill: 'var(--color-chart-4)' },
    { name: 'Dihapus', value: 1, fill: 'var(--color-chart-5)' },
  ],
  assetByCategory: [
    { name: 'Elektronik & Komputer', total: 8, nilai: 124500000 },
    { name: 'Kendaraan', total: 4, nilai: 1487000000 },
    { name: 'Furniture', total: 6, nilai: 59700000 },
    { name: 'Mesin Produksi', total: 5, nilai: 2205000000 },
    { name: 'Infrastruktur', total: 3, nilai: 700000000 },
    { name: 'Alat Medis', total: 2, nilai: 175850000 },
    { name: 'Software', total: 3, nilai: 1425000000 },
    { name: 'Tanah & Bangunan', total: 2, nilai: 30000000000 },
  ],
  monthlyAcquisition: [
    { month: 'Jan', jumlah: 0, nilai: 0 },
    { month: 'Feb', jumlah: 1, nilai: 29000000 },
    { month: 'Mar', jumlah: 1, nilai: 850000 },
    { month: 'Apr', jumlah: 1, nilai: 24000000 },
    { month: 'May', jumlah: 0, nilai: 0 },
    { month: 'Jun', jumlah: 0, nilai: 0 },
    { month: 'Jul', jumlah: 1, nilai: 8500000 },
    { month: 'Aug', jumlah: 0, nilai: 0 },
    { month: 'Sep', jumlah: 3, nilai: 700000000 },
    { month: 'Oct', jumlah: 0, nilai: 0 },
    { month: 'Nov', jumlah: 0, nilai: 0 },
    { month: 'Dec', jumlah: 0, nilai: 0 },
  ],
  maintenanceCost: [
    { month: 'Jan', biaya: 0 },
    { month: 'Feb', biaya: 0 },
    { month: 'Mar', biaya: 0 },
    { month: 'Apr', biaya: 0 },
    { month: 'May', biaya: 0 },
    { month: 'Jun', biaya: 0 },
    { month: 'Jul', biaya: 0 },
    { month: 'Aug', biaya: 0 },
    { month: 'Sep', biaya: 2800000 },
    { month: 'Oct', biaya: 750000 },
    { month: 'Nov', biaya: 13300000 },
    { month: 'Dec', biaya: 17500000 },
  ],
};

export const mockRecentActivities = [
  { id: 1, action: 'Aset Baru Ditambahkan', detail: 'ThinkPad X1 Carbon Gen 11 ditambahkan', time: '2024-04-20T10:00:00Z', type: 'create' },
  { id: 2, action: 'Aset Dihapus', detail: 'Conveyor Belt System dihapus dari sistem', time: '2024-06-01T10:00:00Z', type: 'delete' },
  { id: 3, action: 'Service Selesai', detail: 'Server Dell PowerEdge R750 selesai maintenance', time: '2024-11-16T17:00:00Z', type: 'maintenance' },
  { id: 4, action: 'Assignment Baru', detail: 'Mesin CNC Router 5-Axis dialokasikan ke Agus Wijaya', time: '2024-11-01T08:00:00Z', type: 'assignment' },
  { id: 5, action: 'Pengajuan Procurement', detail: 'Pembelian Furniture Ruang Rapat Baru diajukan', time: '2024-11-20T08:00:00Z', type: 'procurement' },
  { id: 6, action: 'Maintenance Dijadwalkan', detail: 'Penggantian Layar MacBook Pro dijadwalkan 5 Des', time: '2024-11-20T08:00:00Z', type: 'maintenance' },
];
