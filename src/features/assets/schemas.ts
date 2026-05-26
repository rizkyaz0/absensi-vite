import { z } from "zod";

export const assetFormSchema = z.object({
  kode: z
    .string()
    .min(1, "Code is required")
    .regex(/^[A-Z0-9-]+$/, "Code must be uppercase alphanumeric with hyphens"),
  nama: z.string().min(1, "Name is required").max(200, "Name is too long"),
  kategori_id: z.string().min(1, "Category is required"),
  merek: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  nomor_seri: z.string().min(1, "Serial number is required"),
  lokasi: z.string().min(1, "Location is required"),
  status: z.enum([
    "tersedia",
    "digunakan",
    "dalam_perawatan",
    "rusak",
    "dihapus",
  ]),
  nilai_perolehan: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .positive("Acquisition value must be positive"),
  tanggal_perolehan: z.string().min(1, "Acquisition date is required"),
  masa_manfaat: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .int()
    .positive("Useful life must be positive"),
  deskripsi: z.string().optional().default(""),
});

export type AssetFormValues = z.infer<typeof assetFormSchema>;
