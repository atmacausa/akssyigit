"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginSchema from "@/lib/validations/LoginSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FaEnvelope } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdLockOutline } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ResetPasswordSchema from "@/lib/validations/ResetPasswordSchema";
import { removeCookie } from "@/lib/actions/cookie.actions";
import { get } from "http";
import { changePassword, getUserByID } from "@/lib/actions/user.action";
import { getCodeDetails } from "@/lib/actions/reset-password.actions";
import { Toast } from "@/lib/utils";
import { useRouter } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    console.log(searchParams.get("id"));
  }, [searchParams]);
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      code: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    console.log(values);
    try {
      const id = searchParams.get("id");
      const { body: user } = await getUserByID(id as string);
      console.log(user);
      const codeObject = await getCodeDetails(values.code);
      if (codeObject.status !== 200) {
        Toast.fire({
          icon: "error",
          title: "Geçersiz kod",
        });
      } else if (!user) {
        Toast.fire({
          icon: "error",
          title: "Referans yapılan kullanıcı bulunamadı",
        });
      } else {
        if (user.email !== codeObject.body.email) {
          Toast.fire({
            icon: "error",
            title: "Bu kod geçerli e-posta için kullanılamaz",
          });
        } else {
          const response = await changePassword(user.email, values.password);
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: "Şifre başarıyla değiştirildi",
            });
            setTimeout(() => {
              router.replace("/");
            }, 3000);
          } else {
            Toast.fire({
              icon: "error",
              title: response.message,
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        title: "Bir hata oluştu (forgot-password)",
      });
    }
    //await removeCookie("passwordReset");
  };

  return (
    <>
      <section className="flex items-center min-h-screen xl:px-96 md:px-40 max-md:px-10">
        <div className="bg-white p-10 space-y-3 rounded-3xl w-full h-fit">
          <h1 className="text-blue-300 font-extrabold pb-5 text-6xl max-sm:text-4xl">
            Şifreyi Değiştir
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex bg-slate-100 items-center justify-center">
                        <FaEnvelope className="text-3xl text-slate-400 mx-3 min-h-[20px] min-w-[20px]" />
                        <Input
                          placeholder="Doğrulama kodu"
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
                          placeholder="Yeni şifre"
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
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex bg-slate-100 items-center justify-center">
                        <MdLockOutline className="text-3xl text-slate-400 mx-3  min-h-[20px] min-w-[20px]" />
                        <Input
                          type="password"
                          placeholder="Yeni şifre tekrar"
                          className="basis-full border-0 focus-visible:ring-transparent py-6 text-lg px-4 bg-slate-100"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="py-2 px-8 bg-blue-300 rounded-2xl border-slate-100 hover:bg-blue-500 text-white w-full"
              >
                Onayla
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
};

export default page;
