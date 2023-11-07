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
import { getProducts } from "@/lib/actions/product.action";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { productList, purchaseProduct } from "@/lib/actions/user.action";
import { useSession } from "next-auth/react";
import { Toast } from "@/lib/utils";
import Loading from "@/components/Loading";
import { set } from "mongoose";

const page = () => {
  const [products, setProducts] = useState<any>([]);
  const [ownedProducts, setOwnedProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = (id: string) => {
    router.push(`/products/product/${id}`);
  };

  const isPurchased = (id: string) => {
    for (let i = 0; i < ownedProducts.length; i++) {
      //console.log(ownedProducts[i][0].productID);
      if (ownedProducts[i][0].productID == id) {
        return true;
      }
    }
    return false;
  };

  const handlePurchase = async (e: any) => {
    try {
      const response = await purchaseProduct(session?.user?._id, e.target.id);
      if (response.status == 200) {
        Toast.fire({
          icon: "success",
          title: response.message,
        });
        setOwnedProducts([
          ...ownedProducts,
          [{ productID: e.target.id, purchaseDate: new Date() }],
        ]);
      } else {
        Toast.fire({
          icon: "error",
          title: response.message,
        });
      }
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        title: "Satın alım sırasında bir hata oluştu.",
      });
    }
  };

  const handleProductList = async () => {
    const response = await productList(session?.user?._id);
    console.log(
      "🚀 ~ file: page.tsx:58 ~ handleProductList ~ response:",
      response
    );
    //console.log("RESPONSE", session);

    if (response.status == 200) {
      setOwnedProducts(response.body);
      setLoading(false);
    }

    //setLoading(false);
  };

  useEffect(() => {
    const handleProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
      console.log(
        "🚀 ~ file: page.tsx:7 ~ handleProducts ~ products",
        allProducts
      );
      handleProductList();
      console.log("OWNED PRODUCTS", ownedProducts);
    };
    //handleProductList();
    handleProducts();
    console.log("OWNED PRODUCTS", ownedProducts);
  }, [session]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loading></Loading>
      </div>
    );
  } else {
    return (
      <>
        <div className="p-4 flex-1">
          <h1 className="text-4xl p-4 font-bold italic">Ürünler</h1>
          <div className="grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 gap-3">
            <p
              className={
                "text-slate-400" + (products.length == 0 ? "" : " hidden")
              }
            >
              Ürün bulunamadı.
            </p>
            {products?.map((product: any) => {
              const images = Array.from(
                Object.values(JSON.parse(product.image))
              );
              // console.log(
              //   "🚀 ~ file: page.tsx:44 ~ {products?.map ~ images:",
              //   images
              // );
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
                  <CardFooter className="flex justify-between">
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

                      {isPurchased(product._id) ? (
                        <Button
                          disabled
                          className="transition duration-300 ease-in-out hover:scale-105"
                        >
                          Satın Alındı
                        </Button>
                      ) : (
                        <Button
                          id={product._id}
                          onClick={(e) => handlePurchase(e)}
                          className="transition duration-300 ease-in-out hover:scale-105"
                        >
                          Satın Al
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </>
    );
  }
};

export default page;
