"use server";

import { z } from "zod";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import LoginSchema from "../validations/LoginSchema";

interface Params {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  district: string;
}

type LoginInputs = z.infer<typeof LoginSchema>;

export const signupUser = async ({
  name,
  surname,
  email,
  password,
  phone,
  address,
  city,
  district,
}: Params) => {
  try {
    await connectToDB();

    console.log(
      "Candidate user:",
      name,
      surname,
      email,
      password,
      phone,
      address,
      city,
      district
    );

    const emailCheck = await User.findOne({ email }).exec();

    const phoneCheck = await User.findOne({ phone }).exec();

    if (emailCheck) {
      return {
        status: 400,
        message: `${email} adresine ait zaten bir hesap bulunuyor`,
      };
    } else if (phoneCheck) {
      return {
        status: 401,
        message: `${phone} telefon numarasına ait zaten bir hesap bulunuyor`,
      };
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
      return {
        status: 200,
        message: "Kullanıcı başarıyla oluşturuldu",
        body: user,
      };
    }
  } catch (error: any) {
    console.log(error);
    return { status: 500, message: "Bir hata oluştu" };
  }
};

export const loginUser = async (data: LoginInputs) => {
  try {
    const result = LoginSchema.safeParse(data);
    if (result.success) {
      await connectToDB();
      var user = await User.findOne({
        email: data.email,
        password: data.password,
      }).exec();

      if (user?._doc) {
        user = { ...user._doc, _id: user._doc._id.toString() };
        return { status: 200, message: "Başarılı", user: user };
      } else {
        return { status: 400, message: "Kullanıcı adı veya şifre hatalı" };
      }
    } else {
      return {
        status: 400,
        message: "Kullanıcı adı veya şifre istenilen formatta değil",
      };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Bir hata oluştu" };
  }
};

export const getAllUsers = async () => {
  try {
    await connectToDB();
    var users = await User.find({ role: "user" }).exec();
    if (!users) {
      return { status: 400, message: "Kullanıcı bulunamadı" };
    }
    return { status: 200, message: "Başarılı", users };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Bir hata oluştu" };
  }
};

export const saveLogIn = async (user: any) => {
  try {
    await connectToDB();
    const { _id } = user;
    let logIns = user.logIns as Date[];

    console.log(
      "🚀 ~ file: user.action.ts:93 ~ saveLogIn ~ logIns.length:",
      logIns.length
    );
    if (logIns.length >= 5) {
      logIns = logIns.slice(1);
    }
    console.log("🚀 ~ file: user.action.ts:98 ~ saveLogIn ~ logIns:", logIns);
    logIns.push(new Date());
    const result = await User.findByIdAndUpdate(
      _id,
      { logIns: logIns },
      { new: true }
    ).exec();
    if (!result) {
      return { status: 400, message: "Giriş kaydı eklenemedi." };
    }
    return { status: 200, message: "Giriş kaydı eklendi.", body: result };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Giriş kaydında bir hata oluştu." };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    await connectToDB();
    var user = await User.findOne({ email }).exec();
    if (!user) {
      return {
        status: 400,
        message: `${email} adresine sahip bir kullanıcı bulunmuyor`,
      };
    } else {
      return { status: 200, message: "Başarılı", body: user };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Bir hata oluştu" };
  }
};

export const getUserByID = async (id: string) => {
  try {
    await connectToDB();
    var user = await User.findById(id).exec();
    if (!user) {
      return {
        status: 400,
        message: `${id} kimliğine sahip bir kullanıcı bulunmuyor`,
      };
    } else {
      return { status: 200, message: "Başarılı", body: user };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Bir hata oluştu" };
  }
};

export const changePassword = async (email: string, password: string) => {
  try {
    await connectToDB();
    var user = await User.findOneAndUpdate(
      { email: email },
      { password: password },
      { returnDocument: "after" }
    ).exec();
    if (user) {
      return { status: 200, message: "Şifre değişimi başarılı", body: user };
    } else {
      return { status: 400, message: "Şifre değiştirilemedi" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Şifre değiştirilirken bir hata oluştu" };
  }
};

export const purchaseProduct = async (userID: any, productID: string) => {
  try {
    await connectToDB();
    const user = await User.findByIdAndUpdate(
      userID,
      {
        $addToSet: {
          ownedProducts: { productID: productID, purchaseDate: new Date() },
        },
      },
      { new: true }
    ).exec();
    if (!user) {
      return { status: 400, message: "Ürün satın alınamadı" };
    } else {
      console.log(user);
      return { status: 200, message: "Ürün satın alındı", body: user };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Ürün satın alınırken bir hata oluştu" };
  }
};

export const hasProduct = async (userID: any, productID: string) => {
  try {
    await connectToDB();
    const user = await User.findOne({
      _id: userID,
      ownedProducts: { $in: [productID] },
    }).exec();
    if (user) {
      return { status: 200, message: "Ürün kullanıcıda mevcut" };
    } else {
      return { status: 400, message: "Ürün kullanıcıda mevcut değil" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Ürün sorgulanırken bir hata oluştu" };
  }
};

export const productList = async (userID: any) => {
  try {
    await connectToDB();
    const user = await User.findById(userID).exec();
    if (user) {
      return {
        status: 200,
        message: "Ürünler listelendi",
        body: user.ownedProducts,
      };
    } else {
      return { status: 400, message: "Ürünler listelenemedi" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Ürünler listelenirken bir hata oluştu" };
  }
};
