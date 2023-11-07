import * as z from "zod";

const SignupSchema: any = z
  .object({
    name: z.string().nonempty({ message: "Ad boş bırakılamaz" }),
    surname: z.string().nonempty({ message: "Soyad boş bırakılamaz" }),
    email: z.string().email({ message: "Geçerli bir email adresi giriniz" }),
    password: z
      .string()
      .min(6, { message: "En az 6 karakterden oluşmalı" })
      .max(20, { message: "En fazla 20 karakterden oluşmalı" }),
    passwordConfirm: z.string(),
    phone: z.string().nonempty({ message: "Telefon numarası boş bırakılamaz" }),
    address: z
      .string()
      .nonempty({ message: "Adres boş bırakılamaz" })
      .max(200, { message: "En fazla 200 karakterden oluşmalı" }),
    city: z.string().nonempty({ message: "İl boş bırakılamaz" }),
    district: z.string().nonempty({ message: "İlçe boş bırakılamaz" }),
  })
  .refine((data) => data.password == data.passwordConfirm, {
    message: "Şifreler eşleşmiyor",
    path: ["passwordConfirm"],
  })
  .refine((data) => !Number.isNaN(Number(data.phone)), {
    message: "Telefon numarası harf içeremez",
    path: ["phone"],
  })
  .refine((data) => data.phone.length == 11, {
    message: "Telefon numarası 11 haneli olmalı",
    path: ["phone"],
  });

export default SignupSchema;
