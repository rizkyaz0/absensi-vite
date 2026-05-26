export type AssignmentStatus = 'aktif' | 'dikembalikan' | 'dialihkan';

export interface Assignment {
  id: string;
  asset_id: string;
  asset_nama: string;
  asset_kode: string;
  pegawai_nama: string;
  pegawai_nip: string;
  pegawai_departemen: string;
  tanggal_mulai: string;
  tanggal_selesai: string | null;
  status: AssignmentStatus;
  catatan: string;
  created_at: string;
  updated_at: string;
}

export interface AssignmentFormData {
  asset_id: string;
  pegawai_nama: string;
  pegawai_nip: string;
  pegawai_departemen: string;
  tanggal_mulai: string;
  catatan: string;
}
