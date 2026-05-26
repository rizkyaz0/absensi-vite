export type AssetStatus =
  | 'tersedia'
  | 'digunakan'
  | 'dalam_perawatan'
  | 'rusak'
  | 'dihapus';

export interface Asset {
  id: string;
  kode: string;
  nama: string;
  kategori_id: string;
  kategori_nama: string;
  merek: string;
  model: string;
  nomor_seri: string;
  lokasi: string;
  status: AssetStatus;
  nilai_perolehan: number;
  nilai_saat_ini: number;
  tanggal_perolehan: string; // ISO date
  masa_manfaat: number; // tahun
  depresiasi_per_tahun: number;
  deskripsi: string;
  foto_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AssetFormData {
  kode: string;
  nama: string;
  kategori_id: string;
  merek: string;
  model: string;
  nomor_seri: string;
  lokasi: string;
  status: AssetStatus;
  nilai_perolehan: number;
  tanggal_perolehan: string;
  masa_manfaat: number;
  deskripsi: string;
}

export interface AssetListParams {
  search?: string;
  status?: AssetStatus;
  kategori_id?: string;
  lokasi?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface AssetSummary {
  total: number;
  tersedia: number;
  digunakan: number;
  dalam_perawatan: number;
  rusak: number;
  dihapus: number;
  total_nilai_perolehan: number;
  total_nilai_saat_ini: number;
}
