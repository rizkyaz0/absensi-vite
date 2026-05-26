import { z } from "zod";

const bastItemSchema = z.object({
  nama: z.string().min(1, "Item name is required"),
  kode: z.string().optional().default(""),
  jumlah: z.coerce.number().int().positive("Must be at least 1"),
  kondisi: z.string().min(1, "Condition is required"),
  keterangan: z.string().optional().default(""),
});

export const bastFormSchema = z.object({
  judul: z.string().min(1, "Title is required"),
  tipe: z.enum(["assignment", "return", "procurement", "transfer", "inventory"]),
  tanggal_serah_terima: z.string().min(1, "Handover date is required"),
  pihak_pertama: z.string().min(1, "First party is required"),
  pihak_pertama_jabatan: z.string().min(1, "First party title is required"),
  pihak_kedua: z.string().min(1, "Second party is required"),
  pihak_kedua_jabatan: z.string().min(1, "Second party title is required"),
  lokasi: z.string().min(1, "Location is required"),
  catatan: z.string().optional().default(""),
  items: z.array(bastItemSchema).min(1, "At least one item is required"),
});

export type BastFormValues = z.infer<typeof bastFormSchema>;
