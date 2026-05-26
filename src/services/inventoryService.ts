import { InventoryItem } from '../types/inventory';
import { mockInventory } from '../mock/inventory';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
let items = [...mockInventory];

export const inventoryService = {
  async list(params?: { search?: string; kondisi?: string; page?: number; limit?: number }): Promise<{ data: InventoryItem[]; total: number; page: number; limit: number; total_pages: number }> {
    await delay(300);
    let result = [...items];

    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter((i) => i.asset_nama.toLowerCase().includes(q) || i.lokasi_gudang.toLowerCase().includes(q));
    }
    if (params?.kondisi) result = result.filter((i) => i.kondisi === params.kondisi);

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const data = result.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit, total_pages: totalPages };
  },

  async updateStock(id: string, jumlah: number): Promise<InventoryItem> {
    await delay(300);
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error('Item inventory tidak ditemukan');
    items[idx].jumlah = jumlah;
    items[idx].updated_at = new Date().toISOString();
    return items[idx];
  },
};
