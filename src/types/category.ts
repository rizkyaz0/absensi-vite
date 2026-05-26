export interface AssetCategory {
  id: string;
  nama: string;
  deskripsi: string;
  icon: string;
  jumlah_aset: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryFormData {
  nama: string;
  deskripsi: string;
  icon: string;
}
