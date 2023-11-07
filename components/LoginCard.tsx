"use client";

import LoginSchema from "@/lib/validations/LoginSchema";
import { FaEnvelope, FaUserAlt } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser, saveLogIn } from "@/lib/actions/user.action";
import { Toast } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

// 1. Define your form.
const LoginCard = ({ toggle }: { toggle: Function }) => {
  const { data, status }: { data: any; status: any } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (data?.user?.role === "admin") {
        redirect("/dashboard");
      } else {
        redirect("/user-dashboard");
      }
    }
  }, [status]);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    //e.preventDefault();

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // try {
    //   const response = await fetch("/api/login", {
    //     method: "POST",
    //     body: JSON.stringify({ ...values }),
    //   });
    //   console.log(
    //     "🚀 ~ file: LoginCard.tsx:46 ~ onSubmit ~ response:",
    //     await response.json()
    //   );
    // } catch (error) {
    //   console.log(error);
    // }

    const response = await loginUser({
      email: values.email,
      password: values.password,
    });
    console.log("🚀 ~ file: LoginCard.tsx:62 ~ onSubmit ~ response:", response);

    if (response.status === 200) {
      await saveLogIn(response.user);
      await signIn("credentials", {
        ...response.user,
        redirect: false,
      });
      router.push("/dashboard");
    } else {
      Toast.fire({
        icon: "error",
        title: response.message,
      });
    }

    // const response = await signIn("credentials", {
    //   email: values.email,
    //   password: values.password,
    //   redirect: false,
    // });

    // if (response?.error) {
    //   Toast.fire({
    //     icon: "error",
    //     title: "E-posta veya şifre hatalı",
    //   });
    // } else {
    //   //router.push("/dashboard");
    // }
    console.log("🚀 ~ file: LoginCard.tsx:64 ~ onSubmit ~ response:", response);
    console.log("🚀 ~ file: LoginCard.tsx:64 ~ onSubmit ~ data:", data);

    // const res = await signIn("credentials", {
    //   email: values.email,
    //   password: values.password,
    //   redirect: false,
    // });
    // console.log("🚀 ~ file: LoginCard.tsx:47 ~ onSubmit ~ response:", res);

    form.reset();
  }

  return (
    <>
      {status.toString() === "unauthenticated" ? (
        <section className="w-full md:h-full">
          {/* <div className="w-10/12 h-full "> */}
          <div className="md:grid h-full md:grid-cols-3 max-md:grid-cols-1 bg-white shadow-xl rounded-3xl overflow-hidden">
            <div className="md:col-span-2 p-10 ">
              <h1 className="font-extrabold text-4xl max-sm:text-2xl max-md:mb-4">
                <span className="text-blue-300">Şirket</span> İsmi
              </h1>
              <div className="h-full grid grid-cols-1 text-center content-center justify-items-center gap-6">
                {/* <div className="text-center mt-8"> */}
                {/* <div className="flex flex-col items-center gap-12"> */}
                <h1 className="text-blue-300 font-extrabold text-6xl max-sm:text-4xl">
                  Hesaba Giriş Yap
                </h1>

                <div className="w-1/12 h-1 bg-blue-300" />

                <div className="grid gap-3 grid-cols-1 w-7/12 max-lg:w-full">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-3"
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex bg-slate-100 items-center justify-center">
                                <FaEnvelope className="text-3xl text-slate-400 mx-3 min-h-[20px] min-w-[20px]" />
                                <Input
                                  placeholder="E-posta"
                                  className="basis-full border-0 focus-visible:ring-transparent py-6 text-lg px-4 bg-slate-100"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-left" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex bg-slate-100 items-center justify-center">
                                <MdLockOutline className="text-3xl text-slate-400 mx-3  min-h-[20px] min-w-[20px]" />
                                <Input
                                  type="password"
                                  placeholder="Şifre"
                                  className="basis-full border-0 focus-visible:ring-transparent py-6 text-lg px-4 bg-slate-100"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-left" />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant={"link"}
                          className="p-0"
                          onClick={() => router.push("/send-code")}
                        >
                          Şifremi Unuttum
                        </Button>
                      </div>

                      <Button
                        type="submit"
                        className="py-2 px-8 bg-blue-300 rounded-2xl border-slate-100 hover:bg-blue-500 text-white w-full"
                      >
                        Giriş Yap
                      </Button>
                    </form>
                  </Form>
                </div>
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>

            <div className="p-10 max-md:p-20 md:col-span-1 bg-blue-300 text-center md:grid content-center">
              <div className="grid justify-items-center gap-3">
                <h1 className="text-white font-extrabold text-4xl max-sm:text-2xl">
                  Hesabın Yok Mu?
                </h1>
                <div className="w-1/12 h-1 bg-white" />
                <h1 className="text-white font-light">
                  Formu doldurarak kayıt olabilirsin.
                </h1>
                <button
                  onClick={() => toggle("signup")}
                  className="py-2 px-8 bg-blue-300 rounded-2xl border-2 border-slate-100 hover:bg-blue-500 text-white"
                >
                  Kayıt Ol
                </button>
              </div>
            </div>
          </div>
          {/* </div> */}
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default LoginCard;
