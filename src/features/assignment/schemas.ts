import { z } from "zod";

export const assignmentFormSchema = z.object({
  asset_id: z.string().min(1, "Asset is required"),
  pegawai_nama: z.string().min(1, "Employee name is required"),
  pegawai_nip: z.string().min(1, "Employee NIP is required"),
  pegawai_departemen: z.string().min(1, "Department is required"),
  tanggal_mulai: z.string().min(1, "Start date is required"),
  catatan: z.string().optional().default(""),
});

export type AssignmentFormValues = z.infer<typeof assignmentFormSchema>;

export const returnAssignmentSchema = z.object({
  tanggal_selesai: z.string().min(1, "Return date is required"),
});

export type ReturnAssignmentValues = z.infer<typeof returnAssignmentSchema>;
