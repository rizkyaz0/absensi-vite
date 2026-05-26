import { InventoryItem } from '../types/inventory';
import { mockAssets } from './assets';

export const mockInventory: InventoryItem[] = [
  {
    id: 'INV-001', asset_id: 'AST-003', asset_nama: 'Printer Epson WorkForce Pro', asset_kode: 'IT-PRN-001',
    lokasi_gudang: 'Gudang Alat Tulis - Lt.1', rak: 'R-A01', jumlah: 1,
    kondisi: 'baik', terakhir_stock_opname: '2024-11-01', catatan: 'Printer cadangan siap pakai',
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-11-01T10:00:00Z',
  },
  {
    id: 'INV-002', asset_id: 'AST-007', asset_nama: 'Kursi Ergonomis Herman Miller', asset_kode: 'FRN-KRS-001',
    lokasi_gudang: 'Gudang Furniture - Lt.1', rak: 'R-F02', jumlah: 3,
    kondisi: 'baik', terakhir_stock_opname: '2024-10-15', catatan: 'Stok cadangan untuk karyawan baru',
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-10-15T10:00:00Z',
  },
  {
    id: 'INV-003', asset_id: 'AST-009', asset_nama: 'Generator Diesel 100 KVA', asset_kode: 'MCH-GEN-001',
    lokasi_gudang: 'Gudang Teknik - Lt.1', rak: 'R-T01', jumlah: 1,
    kondisi: 'baik', terakhir_stock_opname: '2024-11-01', catatan: 'Generator utama dalam kondisi siap pakai',
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-11-01T10:00:00Z',
  },
  {
    id: 'INV-004', asset_id: 'AST-017', asset_nama: 'Lemari Arsip Besi 4 Pintu', asset_kode: 'FRN-LMR-001',
    lokasi_gudang: 'Gudang Furniture - Lt.1', rak: 'R-F05', jumlah: 5,
    kondisi: 'baik', terakhir_stock_opname: '2024-09-01', catatan: 'Lemari arsip siap dipasang',
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-09-01T10:00:00Z',
  },
  {
    id: 'INV-005', asset_id: 'AST-021', asset_nama: 'Tensimeter Digital Omron', asset_kode: 'MED-TMS-001',
    lokasi_gudang: 'Klinik - Gudang Medis', rak: 'R-M01', jumlah: 2,
    kondisi: 'baik', terakhir_stock_opname: '2024-11-15', catatan: 'Siap pakai untuk medical check-up',
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-11-15T10:00:00Z',
  },
  {
    id: 'INV-006', asset_id: 'AST-023', asset_nama: 'Rak Gudang Heavy Duty', asset_kode: 'FRN-RAK-001',
    lokasi_gudang: 'Gudang Utama - Lt.1', rak: 'R-G01', jumlah: 8,
    kondisi: 'baik', terakhir_stock_opname: '2024-10-01', catatan: 'Rak kosong siap digunakan',
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-10-01T10:00:00Z',
  },
  {
    id: 'INV-007', asset_id: 'AST-025', asset_nama: 'ThinkPad X1 Carbon Gen 11', asset_kode: 'IT-LPT-003',
    lokasi_gudang: 'Gudang IT - Lt.3', rak: 'R-IT03', jumlah: 1,
    kondisi: 'baik', terakhir_stock_opname: '2024-11-01', catatan: 'Laptop cadangan untuk tamu',
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-11-01T10:00:00Z',
  },
  {
    id: 'INV-008', asset_id: 'AST-026', asset_nama: 'Forklift Toyota 3 Ton', asset_kode: 'VHC-FRK-001',
    lokasi_gudang: 'Gudang Utama', rak: 'R-G05', jumlah: 1,
    kondisi: 'rusak_ringan', terakhir_stock_opname: '2024-11-20', catatan: 'Ban depan kiri perlu diganti',
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-11-20T10:00:00Z',
  },
  {
    id: 'INV-009', asset_id: 'AST-024', asset_nama: 'Mesin AC Central Chiller', asset_kode: 'MCH-ACM-001',
    lokasi_gudang: 'Atap Gedung A', rak: 'R-AC01', jumlah: 1,
    kondisi: 'baik', terakhir_stock_opname: '2024-10-01', catatan: 'Performa pendinginan normal',
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-10-01T10:00:00Z',
  },
  {
    id: 'INV-010', asset_id: 'AST-012', asset_nama: 'Alat EKG 12 Lead', asset_kode: 'MED-EKG-001',
    lokasi_gudang: 'Klinik - Gudang Medis', rak: 'R-M03', jumlah: 1,
    kondisi: 'baik', terakhir_stock_opname: '2024-10-01', catatan: 'Kalibrasi terakhir Oktober 2024',
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-10-01T10:00:00Z',
  },
];
