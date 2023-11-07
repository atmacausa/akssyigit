"use server";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// function authMiddleware(request) {
//   return withAuth({
//     callbacks: {
//       authorized: ({ req, token }) => {
//         console.log("🚀 ~ file: middleware.js:6 ~ req:", req.nextUrl.pathname);
//         console.log("🚀 ~ file: middleware.js:6 ~ token:", token);
//         if (req.nextUrl.pathname.includes("/dashboard")) {
//           return token?.user.role === "admin";
//         } else if (req.nextUrl.pathname.includes("/user-dashboard")) {
//           return token?.user.role === "user";
//         }
//         return Boolean(token);
//       },
//     },
//   });
// }

export default withAuth(
  async function middleware(request: NextRequest) {
    //const token = request.nextauth.token;
    if (request.nextUrl.pathname.includes("/forgot-password")) {
      if (cookies().get("passwordReset")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(process.env.NEXTAUTH_URL as string);
      }
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        //console.log("TOKEN:", token);
        //console.log("COOKIE:", req.cookies.getAll());

        if (
          req.nextUrl.pathname.includes("/dasboard") ||
          req.nextUrl.pathname.includes("user")
        ) {
          if (token) {
            //console.log("🚀 ~ file: middleware.js:6 ~ token:", token);
            if (req.nextUrl.pathname.includes("/dashboard")) {
              return token?.user.role === "admin";
            } else if (req.nextUrl.pathname.includes("user")) {
              return token?.user.role === "user";
            }
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
    },
  }
);

// function middleware(request: NextRequest) {
//   authMiddleware(request);
//   //console.log("Arguments:", arguments);
//   if (request.nextUrl.pathname.includes("/forgot-password")) {
//     let cookie = request.cookies.get("vercel");
//     console.log("Cookie test:", cookie);
//     console.log("Token test:", request.cookies.getAll());
//     request.cookies.delete("vercel");
//     if (cookie) {
//       return NextResponse.next();
//     } else {
//       // const response = NextResponse.next();
//       // response.cookies.set("vercel", "test", {
//       //   path: "/",
//       //   maxAge: 60 * 60 * 24 * 365,
//       // });
//       // cookie = response.cookies.get("vercel");
//       // console.log("Cookie test2:", cookie);
//       return NextResponse.redirect(process.env.NEXTAUTH_URL as string);
//     }
//   }
// }

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/user-dashboard/:path*",
    "/user-products/:path*",
    "/forgot-password/:path*",
    "/send-code/:path*",
    "/",
  ],
};
