"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { addNewPasswordRecord } from "@/lib/actions/reset-password.actions";
var nodemailer = require("nodemailer");

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { email, name, surname } = body;

    // fetch("/api/send-email/create-cookie", {
    //   method: "POST",
    // });

    cookies().set({
      maxAge: 60 * 60,
      path: "/",
      httpOnly: true,
      name: "passwordReset",
      value: "ok",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const code = Math.floor(Math.random() * (999999 - 100000) + 100000);

    var mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: `${name} ${surname} - Şifre Değişim Talebi`,
      text: `${code} kodunu kullanarak şifrenizi değiştirebilirsiniz.`,
    };

    const responseMail = await transporter.sendMail(mailOptions);

    console.log("API mail response:", responseMail);

    if (responseMail.accepted) {
      try {
        const response = await addNewPasswordRecord(email, code);

        if (!response) {
          return NextResponse.json(
            {
              message:
                "Mail gönderimi başarılı ancak süreç işlerken bir sorunla karşılaşıldı. Lütfen tekrar deneyiniz.",
            },
            { status: 400 }
          );
        }
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          {
            message:
              "Mail gönderimi başarılı ancak süreç işlerken bir sorunla karşılaşıldı. Lütfen tekrar deneyiniz.",
          },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { message: "Mail gönderimi başarılı" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Mail gönderimi başarısız" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("API mail error:", error);
    return NextResponse.json({ message: "Mail API error" }, { status: 503 });
  }
};
