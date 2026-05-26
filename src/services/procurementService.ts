import { ProcurementRequest, ProcurementFormData } from '../types/procurement';
import { PaginatedResponse } from '../types/common';
import { mockProcurement } from '../mock/procurement';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
let requests = [...mockProcurement];

export const procurementService = {
  async list(params?: { search?: string; status?: string; page?: number; limit?: number }): Promise<PaginatedResponse<ProcurementRequest>> {
    await delay(300);
    let result = [...requests];

    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter((p) => p.judul.toLowerCase().includes(q) || p.nomor.toLowerCase().includes(q) || p.pengaju.toLowerCase().includes(q));
    }
    if (params?.status) result = result.filter((p) => p.status === params.status);

    result.sort((a, b) => b.tanggal_pengajuan.localeCompare(a.tanggal_pengajuan));
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const data = result.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit, total_pages: totalPages };
  },

  async create(data: ProcurementFormData): Promise<ProcurementRequest> {
    await delay(400);
    const now = new Date().toISOString();
    const req: ProcurementRequest = {
      id: `PRC-${String(requests.length + 1).padStart(3, '0')}`,
      nomor: `PR-${new Date().getFullYear()}-${String(requests.length + 1).padStart(3, '0')}`,
      ...data,
      status: 'draft',
      tanggal_pengajuan: now.split('T')[0],
      tanggal_disetujui: null,
      biaya_realisasi: null,
      catatan: '',
      created_at: now,
      updated_at: now,
    };
    requests.unshift(req);
    return req;
  },

  async updateStatus(id: string, status: ProcurementRequest['status'], catatan?: string): Promise<ProcurementRequest> {
    await delay(300);
    const idx = requests.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error('Procurement tidak ditemukan');
    requests[idx].status = status;
    if (status === 'disetujui') requests[idx].tanggal_disetujui = new Date().toISOString().split('T')[0];
    if (catatan) requests[idx].catatan = catatan;
    requests[idx].updated_at = new Date().toISOString();
    return requests[idx];
  },
};
