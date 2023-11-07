import * as z from "zod";

const ResetPasswordSchema: any = z
  .object({
    code: z
      .string()
      .min(6, { message: "Kod 6 haneli olmalıdır" })
      .max(6, { message: "Kod 6 haneli olmalıdır" }),
    password: z
      .string()
      .min(6, { message: "En az 6 karakterden giriniz" })
      .max(20, { message: "En fazla 20 karakter girilebilir" }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password == data.passwordConfirm, {
    message: "Şifreler eşleşmiyor",
    path: ["passwordConfirm"],
  })
  .refine((data) => !Number.isNaN(Number(data.code)), {
    message: "Kod yalnızca rakamlardan oluşmalıdır",
    path: ["code"],
  });

export default ResetPasswordSchema;
