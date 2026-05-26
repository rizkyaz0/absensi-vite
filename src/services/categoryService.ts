import { AssetCategory, CategoryFormData } from '../types/category';
import { mockCategories } from '../mock/categories';
import { mockAssets } from '../mock/assets';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
let categories = [...mockCategories];

export const categoryService = {
  async list(): Promise<AssetCategory[]> {
    await delay(200);
    return categories.map((c) => ({
      ...c,
      jumlah_aset: mockAssets.filter((a) => a.kategori_id === c.id).length,
    }));
  },

  async getById(id: string): Promise<AssetCategory | null> {
    await delay(150);
    return categories.find((c) => c.id === id) || null;
  },

  async create(data: CategoryFormData): Promise<AssetCategory> {
    await delay(300);
    const now = new Date().toISOString();
    const category: AssetCategory = {
      id: `CAT-${String(categories.length + 1).padStart(3, '0')}`,
      ...data,
      jumlah_aset: 0,
      created_at: now,
      updated_at: now,
    };
    categories.push(category);
    return category;
  },

  async update(id: string, data: Partial<CategoryFormData>): Promise<AssetCategory> {
    await delay(300);
    const idx = categories.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Kategori tidak ditemukan');
    categories[idx] = { ...categories[idx], ...data, updated_at: new Date().toISOString() };
    return categories[idx];
  },

  async delete(id: string): Promise<void> {
    await delay(200);
    const hasAssets = mockAssets.some((a) => a.kategori_id === id);
    if (hasAssets) throw new Error('Tidak dapat menghapus kategori yang masih memiliki aset');
    const idx = categories.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('Kategori tidak ditemukan');
    categories.splice(idx, 1);
  },
};
