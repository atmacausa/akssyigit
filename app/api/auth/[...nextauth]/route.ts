import { loginUser } from "@/lib/actions/user.action";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        // console.log(
        //   "🚀 ~ file: route.ts:17 ~ authorize ~ credentials:",
        //   credentials
        // );

        return {
          ...credentials,
          password: undefined,
          redirect: undefined,
          callbackUrl: undefined,
          json: undefined,
        };

        // try {
        //   const response = await loginUser({
        //     email: credentials?.email,
        //     password: credentials?.password,
        //   });

        //   if (response.status === 200) {
        //     Toast.fire({
        //       icon: "success",
        //       title: response.message,
        //     });
        //     return response.user;
        //   } else {
        //     return false;
        //   }
        // } catch (error) {
        //   console.log(error);
        //   return false;
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token = {
          ...token,
          user: { ...user },
        };
      }
      //console.log("🚀 ~ file: route.ts:61 ~ jwt ~ token:", token);
      return token;
    },
    async session({ session, token }) {
      // if (JSON.stringify(session.user)) {
      //   await connectToDB();
      //   const response = await User.findOne({
      //     email: session?.user?.email,
      //   });
      //   console.log("🚀 ~ file: route.ts:45 ~ session ~ response:", response);
      //   if (response) {
      //     const sessionUser = response;
      //     session.user = {
      //       email: sessionUser.email,
      //       username: sessionUser.username,
      //       role: sessionUser.role,
      //       _id: sessionUser._id,
      //     };
      //   } else {
      //     session.user = undefined;
      //   }
      //   return session;
      // }
      if (token?.user) {
        session.user = token.user;
      }
      // console.log(
      //   "🚀 ~ file: route.ts:77 ~ session ~ session.user:",
      //   session.user
      // );

      return session;
    },
  },

  pages: {
    signIn: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
