import { BastDocument, BastFormData, BastStatus, BastType } from "../types/bast";
import { PaginatedResponse } from "../types/common";
import { mockBastDocuments } from "../mock/bast";
import { assignmentService } from "./assignmentService";
import { assetService } from "./assetService";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
let documents = [...mockBastDocuments];

export const bastService = {
  async list(params?: {
    search?: string;
    tipe?: BastType;
    status?: BastStatus;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<BastDocument>> {
    await delay(300);
    let result = [...documents];

    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (d) =>
          d.nomor.toLowerCase().includes(q) ||
          d.judul.toLowerCase().includes(q) ||
          d.pihak_pertama.toLowerCase().includes(q) ||
          d.pihak_kedua.toLowerCase().includes(q)
      );
    }
    if (params?.tipe) result = result.filter((d) => d.tipe === params.tipe);
    if (params?.status) result = result.filter((d) => d.status === params.status);

    result.sort((a, b) => b.tanggal_buat.localeCompare(a.tanggal_buat));
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const data = result.slice((page - 1) * limit, page * limit);
    return { data, total, page, limit, total_pages: totalPages };
  },

  async getById(id: string): Promise<BastDocument | null> {
    await delay(200);
    return documents.find((d) => d.id === id) || null;
  },

  async create(data: BastFormData): Promise<BastDocument> {
    await delay(400);
    const now = new Date();
    const year = now.getFullYear();
    const count = documents.length + 1;
    const doc: BastDocument = {
      id: `BST-${String(count).padStart(3, "0")}`,
      nomor: `BAST/${year}/${data.tipe === "procurement" ? "PRC" : data.tipe === "transfer" ? "INV" : "IT"}/${String(count).padStart(3, "0")}`,
      ...data,
      status: "draft",
      tanggal_buat: now.toISOString().split("T")[0],
      tanggal_serah_terima: data.tanggal_serah_terima || null,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    };
    documents.unshift(doc);
    return doc;
  },

  async updateStatus(id: string, status: BastStatus): Promise<BastDocument> {
    await delay(300);
    const idx = documents.findIndex((d) => d.id === id);
    if (idx === -1) throw new Error("BAST document not found");
    documents[idx].status = status;
    if (status === "final") {
      documents[idx].tanggal_serah_terima = new Date().toISOString().split("T")[0];
    }
    documents[idx].updated_at = new Date().toISOString();
    return documents[idx];
  },

  async generateFromAssignment(assignmentId: string): Promise<BastFormData | null> {
    await delay(300);
    const assignment = await assignmentService.getById(assignmentId);
    if (!assignment) return null;

    const asset = await assetService.getById(assignment.asset_id);
    return {
      judul: `Serah Terima ${assignment.asset_nama} ke ${assignment.pegawai_nama}`,
      tipe: assignment.tanggal_selesai ? "return" : "assignment",
      tanggal_serah_terima: new Date().toISOString().split("T")[0],
      pihak_pertama: "Budi Santoso",
      pihak_pertama_jabatan: "Kepala Divisi IT",
      pihak_kedua: assignment.pegawai_nama,
      pihak_kedua_jabatan: `${assignment.pegawai_departemen}`,
      lokasi: asset?.lokasi || "Kantor Pusat",
      catatan: "",
      items: [
        {
          nama: assignment.asset_nama,
          kode: assignment.asset_kode,
          jumlah: 1,
          kondisi: "Baik",
          keterangan: "",
        },
      ],
      terkait_id: assignmentId,
      terkait_tipe: "assignment",
    };
  },
};
