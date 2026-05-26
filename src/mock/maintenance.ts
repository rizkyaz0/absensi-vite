import { MaintenanceRecord } from '../types/maintenance';
import { mockAssets } from './assets';

export const mockMaintenance: MaintenanceRecord[] = [
  {
    id: 'MTN-001', asset_id: 'AST-008', asset_nama: 'Mesin CNC Router 5-Axis', asset_kode: 'MCH-CNC-001',
    tipe: 'rutin', judul: 'Servis Rutin Bulanan Mesin CNC', deskripsi: 'Pelumasan, pengecekan spindle, kalibrasi sumbu',
    status: 'berlangsung', tanggal_mulai: '2024-12-01', tanggal_selesai: null,
    biaya: 2500000, vendor: 'Haas Service Indonesia', petugas: 'Teknisi Budi', catatan: 'Servis rutin bulan Desember',
    created_at: '2024-12-01T08:00:00Z', updated_at: '2024-12-01T08:00:00Z',
  },
  {
    id: 'MTN-002', asset_id: 'AST-016', asset_nama: 'Toyota Hiace Commuter', asset_kode: 'VHC-MBL-002',
    tipe: 'rutin', judul: 'Service 20.000 KM Hiace', deskripsi: 'Ganti oli, filter, rotasi ban, tune-up',
    status: 'berlangsung', tanggal_mulai: '2024-11-25', tanggal_selesai: null,
    biaya: 3500000, vendor: 'Auto2000 BSD', petugas: 'Mekanik Agus', catatan: 'Service berkala 20.000 KM',
    created_at: '2024-11-25T08:00:00Z', updated_at: '2024-11-25T08:00:00Z',
  },
  {
    id: 'MTN-003', asset_id: 'AST-010', asset_nama: 'Server Dell PowerEdge R750', asset_kode: 'INF-SRV-001',
    tipe: 'rutin', judul: 'Pembersihan Server & Pengecekan RAID', deskripsi: 'Pembersihan debu, pengecekan RAID array, update firmware',
    status: 'selesai', tanggal_mulai: '2024-11-15', tanggal_selesai: '2024-11-16',
    biaya: 5000000, vendor: 'Dell EMC Support', petugas: 'Admin Doni', catatan: 'Tidak ada masalah, semua komponen OK',
    created_at: '2024-11-15T08:00:00Z', updated_at: '2024-11-16T17:00:00Z',
  },
  {
    id: 'MTN-004', asset_id: 'AST-015', asset_nama: 'MacBook Pro M3 14"', asset_kode: 'IT-LPT-002',
    tipe: 'perbaikan', judul: 'Penggantian Layar MacBook Pro', deskripsi: 'Layar retak akibat terjatuh, perlu penggantian display assembly',
    status: 'dijadwalkan', tanggal_mulai: '2024-12-05', tanggal_selesai: null,
    biaya: 7000000, vendor: 'Apple Authorized Service', petugas: 'Teknisi Apple', catatan: 'Menunggu kedatangan sparepart',
    created_at: '2024-11-20T08:00:00Z', updated_at: '2024-11-20T08:00:00Z',
  },
  {
    id: 'MTN-005', asset_id: 'AST-009', asset_nama: 'Generator Diesel 100 KVA', asset_kode: 'MCH-GEN-001',
    tipe: 'rutin', judul: 'Servis Generator Bulanan', deskripsi: 'Ganti oli, filter solar, pengecekan ATS, test running',
    status: 'selesai', tanggal_mulai: '2024-11-01', tanggal_selesai: '2024-11-01',
    biaya: 1800000, vendor: 'Perkins Power Service', petugas: 'Teknisi Hendra', catatan: 'Generator berfungsi normal',
    created_at: '2024-11-01T08:00:00Z', updated_at: '2024-11-01T17:00:00Z',
  },
  {
    id: 'MTN-006', asset_id: 'AST-024', asset_nama: 'Mesin AC Central Chiller', asset_kode: 'MCH-ACM-001',
    tipe: 'rutin', judul: 'Maintenance AC Central Q4 2024', deskripsi: 'Pembersihan cooling tower, pengecekan freon, overhaul kompresor',
    status: 'dijadwalkan', tanggal_mulai: '2024-12-15', tanggal_selesai: null,
    biaya: 15000000, vendor: 'Daikin Service Center', petugas: 'Tim Teknisi AC', catatan: 'Maintenance kuartal 4',
    created_at: '2024-11-25T08:00:00Z', updated_at: '2024-11-25T08:00:00Z',
  },
  {
    id: 'MTN-007', asset_id: 'AST-001', asset_nama: 'Laptop Dell Latitude 5540', asset_kode: 'IT-LPT-001',
    tipe: 'perbaikan', judul: 'Perbaikan Keyboard Laptop', deskripsi: 'Beberapa tombol keyboard tidak berfungsi',
    status: 'selesai', tanggal_mulai: '2024-10-10', tanggal_selesai: '2024-10-12',
    biaya: 750000, vendor: 'Dell Service Center', petugas: 'Teknisi Dell', catatan: 'Keyboard diganti baru',
    created_at: '2024-10-10T08:00:00Z', updated_at: '2024-10-12T17:00:00Z',
  },
  {
    id: 'MTN-008', asset_id: 'AST-004', asset_nama: 'Toyota Innova Zenix Hybrid', asset_kode: 'VHC-MBL-001',
    tipe: 'rutin', judul: 'Service 10.000 KM Innova Zenix', deskripsi: 'Ganti oli mesin, filter oli, rotasi ban, check hybrid battery',
    status: 'selesai', tanggal_mulai: '2024-09-15', tanggal_selesai: '2024-09-15',
    biaya: 2800000, vendor: 'Auto2000 BSD', petugas: 'Mekanik Agus', catatan: 'Kondisi baterai hybrid 98%',
    created_at: '2024-09-15T08:00:00Z', updated_at: '2024-09-15T17:00:00Z',
  },
  {
    id: 'MTN-009', asset_id: 'AST-011', asset_nama: 'Switch Cisco Catalyst 9300', asset_kode: 'INF-SWT-001',
    tipe: 'darurat', judul: 'Perbaikan Port Switch Rusak', deskripsi: 'Port 45-48 tidak berfungsi, kemungkinan kerusakan hardware',
    status: 'selesai', tanggal_mulai: '2024-11-10', tanggal_selesai: '2024-11-10',
    biaya: 3500000, vendor: 'Cisco TAC Support', petugas: 'Admin Agus', catatan: 'Firmware update dan reset konfigurasi, port berfungsi kembali',
    created_at: '2024-11-10T08:00:00Z', updated_at: '2024-11-10T17:00:00Z',
  },
  {
    id: 'MTN-010', asset_id: 'AST-028', asset_nama: 'Gudang Logistik Cakung', asset_kode: 'BLD-GDG-002',
    tipe: 'perbaikan', judul: 'Perbaikan Atap Bocor Gudang', deskripsi: 'Atap gudang bagian timur bocor akibat cuaca ekstrem',
    status: 'dijadwalkan', tanggal_mulai: '2024-12-10', tanggal_selesai: null,
    biaya: 25000000, vendor: 'PT Konstruksi Mandiri', petugas: 'Tim Kontraktor', catatan: 'Menunggu persetujuan budget repair',
    created_at: '2024-11-28T08:00:00Z', updated_at: '2024-11-28T08:00:00Z',
  },
  {
    id: 'MTN-011', asset_id: 'AST-020', asset_nama: 'Firewall Fortinet FortiGate 200F', asset_kode: 'INF-FWL-001',
    tipe: 'rutin', judul: 'Update Firmware & Patch Security FortiGate', deskripsi: 'Update ke FortiOS 7.4.x terbaru, patch security vulnerabilities',
    status: 'selesai', tanggal_mulai: '2024-11-05', tanggal_selesai: '2024-11-06',
    biaya: 0, vendor: 'Internal', petugas: 'Admin Agus', catatan: 'Update berhasil, tidak ada gangguan jaringan',
    created_at: '2024-11-05T08:00:00Z', updated_at: '2024-11-06T17:00:00Z',
  },
  {
    id: 'MTN-012', asset_id: 'AST-022', asset_nama: 'Microsoft 365 Business Premium', asset_kode: 'LIC-OFF-001',
    tipe: 'rutin', judul: 'Audit Lisensi M365 Tahunan', deskripsi: 'Review user licensing, security audit, conditional access review',
    status: 'selesai', tanggal_mulai: '2024-10-01', tanggal_selesai: '2024-10-05',
    biaya: 0, vendor: 'Internal', petugas: 'Admin Budi', catatan: '100 user aktif, tidak ada anomaly',
    created_at: '2024-10-01T08:00:00Z', updated_at: '2024-10-05T17:00:00Z',
  },
];
