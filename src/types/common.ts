export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface DashboardStats {
  total_aset: number;
  aset_tersedia: number;
  aset_digunakan: number;
  aset_perawatan: number;
  aset_rusak: number;
  total_nilai_perolehan: number;
  total_nilai_saat_ini: number;
  total_kategori: number;
  total_pegawai_terdaftar: number;
}
