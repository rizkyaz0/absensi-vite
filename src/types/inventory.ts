export interface InventoryItem {
  id: string;
  asset_id: string;
  asset_nama: string;
  asset_kode: string;
  lokasi_gudang: string;
  rak: string;
  jumlah: number;
  kondisi: 'baik' | 'rusak_ringan' | 'rusak_berat';
  terakhir_stock_opname: string;
  catatan: string;
  created_at: string;
  updated_at: string;
}
