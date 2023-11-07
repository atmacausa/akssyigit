"use server";
import { connectToDB } from "../mongoose";
import ResetPassword from "../models/reset-password.model";

export const addNewPasswordRecord = async (email: string, code: number) => {
  try {
    await connectToDB();
    const newRecord = await ResetPassword.create({
      email: email,
      code: code.toString(),
    });
    return newRecord;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCodeDetails = async (code: string) => {
  try {
    await connectToDB();
    const codeObject = await ResetPassword.findOne({ code: code }).exec();
    if (codeObject) {
      return { status: 200, message: "Kod objesi alındı", body: codeObject };
    } else {
      return { status: 400, message: "Kod objesi bulunamadı" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Kod objesi alınamadı" };
  }
};
