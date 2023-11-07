"use client";

import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/lib/utils";
import LoginSchema from "@/lib/validations/LoginSchema";
import ProductSchema from "@/lib/validations/ProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";

const page = () => {
  const { data } = useSession();
  const [file, setFile] = useState<File[]>([]);

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "aaa",
      description: "bbb",
      price: "222",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ProductSchema>) {
    console.log("🚀 ~ file: page.tsx:34 ~ onSubmit ~ file:", file);
    try {
      if (!file || file.length == 0) {
        Toast.fire({
          icon: "error",
          title: "Lütfen bir dosya yükleyiniz.",
        });
        return;
      }

      if (file.length > 12) {
        Toast.fire({
          icon: "error",
          title: "Lütfen en fazla 12 dosya yükleyiniz.",
        });
        return;
      }

      file.forEach((element) => {
        if (element.type !== "image/jpeg" && element.type !== "image/png") {
          Toast.fire({
            icon: "error",
            title: `Lütfen jpeg veya png formatında bir dosya yükleyiniz. (${element.name})`,
          });
          return;
        }
      });

      const formData = new FormData();
      formData.append("folder", values.name);
      var i = 0;
      file.forEach((element, index) => {
        i++;
        formData.append(`file${index}`, element);
      });
      formData.append("count", i.toString());

      const fileResponse = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      if (!fileResponse.ok) {
        throw new Error(await fileResponse.text());
      }

      const { paths } = await fileResponse.json();

      const productResponse = await fetch("/api/product/new", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          creator: data?.user?._id,
          image: JSON.stringify(paths),
        }),
      });
      const body = await productResponse.json();
      console.log("🚀 ~ file: page.tsx:47 ~ onSubmit ~ body:", body);
      if (productResponse.ok) {
        Toast.fire({
          icon: "success",
          title: "Ürün başarıyla eklendi.",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Bir hata oluştu.",
        });
      }
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        title: "Bir hata oluştu.",
      });
    }

    //form.reset();
  }

  const handleFileClick = (e: any) => {
    const fileArray = Array.from(e.target.files);
    if (fileArray.length > 12) {
      Toast.fire({
        icon: "error",
        title: "Lütfen en fazla 12 dosya yükleyiniz.",
      });
      return;
    }
    console.log("FILES:", fileArray);
    if (file.length + fileArray.length > 12) {
      Toast.fire({
        icon: "error",
        title: "Lütfen en fazla 12 dosya yükleyiniz.",
      });
      return;
    }
    setFile(file.concat(fileArray as Array<File>));
  };

  const handleDeleteFile = (e: any) => {
    console.log("🚀 ~ file: page.tsx:34 ~ onSubmit ~ e:", e.target.id);

    setFile(file.filter((element) => element.name !== e.target.id));
    console.log(
      "🚀 ~ file: page.tsx:120 ~ handleDeleteFile ~ fileName?.id:",
      e.target.id
    );
  };

  return (
    <div className="p-4 flex-1 flex flex-col items-center">
      <h1 className="text-4xl p-4 font-bold italic mb-5">Yeni Ürün</h1>

      <div className="w-8/12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Başlık"
                      className="basis-full border-0 focus-visible:ring-transparent py-6 text-lg px-4 bg-slate-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Açıklama"
                      className="basis-full border-0 focus-visible:ring-transparent py-6 text-lg px-4 bg-slate-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ücret"
                      className="basis-full border-0 focus-visible:ring-transparent py-6 text-lg px-4 bg-slate-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="file">Görsel</Label>
                      <Input
                        accept="image/png, image/jpeg"
                        type="file"
                        id="file"
                        multiple
                        className="border-0 bg-slate-100 hidden"
                        onChange={(e) => {
                          handleFileClick(e);
                        }}
                      />
                      <div className="group">
                        <Button
                          size={"icon"}
                          className="border bg-purple-400 border-purple-400 group-hover:bg-white"
                          type="button"
                          onClick={() => {
                            document.getElementById("file")?.click();
                          }}
                        >
                          <PlusIcon className="h-4 w-4 fill-white group-hover:fill-purple-400" />
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />

            <div
              className={
                file.length != 0
                  ? `bg-slate-100 text-md px-4 py-2 rounded-md`
                  : "hidden"
              }
            >
              {file.map((element, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{element.name}</span>
                  <div className="flex items-center group">
                    <span>
                      {element.size / 1000 >= 1000
                        ? `${(element.size / 1000000).toFixed(1)} MB`
                        : `${(element.size / 1000).toFixed(1)} KB`}
                    </span>
                    <Button
                      type="button"
                      className="border bg-rose-400 border-rose-400 group-hover:bg-white rounded-full h-4 w-4 ms-2 p-0"
                      onClick={handleDeleteFile}
                      size={"sm"}
                      id={element.name}
                    >
                      <XMarkIcon
                        pointerEvents={"none"}
                        className="h-4 w-4 fill-white group-hover:fill-rose-400"
                      />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-4 gap-2 justify-items-center mt-3">
                {file.map((element, index) => (
                  <div key={index}>
                    <img
                      src={URL.createObjectURL(element)}
                      alt={element.name}
                      className="h-[8rem] object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="py-2 px-4 bg-blue-300 rounded-2xl border-slate-100 hover:bg-blue-500 text-white w-full"
            >
              Ekle
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
