export type BastStatus = "draft" | "final" | "cancelled";
export type BastType = "assignment" | "return" | "procurement" | "transfer" | "inventory";

export interface BastItem {
  nama: string;
  kode: string;
  jumlah: number;
  kondisi: string;
  keterangan: string;
}

export interface BastDocument {
  id: string;
  nomor: string;
  judul: string;
  tipe: BastType;
  status: BastStatus;
  tanggal_buat: string;
  tanggal_serah_terima: string | null;
  pihak_pertama: string;
  pihak_pertama_jabatan: string;
  pihak_kedua: string;
  pihak_kedua_jabatan: string;
  lokasi: string;
  catatan: string;
  items: BastItem[];
  terkait_id?: string;        // Reference to assignment/procurement/inventory ID
  terkait_tipe?: string;      // What this BAST references
  created_at: string;
  updated_at: string;
}

export interface BastFormData {
  judul: string;
  tipe: BastType;
  tanggal_serah_terima: string;
  pihak_pertama: string;
  pihak_pertama_jabatan: string;
  pihak_kedua: string;
  pihak_kedua_jabatan: string;
  lokasi: string;
  catatan: string;
  items: BastItem[];
  terkait_id?: string;
  terkait_tipe?: string;
}
