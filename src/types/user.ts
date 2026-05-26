export type UserRole = "admin" | "staff" | "manager" | "teknisi";

export interface User {
  id: string;
  nip: string;
  nama: string;
  email: string;
  departemen: string;
  jabatan: string;
  role: UserRole;
  telepon: string;
  foto_url?: string;
  aktif: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserFormData {
  nip: string;
  nama: string;
  email: string;
  departemen: string;
  jabatan: string;
  role: UserRole;
  telepon: string;
  aktif: boolean;
}
