import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  console.log("DATA:", data);
  try {
    await connectToDB();
    if (!data) {
      return NextResponse.json(
        { message: "Request verisi bulunamadı" },
        { status: 400 }
      );
    }
    const { name, price, description, creator } = data;
    await Product.create(data);
    return NextResponse.json(
      { message: "Ürün başarıyla eklendi" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    NextResponse.json(
      { message: "Ürün eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
};
