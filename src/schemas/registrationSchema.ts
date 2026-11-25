import { z } from "zod";

export const registrationSchema = z.object({
  namaLengkap: z
    .string()
    .min(3, { message: "Nama santri minimal 3 karakter" }),

  nis: z
    .string()
    .regex(/^\d{5,8}$/, { message: "NIS tidak valid" }),

  umur: z
    .number({
      error: "Umur wajib diisi dengan angka",
    })
    .min(15, { message: "Umur minimal 15 tahun" })
    .max(20, { message: "Umur maksimal 20 tahun" }),

  divisi: z.enum(["Frontend", "Backend", "UI/UX"], {
    error: "Silakan pilih divisi",
  }),

  keahlian: z.array(z.string()).optional(),

  setujuTataTertib: z.boolean().refine((val) => val === true, {
    message: "Santri wajib menyetujui tata tertib divisi",
  }),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;