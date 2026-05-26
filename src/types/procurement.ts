export type ProcurementStatus = 'draft' | 'diajukan' | 'disetujui' | 'ditolak' | 'dipesan' | 'diterima' | 'dibatalkan';
export type ProcurementType = 'pembelian' | 'sewa' | 'hibah';

export interface ProcurementRequest {
  id: string;
  nomor: string;
  judul: string;
  tipe: ProcurementType;
  status: ProcurementStatus;
  pengaju: string;
  departemen: string;
  tanggal_pengajuan: string;
  tanggal_disetujui: string | null;
  estimasi_biaya: number;
  biaya_realisasi: number | null;
  deskripsi: string;
  alasan: string;
  catatan: string;
  items: ProcurementItem[];
  created_at: string;
  updated_at: string;
}

export interface ProcurementItem {
  nama: string;
  jumlah: number;
  estimasi_harga: number;
  spesifikasi: string;
}

export interface ProcurementFormData {
  judul: string;
  tipe: ProcurementType;
  pengaju: string;
  departemen: string;
  estimasi_biaya: number;
  deskripsi: string;
  alasan: string;
  items: ProcurementItem[];
}
