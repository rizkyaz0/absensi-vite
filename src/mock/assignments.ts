import { Assignment } from '../types/assignment';
import { mockAssets } from './assets';

const pegawai = [
  { nama: 'Budi Santoso', nip: '198507012010011001', departemen: 'Teknologi Informasi' },
  { nama: 'Siti Rahmawati', nip: '199003152012012002', departemen: 'Keuangan' },
  { nama: 'Ahmad Hidayat', nip: '199208202014012003', departemen: 'Teknologi Informasi' },
  { nama: 'Dewi Lestari', nip: '199105052013012004', departemen: 'SDM' },
  { nama: 'Rizky Pratama', nip: '199312122015012005', departemen: 'Teknologi Informasi' },
  { nama: 'Fitri Handayani', nip: '198809122011012006', departemen: 'Pemasaran' },
  { nama: 'Doni Prasetyo', nip: '199406182016012007', departemen: 'Teknologi Informasi' },
  { nama: 'Agus Wijaya', nip: '199511252017012009', departemen: 'Teknologi Informasi' },
  { nama: 'Hendra Gunawan', nip: '199008152014012011', departemen: 'Operasional' },
  { nama: 'Nina Susanti', nip: '199107202015012012', departemen: 'Hukum' },
];

export const mockAssignments: Assignment[] = [
  {
    id: 'ASG-001', asset_id: 'AST-001', asset_nama: 'Laptop Dell Latitude 5540', asset_kode: 'IT-LPT-001',
    pegawai_nama: 'Ahmad Hidayat', pegawai_nip: '199208202014012003', pegawai_departemen: 'Teknologi Informasi',
    tanggal_mulai: '2023-06-20', tanggal_selesai: null, status: 'aktif',
    catatan: 'Laptop utama untuk development', created_at: '2023-06-20T08:00:00Z', updated_at: '2024-12-01T10:00:00Z',
  },
  {
    id: 'ASG-002', asset_id: 'AST-002', asset_nama: 'Desktop Workstation HP Z4', asset_kode: 'IT-DSK-001',
    pegawai_nama: 'Rizky Pratama', pegawai_nip: '199312122015012005', pegawai_departemen: 'Teknologi Informasi',
    tanggal_mulai: '2023-03-15', tanggal_selesai: null, status: 'aktif',
    catatan: 'Workstation untuk desain grafis', created_at: '2023-03-15T08:00:00Z', updated_at: '2024-12-01T10:00:00Z',
  },
  {
    id: 'ASG-003', asset_id: 'AST-004', asset_nama: 'Toyota Innova Zenix Hybrid', asset_kode: 'VHC-MBL-001',
    pegawai_nama: 'Budi Santoso', pegawai_nip: '198507012010011001', pegawai_departemen: 'Teknologi Informasi',
    tanggal_mulai: '2024-01-10', tanggal_selesai: null, status: 'aktif',
    catatan: 'Mobil dinas untuk Direktur IT', created_at: '2024-01-10T08:00:00Z', updated_at: '2024-12-01T10:00:00Z',
  },
  {
    id: 'ASG-004', asset_id: 'AST-005', asset_nama: 'Honda Vario 160', asset_kode: 'VHC-MTR-001',
    pegawai_nama: 'Hendra Gunawan', pegawai_nip: '199008152014012011', pegawai_departemen: 'Operasional',
    tanggal_mulai: '2022-08-20', tanggal_selesai: '2024-11-20', status: 'dikembalikan',
    catatan: 'Motor operasional kurir - dikembalikan karena mutasi', created_at: '2022-08-20T08:00:00Z', updated_at: '2024-11-20T10:00:00Z',
  },
  {
    id: 'ASG-005', asset_id: 'AST-006', asset_nama: 'Meja Kerja Eksekutif', asset_kode: 'FRN-MJA-001',
    pegawai_nama: 'Budi Santoso', pegawai_nip: '198507012010011001', pegawai_departemen: 'Teknologi Informasi',
    tanggal_mulai: '2022-01-15', tanggal_selesai: null, status: 'aktif',
    catatan: 'Meja kerja di ruang direktur', created_at: '2022-01-15T08:00:00Z', updated_at: '2024-06-01T10:00:00Z',
  },
  {
    id: 'ASG-006', asset_id: 'AST-010', asset_nama: 'Server Dell PowerEdge R750', asset_kode: 'INF-SRV-001',
    pegawai_nama: 'Doni Prasetyo', pegawai_nip: '199406182016012007', pegawai_departemen: 'Teknologi Informasi',
    tanggal_mulai: '2023-09-05', tanggal_selesai: null, status: 'aktif',
    catatan: 'Tanggung jawab admin server', created_at: '2023-09-05T08:00:00Z', updated_at: '2024-12-01T10:00:00Z',
  },
  {
    id: 'ASG-007', asset_id: 'AST-013', asset_nama: 'Lisensi SAP S/4HANA', asset_kode: 'LIC-ERP-001',
    pegawai_nama: 'Siti Rahmawati', pegawai_nip: '199003152012012002', pegawai_departemen: 'Keuangan',
    tanggal_mulai: '2024-01-10', tanggal_selesai: null, status: 'aktif',
    catatan: 'Admin utama sistem ERP', created_at: '2024-01-10T08:00:00Z', updated_at: '2024-12-01T10:00:00Z',
  },
  {
    id: 'ASG-008', asset_id: 'AST-019', asset_nama: 'Scanner Dokumen Fujitsu fi-8000', asset_kode: 'IT-SCN-001',
    pegawai_nama: 'Dewi Lestari', pegawai_nip: '199105052013012004', pegawai_departemen: 'SDM',
    tanggal_mulai: '2023-04-15', tanggal_selesai: null, status: 'aktif',
    catatan: 'Scanner untuk arsip kepegawaian', created_at: '2023-04-15T08:00:00Z', updated_at: '2024-12-01T10:00:00Z',
  },
  {
    id: 'ASG-009', asset_id: 'AST-020', asset_nama: 'Firewall Fortinet FortiGate 200F', asset_kode: 'INF-FWL-001',
    pegawai_nama: 'Agus Wijaya', pegawai_nip: '199511252017012009', pegawai_departemen: 'Teknologi Informasi',
    tanggal_mulai: '2023-09-10', tanggal_selesai: null, status: 'aktif',
    catatan: 'Admin keamanan jaringan', created_at: '2023-09-10T08:00:00Z', updated_at: '2024-12-01T10:00:00Z',
  },
  {
    id: 'ASG-010', asset_id: 'AST-027', asset_nama: 'Monitor Dell UltraSharp 32" 4K', asset_kode: 'IT-MON-001',
    pegawai_nama: 'Ahmad Hidayat', pegawai_nip: '199208202014012003', pegawai_departemen: 'Teknologi Informasi',
    tanggal_mulai: '2023-06-20', tanggal_selesai: null, status: 'aktif',
    catatan: 'Monitor untuk developer', created_at: '2023-06-20T08:00:00Z', updated_at: '2024-12-01T10:00:00Z',
  },
  {
    id: 'ASG-011', asset_id: 'AST-008', asset_nama: 'Mesin CNC Router 5-Axis', asset_kode: 'MCH-CNC-001',
    pegawai_nama: 'Agus Wijaya', pegawai_nip: '199511252017012009', pegawai_departemen: 'Teknologi Informasi',
    tanggal_mulai: '2024-11-01', tanggal_selesai: null, status: 'aktif',
    catatan: 'Operator mesin CNC', created_at: '2024-11-01T08:00:00Z', updated_at: '2024-12-01T10:00:00Z',
  },
  {
    id: 'ASG-012', asset_id: 'AST-015', asset_nama: 'MacBook Pro M3 14"', asset_kode: 'IT-LPT-002',
    pegawai_nama: 'Budi Santoso', pegawai_nip: '198507012010011001', pegawai_departemen: 'Teknologi Informasi',
    tanggal_mulai: '2024-02-05', tanggal_selesai: '2024-11-01', status: 'dialihkan',
    catatan: 'Dialihkan karena kerusakan layar', created_at: '2024-02-05T08:00:00Z', updated_at: '2024-11-01T10:00:00Z',
  },
];
