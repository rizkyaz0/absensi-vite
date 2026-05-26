import { z } from "zod";

export const maintenanceFormSchema = z.object({
  asset_id: z.string().min(1, "Asset is required"),
  tipe: z.enum(["rutin", "perbaikan", "darurat"]),
  judul: z.string().min(1, "Title is required"),
  deskripsi: z.string().optional().default(""),
  tanggal_mulai: z.string().min(1, "Start date is required"),
  tanggal_selesai: z.string().optional().default(""),
  biaya: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .nonnegative("Cost cannot be negative"),
  vendor: z.string().min(1, "Vendor is required"),
  petugas: z.string().min(1, "Officer is required"),
  catatan: z.string().optional().default(""),
});

export type MaintenanceFormValues = z.infer<typeof maintenanceFormSchema>;
