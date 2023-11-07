import SignupSchema from "@/lib/validations/SignupSchema";
import { FaEnvelope, FaUserAlt } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import * as z from "zod";
import { set, useForm } from "react-hook-form";
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
import { signupUser } from "@/lib/actions/user.action";
import { Toast } from "@/lib/utils";
import { useRouter } from "next/navigation";

const SignupCard = ({ toggle }: { toggle: Function }) => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      address: "",
      city: "",
      district: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    alert(JSON.stringify(values, null, 2));
    console.log("VALUES: ", values);
    const response = await signupUser({
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
      phone: values.phone,
      address: values.address,
      city: values.city,
      district: values.district,
    });

    if (response.status === 200) {
      Toast.fire({
        icon: "success",
        title: response.message,
      });
      form.reset();
      toggle("login");
    } else {
      Toast.fire({
        icon: "error",
        title: response.message,
      });
    }
  }
  return (
    <>
      <section className="w-full md:h-full h-[47rem]">
        {/* <div className="w-10/12 h-full "> */}
        <div className="md:grid h-full md:grid-cols-3 max-md:grid-cols-1 bg-white shadow-xl md:rounded-3xl rounded-t-3xl">
          <div className="md:col-span-2 p-10">
            <h1 className="font-extrabold text-4xl max-sm:text-2xl max-md:mb-4">
              <span className="text-blue-300">Şirket</span> İsmi
            </h1>
            <div className="h-full grid grid-cols-1 text-center content-center justify-items-center gap-6">
              {/* <div className="text-center mt-8"> */}
              {/* <div className="flex flex-col items-center gap-12"> */}
              <h1 className="text-blue-300 font-extrabold text-6xl max-sm:text-4xl">
                Kayıt Ol
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex bg-slate-100 items-center justify-center">
                              <FaUserAlt className="text-3xl text-slate-400 mx-3 min-h-[20px] min-w-[20px]" />
                              <Input
                                placeholder="Ad"
                                className="basis-full border-0 focus-visible:ring-transparent py-3 text-lg px-4 bg-slate-100"
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
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex bg-slate-100 items-center justify-center">
                              <FaUserAlt className="text-3xl text-slate-400 mx-3 min-h-[20px] min-w-[20px]" />
                              <Input
                                placeholder="Soyad"
                                className="basis-full border-0 focus-visible:ring-transparent py-3 text-lg px-4 bg-slate-100"
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex bg-slate-100 items-center justify-center">
                              <FaEnvelope className="text-3xl text-slate-400 mx-3 min-h-[20px] min-w-[20px]" />
                              <Input
                                type="email"
                                placeholder="E-posta"
                                className="basis-full border-0 focus-visible:ring-transparent py-3 text-lg px-4 bg-slate-100"
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
                                className="basis-full border-0 focus-visible:ring-transparent py-3 text-lg px-4 bg-slate-100"
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
                                placeholder="Şifre Tekrar"
                                className="basis-full border-0 focus-visible:ring-transparent py-3 text-lg px-4 bg-slate-100"
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
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex bg-slate-100 items-center justify-center">
                              <MdLockOutline className="text-3xl text-slate-400 mx-3  min-h-[20px] min-w-[20px]" />
                              <Input
                                type="text"
                                placeholder="Adres"
                                className="basis-full border-0 focus-visible:ring-transparent py-3 text-lg px-4 bg-slate-100"
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex bg-slate-100 items-center justify-center">
                              <MdLockOutline className="text-3xl text-slate-400 mx-3  min-h-[20px] min-w-[20px]" />
                              <Input
                                type="text"
                                placeholder="Telefon"
                                className="basis-full border-0 focus-visible:ring-transparent py-3 text-lg px-4 bg-slate-100"
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
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex bg-slate-100 items-center justify-center">
                              <MdLockOutline className="text-3xl text-slate-400 mx-3  min-h-[20px] min-w-[20px]" />
                              <Input
                                type="text"
                                placeholder="İl"
                                className="basis-full border-0 focus-visible:ring-transparent py-3 text-lg px-4 bg-slate-100"
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
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex bg-slate-100 items-center justify-center">
                              <MdLockOutline className="text-3xl text-slate-400 mx-3  min-h-[20px] min-w-[20px]" />
                              <Input
                                type="text"
                                placeholder="İlçe"
                                className="basis-full border-0 focus-visible:ring-transparent py-3 text-lg px-4 bg-slate-100"
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
                      Kayıt Ol
                    </Button>
                  </form>
                </Form>
                {/* <div className="flex bg-slate-100 items-center justify-center">
                  <FaUserAlt className="text-3xl text-slate-400 mx-3 min-h-[20px] min-w-[20px]" />
                  <input
                    placeholder="Kullanıcı Adı"
                    type="email"
                    className="basis-full outline-none py-4 px-4 bg-slate-100"
                  />
                </div>

                <div className="flex bg-slate-100 items-center justify-center">
                  <FaEnvelope className="text-3xl text-slate-400 mx-3 min-h-[20px] min-w-[20px]" />
                  <input
                    placeholder="E-posta"
                    type="email"
                    className="basis-full py-4 px-4 bg-slate-100"
                  />
                </div>

                <div className="flex bg-slate-100 items-center justify-center">
                  <MdLockOutline className="text-3xl text-slate-400 mx-3  min-h-[20px] min-w-[20px]" />
                  <input
                    placeholder="Şifre"
                    type="password"
                    className="basis-full py-4 px-4 bg-slate-100"
                  />
                </div>

                <div className="flex bg-slate-100 items-center justify-center">
                  <MdLockOutline className="text-3xl text-slate-400 mx-3  min-h-[20px] min-w-[20px]" />
                  <input
                    placeholder="Şifre Tekrar"
                    type="password"
                    className="basis-full py-4 px-4 bg-slate-100"
                  />
                </div>
                <button className="py-2 px-8 bg-blue-300 rounded-2xl hover:bg-blue-500 text-white">
                  Kayıt Ol
                </button> */}
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>

          <div className="p-10 max-md:p-20 md:col-span-1 bg-blue-300 text-center md:grid content-center md:rounded-e-3xl max-md:rounded-b-3xl">
            <div className="grid justify-items-center gap-3">
              <h1 className="text-white font-extrabold text-4xl max-sm:text-2xl">
                Zaten Bir Hesabın Var Mı?
              </h1>
              <div className="w-1/12 h-1 bg-white" />
              <h1 className="text-white font-light">
                E-posta ve şifreni girerek hesabına giriş yap.
              </h1>
              <button
                onClick={() => toggle("login")}
                className="py-2 px-8 bg-blue-300 rounded-2xl border-2 border-slate-100 hover:bg-blue-500 text-white"
              >
                Giriş Yap
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>
    </>
  );
};

export default SignupCard;
