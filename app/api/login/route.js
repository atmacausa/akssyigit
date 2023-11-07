import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";

export const POST = async (req, res) => {
  try {
    await connectToDB();

    const jsoned = await req.json();
    console.log("🚀 ~ file: route.js:9 ~ POST ~ jsoned:", jsoned);
    return new Response(JSON.stringify(jsoned), { status: 200 });

    // const isAny = await User.findOne({
    //   username,
    //   password,
    // }).exec();

    // if (!isAny) {
    //   return new Response(null, {
    //     status: 400,
    //     message: "Kullanıcı adı veya şifre hatalı",
    //   });
    // } else {
    //   return new Response(
    //     JSON.stringify({ username: username, password: password }),
    //     {
    //       status: 200,
    //       message: "Başarılı",
    //     }
    //   );

    //   //revalidatePath("/");
    // }
  } catch (error) {
    console.log(error);
    return new Response(error.message, {
      status: 500,
      message: "Bir hata oluştu",
    });
  }
};
