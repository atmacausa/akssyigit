"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getProducts, getProductsByIDs } from "@/lib/actions/product.action";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { productList, purchaseProduct } from "@/lib/actions/user.action";
import { useSession } from "next-auth/react";
import { Toast } from "@/lib/utils";

const page = () => {
  //const [products, setProducts] = useState<any>([]);
  const [ownedProducts, setOwnedProducts] = useState<any>([]);

  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = (id: string) => {
    router.push(`/products/product/${id}`);
  };

  // const handlePurchase = async (e: any) => {
  //   try {
  //     const response = await purchaseProduct(session?.user?._id, e.target.id);
  //     if (response.status == 200) {
  //       Toast.fire({
  //         icon: "success",
  //         title: response.message,
  //       });
  //       setOwnedProducts([...ownedProducts, e.target.id]);
  //     } else {
  //       Toast.fire({
  //         icon: "error",
  //         title: response.message,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     Toast.fire({
  //       icon: "error",
  //       title: "Satın alım sırasında bir hata oluştu.",
  //     });
  //   }
  // };

  const handleProductList = async () => {
    const response = await productList(session?.user?._id);
    console.log(
      "🚀 ~ file: page.tsx:58 ~ handleProductList ~ response:",
      response
    );
    //console.log("RESPONSE", session);

    if (response.status == 200) {
      const products = await getProductsByIDs(response.body, true);
      if (products) {
        setOwnedProducts(products);
      }
    }
  };

  useEffect(() => {
    handleProductList();
    console.log("OWNED PRODUCTS", ownedProducts);
  }, [session]);
  return (
    <>
      <div className="p-4 flex-1">
        <h1 className="text-4xl p-4 font-bold italic">Satın Alınanlar</h1>
        <div className="grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 gap-3">
          <p
            className={
              "text-slate-400" + (ownedProducts.length == 0 ? "" : " hidden")
            }
          >
            Ürün bulunamadı.
          </p>
          {ownedProducts?.map((product: any) => {
            const images = Array.from(Object.values(JSON.parse(product.image)));
            console.log(
              "🚀 ~ file: page.tsx:44 ~ {products?.map ~ images:",
              images
            );
            return (
              <Card key={product._id} className="">
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription className="truncate">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Carousel
                    autoPlay
                    showThumbs={false}
                    infiniteLoop
                    showStatus={false}
                  >
                    {images.map((image: any) => {
                      return (
                        <div key={image}>
                          <img
                            src={image || "/pictures/placeholder-image.png"}
                            alt="Ürün Görseli"
                            className="object-contain w-full h-[10rem]"
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                  {/* <img
                    src={images[0] as string}
                    alt="Ürün Görseli"
                    className="object-contain w-full h-[10rem]"
                  /> */}
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <div className="flex justify-between w-full">
                    <p>{product.price}₺</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          router.push(`/user-products/product/${product._id}`)
                        }
                        className="transition duration-300 ease-in-out hover:scale-105"
                      >
                        Detay
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">
                      {product.purchaseDate}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;
