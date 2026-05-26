import { Asset, AssetFormData, AssetListParams, AssetSummary } from '../types/asset';
import { PaginatedResponse } from '../types/common';
import { mockAssets } from '../mock/assets';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
let assets = [...mockAssets];

export const assetService = {
  async list(params?: AssetListParams): Promise<PaginatedResponse<Asset>> {
    await delay(300);
    let result = [...assets];

    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter((a) =>
        a.nama.toLowerCase().includes(q) || a.kode.toLowerCase().includes(q) ||
        a.nomor_seri.toLowerCase().includes(q) || a.lokasi.toLowerCase().includes(q)
      );
    }
    if (params?.status) result = result.filter((a) => a.status === params.status);
    if (params?.kategori_id) result = result.filter((a) => a.kategori_id === params.kategori_id);
    if (params?.lokasi) result = result.filter((a) => a.lokasi.toLowerCase().includes(params.lokasi!.toLowerCase()));

    const sortBy = params?.sort_by || 'nama';
    const sortOrder = params?.sort_order || 'asc';
    result.sort((a, b) => {
      const aVal = (a as any)[sortBy] || '';
      const bVal = (b as any)[sortBy] || '';
      return sortOrder === 'asc' ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const data = result.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit, total_pages: totalPages };
  },

  async getById(id: string): Promise<Asset | null> {
    await delay(200);
    return assets.find((a) => a.id === id) || null;
  },

  async getSummary(): Promise<AssetSummary> {
    await delay(200);
    const total = assets.length;
    const tersedia = assets.filter((a) => a.status === 'tersedia').length;
    const digunakan = assets.filter((a) => a.status === 'digunakan').length;
    const dalam_perawatan = assets.filter((a) => a.status === 'dalam_perawatan').length;
    const rusak = assets.filter((a) => a.status === 'rusak').length;
    const dihapus = assets.filter((a) => a.status === 'dihapus').length;
    const total_nilai_perolehan = assets.reduce((sum, a) => sum + a.nilai_perolehan, 0);
    const total_nilai_saat_ini = assets.reduce((sum, a) => sum + a.nilai_saat_ini, 0);
    return { total, tersedia, digunakan, dalam_perawatan, rusak, dihapus, total_nilai_perolehan, total_nilai_saat_ini };
  },

  async create(data: AssetFormData): Promise<Asset> {
    await delay(400);
    const now = new Date().toISOString();
    const asset: Asset = {
      id: `AST-${String(assets.length + 1).padStart(3, '0')}`,
      kode: data.kode,
      nama: data.nama,
      kategori_id: data.kategori_id,
      kategori_nama: 'Unknown',
      merek: data.merek,
      model: data.model,
      nomor_seri: data.nomor_seri,
      lokasi: data.lokasi,
      status: data.status,
      nilai_perolehan: data.nilai_perolehan,
      nilai_saat_ini: data.nilai_perolehan,
      tanggal_perolehan: data.tanggal_perolehan,
      masa_manfaat: data.masa_manfaat,
      depresiasi_per_tahun: Math.round(data.nilai_perolehan / data.masa_manfaat),
      deskripsi: data.deskripsi,
      created_at: now,
      updated_at: now,
    };
    assets.unshift(asset);
    return asset;
  },

  async update(id: string, data: Partial<AssetFormData>): Promise<Asset> {
    await delay(400);
    const idx = assets.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error('Aset tidak ditemukan');
    assets[idx] = { ...assets[idx], ...data, updated_at: new Date().toISOString() };
    return assets[idx];
  },

  async delete(id: string): Promise<void> {
    await delay(300);
    const idx = assets.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error('Aset tidak ditemukan');
    assets.splice(idx, 1);
  },
};
