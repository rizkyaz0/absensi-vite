import { z } from "zod";

const procurementItemSchema = z.object({
  nama: z.string().min(1, "Item name is required"),
  jumlah: z.coerce
    .number()
    .int()
    .positive("Must be at least 1"),
  estimasi_harga: z.coerce
    .number()
    .nonnegative("Price cannot be negative"),
  spesifikasi: z.string().optional().default(""),
});

export const procurementFormSchema = z.object({
  judul: z.string().min(1, "Title is required"),
  tipe: z.enum(["pembelian", "sewa", "hibah"]),
  pengaju: z.string().min(1, "Requester is required"),
  departemen: z.string().min(1, "Department is required"),
  estimasi_biaya: z.coerce
    .number()
    .nonnegative("Estimated cost cannot be negative"),
  deskripsi: z.string().optional().default(""),
  alasan: z.string().min(1, "Reason is required"),
  items: z.array(procurementItemSchema).min(1, "At least one item is required"),
});

export type ProcurementFormValues = z.infer<typeof procurementFormSchema>;
