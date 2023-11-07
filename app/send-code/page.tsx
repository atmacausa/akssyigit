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
  FormDescription,
} from "@/components/ui/form";
import { FaEnvelope } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdLockOutline } from "react-icons/md";
import EmailSchema from "@/lib/validations/EmailSchema";
import { getUserByEmail } from "@/lib/actions/user.action";
import { Toast } from "@/lib/utils";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof EmailSchema>) => {
    console.log(values);
    const response = await getUserByEmail(values.email);
    if (response.status === 200) {
      const { name, surname, _id } = response.body;
      const mailResponse = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          name: name,
          surname: surname,
        }),
      });

      if (mailResponse.ok) {
        Toast.fire({
          icon: "success",
          title: "Doğrulama kodu e-posta adresinize gönderildi",
        });
        router.push(`/forgot-password?id=${_id}`);
      } else {
        const { message } = await mailResponse.json();
        Toast.fire({
          icon: "error",
          title: message,
        });
      }
    } else {
      Toast.fire({
        icon: "error",
        title: response.message,
      });
    }
  };

  return (
    <>
      <section className="flex items-center min-h-screen xl:px-96 md:px-40 max-md:px-10">
        <div className="bg-white p-10 space-y-3 rounded-3xl w-full h-fit">
          <h1 className="text-blue-300 text-center font-extrabold pb-5 text-3xl max-sm:text-4xl">
            Lütfen kayıtlı olan e-posta adresinizi giriniz
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                    <FormDescription className="text-left">
                      E-posta adresinize bir doğrulama kodu gönderilecektir.
                    </FormDescription>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="py-2 px-8 bg-blue-300 rounded-2xl border-slate-100 hover:bg-blue-500 text-white w-full"
              >
                Gönder
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
};

export default page;
