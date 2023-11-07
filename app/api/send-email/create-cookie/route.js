"use server";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const newResponse = NextResponse.next();
    newResponse.cookies.set("passwordReset", {
      maxAge: 60 * 60 * 24,
      path: req.nextUrl.pathname,
      httpOnly: true,
      value: "ok",
    });
    return newResponse;
  } catch (error) {
    return NextResponse.next();
  }
};
