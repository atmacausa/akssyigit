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
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const page = () => {
  const [products, setProducts] = useState<any>([]);

  const router = useRouter();

  useEffect(() => {
    const handleProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
      console.log(
        "🚀 ~ file: page.tsx:7 ~ handleProducts ~ products",
        allProducts
      );
    };
    handleProducts();
  }, []);
  return (
    <>
      <div className="p-4 flex-1">
        <h1 className="text-4xl p-4 font-bold italic">Ürünler</h1>
        <div className="text-end mb-3">
          <Button onClick={() => router.push("/dashboard/products/new")}>
            Ürün Ekle
          </Button>
        </div>
        <div className="grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 gap-3">
          {products?.map((product: any) => {
            const imagePath = JSON.parse(product.image);
            return (
              <Card
                key={product._id}
                className="transition duration-300 ease-in-out hover:scale-105 cursor-pointer shadow-md"
              >
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
                    {Object.values(imagePath).map((image: any) => {
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
                  {/* <Image
                    src={imagePath[1] || "/pictures/placeholder-image.png"}
                    alt="Ürün Görseli"
                    width={2000}
                    height={2000}
                    className="rounded-md object-contain w-full h-[10rem]"
                  /> */}
                </CardContent>
                <CardFooter>
                  <p>{product.price}₺</p>
                </CardFooter>
              </Card>
            );
          })}
          <Card>
            <CardHeader>
              <CardTitle>Ürün 1</CardTitle>
              <CardDescription>Ürün Açıklaması</CardDescription>
            </CardHeader>
            <CardContent>
              <p>İçerik</p>
            </CardContent>
            <CardFooter>
              <p>Bitiriş</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default page;
