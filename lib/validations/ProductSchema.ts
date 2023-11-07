import * as z from "zod";

const ProductSchema: any = z
  .object({
    name: z
      .string()
      .min(3, { message: "En az 3 karakterden oluşmalı" })
      .max(20, { message: "En fazla 20 karakterden oluşmalı" }),
    description: z
      .string()
      .min(3, { message: "En az 3 karakterden oluşmalı" })
      .max(200, { message: "En fazla 200 karakterden oluşmalı" }),
    price: z.string().nonempty({ message: "Ücret boş bırakılamaz" }),
  })
  .refine((data) => !Number.isNaN(Number(data.price)) == true, {
    message: "Ücret sayı olmalıdır",
    path: ["price"],
  })
  .refine(
    (data) => !Number.isNaN(Number(data.price)) && Number(data.price) > 0,
    {
      message: "Ücret 0'dan büyük olmalıdır",
      path: ["price"],
    }
  );
export default ProductSchema;
