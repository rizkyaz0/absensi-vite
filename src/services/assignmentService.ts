import { Assignment, AssignmentFormData } from '../types/assignment';
import { PaginatedResponse } from '../types/common';
import { mockAssignments } from '../mock/assignments';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
let assignments = [...mockAssignments];

export const assignmentService = {
  async list(params?: { search?: string; status?: string; asset_id?: string; page?: number; limit?: number }): Promise<PaginatedResponse<Assignment>> {
    await delay(300);
    let result = [...assignments];

    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter((a) => a.pegawai_nama.toLowerCase().includes(q) || a.asset_nama.toLowerCase().includes(q));
    }
    if (params?.status) result = result.filter((a) => a.status === params.status);
    if (params?.asset_id) result = result.filter((a) => a.asset_id === params.asset_id);

    result.sort((a, b) => b.tanggal_mulai.localeCompare(a.tanggal_mulai));
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const data = result.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit, total_pages: totalPages };
  },

  async create(data: AssignmentFormData): Promise<Assignment> {
    await delay(400);
    const now = new Date().toISOString();
    const assignment: Assignment = {
      id: `ASG-${String(assignments.length + 1).padStart(3, '0')}`,
      ...data,
      asset_nama: '',
      asset_kode: '',
      status: 'aktif',
      tanggal_selesai: null,
      created_at: now,
      updated_at: now,
    };
    assignments.unshift(assignment);
    return assignment;
  },

  async return(id: string, tanggal_selesai: string): Promise<Assignment> {
    await delay(300);
    const idx = assignments.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error('Assignment tidak ditemukan');
    assignments[idx].status = 'dikembalikan';
    assignments[idx].tanggal_selesai = tanggal_selesai;
    assignments[idx].updated_at = new Date().toISOString();
    return assignments[idx];
  },

  async getById(id: string): Promise<Assignment | null> {
    await delay(150);
    return assignments.find((a) => a.id === id) || null;
  },

  async getByAssetId(assetId: string): Promise<Assignment[]> {
    await delay(200);
    return assignments.filter((a) => a.asset_id === assetId);
  },
};
