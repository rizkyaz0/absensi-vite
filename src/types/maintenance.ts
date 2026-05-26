export type MaintenanceStatus = 'dijadwalkan' | 'berlangsung' | 'selesai' | 'dibatalkan';
export type MaintenanceType = 'rutin' | 'perbaikan' | 'darurat';

export interface MaintenanceRecord {
  id: string;
  asset_id: string;
  asset_nama: string;
  asset_kode: string;
  tipe: MaintenanceType;
  judul: string;
  deskripsi: string;
  status: MaintenanceStatus;
  tanggal_mulai: string;
  tanggal_selesai: string | null;
  biaya: number;
  vendor: string;
  petugas: string;
  catatan: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceFormData {
  asset_id: string;
  tipe: MaintenanceType;
  judul: string;
  deskripsi: string;
  tanggal_mulai: string;
  tanggal_selesai?: string;
  biaya: number;
  vendor: string;
  petugas: string;
  catatan: string;
}
