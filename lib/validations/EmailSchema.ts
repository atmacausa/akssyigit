import * as z from "zod";

const EmailSchema: any = z.object({
  email: z.string().email({ message: "Geçerli bir email adresi giriniz" }),
});

export default EmailSchema;
