import { MaintenanceRecord, MaintenanceFormData } from '../types/maintenance';
import { PaginatedResponse } from '../types/common';
import { mockMaintenance } from '../mock/maintenance';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
let records = [...mockMaintenance];

export const maintenanceService = {
  async list(params?: { search?: string; status?: string; asset_id?: string; page?: number; limit?: number }): Promise<PaginatedResponse<MaintenanceRecord>> {
    await delay(300);
    let result = [...records];

    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter((m) => m.judul.toLowerCase().includes(q) || m.asset_nama.toLowerCase().includes(q));
    }
    if (params?.status) result = result.filter((m) => m.status === params.status);
    if (params?.asset_id) result = result.filter((m) => m.asset_id === params.asset_id);

    result.sort((a, b) => b.tanggal_mulai.localeCompare(a.tanggal_mulai));
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const data = result.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit, total_pages: totalPages };
  },

  async create(data: MaintenanceFormData): Promise<MaintenanceRecord> {
    await delay(400);
    const now = new Date().toISOString();
    const record: MaintenanceRecord = {
      id: `MTN-${String(records.length + 1).padStart(3, '0')}`,
      ...data,
      asset_nama: '',
      asset_kode: '',
      status: 'dijadwalkan',
      tanggal_selesai: data.tanggal_selesai || null,
      created_at: now,
      updated_at: now,
    };
    records.unshift(record);
    return record;
  },

  async updateStatus(id: string, status: MaintenanceRecord['status']): Promise<MaintenanceRecord> {
    await delay(300);
    const idx = records.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error('Maintenance record tidak ditemukan');
    records[idx].status = status;
    if (status === 'selesai') records[idx].tanggal_selesai = new Date().toISOString().split('T')[0];
    records[idx].updated_at = new Date().toISOString();
    return records[idx];
  },

  async getByAssetId(assetId: string): Promise<MaintenanceRecord[]> {
    await delay(200);
    return records.filter((r) => r.asset_id === assetId);
  },
};
