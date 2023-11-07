"use client";

import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/actions/product.action";
import { productList, purchaseProduct } from "@/lib/actions/user.action";
import { Toast } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";

const page = ({ params }: any) => {
  const [product, setProduct] = useState({});
  const [ownedProducts, setOwnedProducts] = useState<any>([]);
  const { data: session } = useSession();

  const handleProductList = async () => {
    const response = await productList(session?.user?._id);
    console.log("RESPONSE", session);
    if (response.status == 200) {
      setOwnedProducts(response.body);
    }
  };

  const handlePurchase = async (e: any) => {
    try {
      const response = await purchaseProduct(session?.user?._id, e.target.id);
      if (response.status == 200) {
        Toast.fire({
          icon: "success",
          title: response.message,
        });
        setOwnedProducts([...ownedProducts, e.target.id]);
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

  useEffect(() => {
    const handleProduct = async () => {
      const res = await getProduct(params.id);
      if (res) {
        setProduct(res);
        console.log(
          "🚀 ~ file: page.tsx:7 ~ handleProduct ~ res",
          JSON.parse(res.image)
        );
      } else {
        Toast.fire({
          icon: "error",
          title: "Ürün bulunamadı.",
        });
      }
    };
    handleProduct();
    handleProductList();
  }, [session]);

  return (
    product.name && (
      <>
        <div className="flex w-full justify-center">
          <div className="p-4 pt-20 flex flex-col items-center">
            {/* <h1 className="text-4xl p-4 font-bold italic">
              {product.name || "Ürün İsmi"}
            </h1> */}
            {/* <Image
          src={product.image || "/pictures/placeholder-image.png"}
          alt={product.name || "Ürün Görseli"}
          width={1000}
          height={1000}
          className="rounded-sm w-6/12 object-contain"
        /> */}
            <Carousel
              autoPlay
              showThumbs={true}
              infiniteLoop
              showStatus={false}
              dynamicHeight
              width={500}
            >
              {Array.from(Object.values(JSON.parse(product.image))).map(
                (image: any) => {
                  return (
                    <div key={image}>
                      <img
                        src={image || "/pictures/placeholder-image.png"}
                        alt={product.name || "Ürün Görseli"}
                        className="object-contain w-full"
                      />
                    </div>
                  );
                }
              )}
            </Carousel>
            {/* <p className="text-lg my-5 max-w-[50%]">{product.description}</p>
            <div className="flex w-6/12 justify-end gap-3 items-center">
              <p className="text-lg">{product.price} ₺</p>
              <Button>Satın Al</Button>
            </div> */}
          </div>
          <div className="p-4 pt-20">
            <div className="p-4 bg-gray-100 ring-slate-300 ring-1 rounded-md shadow-lg">
              <h1 className="text-4xl p-4 ps-0 pt-0 font-bold italic">
                {product.name || "Ürün İsmi"}
              </h1>
              <p className="text-lg my-5 max-w-[50%]">{product.description}</p>
              <div className="flex justify-end gap-3 items-center">
                <p className="text-lg">{product.price} ₺</p>
                {ownedProducts.includes(product._id) ? (
                  <Button disabled>Satın Alındı</Button>
                ) : (
                  <Button id={product._id} onClick={(e) => handlePurchase(e)}>
                    Satın Al
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default page;
