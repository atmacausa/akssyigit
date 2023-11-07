import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";

const createUser = async (req) => {
  try {
    await connectToDB();

    const { name, surname, email, password, phone, address, city, district } =
      await req.json();

    const emailCheck = await User.findOne({
      email,
    }).exec();

    const phoneCheck = await User.findOne({
      phone,
    }).exec();

    if (emailCheck) {
      return new Response(null, {
        status: 400,
        message: `${email} email adresine ait bir kullanıcı zaten var`,
      });
    } else if (phoneCheck) {
      return new Response(null, {
        status: 400,
        message: `${phone} telefon numarasına ait bir kullanıcı zaten var`,
      });
    } else {
      const user = await User.create({
        name,
        surname,
        email,
        password,
        phone,
        address,
        city,
        district,
      });

      //revalidatePath("/");
      return new Response(JSON.stringify(user), {
        status: 200,
        message: "Kullanıcı başarıyla oluşturuldu",
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(error.message, {
      status: 500,
      message: "Bir hata oluştu",
    });
  }
};

export { createUser as POST };
