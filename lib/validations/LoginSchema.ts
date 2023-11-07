import * as z from "zod";

const LoginSchema: any = z.object({
  email: z.string().email({ message: "Geçerli bir email adresi giriniz" }),
  password: z
    .string()
    .min(6, { message: "En az 6 karakterden giriniz" })
    .max(20, { message: "En fazla 20 karakter girilebilir" }),
});

export default LoginSchema;
