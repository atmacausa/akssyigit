"use client";

import { getAllUsers } from "@/lib/actions/user.action";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const router = useRouter();

  const handleUsers = async () => {
    router.push("/dashboard/users");
  };

  const handleProducts = async () => {
    router.push("/dashboard/products");
  };

  return (
    <div className="h-full w-max">
      <ul className="w-full ms-0 text-center p-4">
        <li className="my-3">
          <button
            onClick={handleProducts}
            className=" w-full rounded-lg outline outline-black hover:bg-gray-800 hover:text-white hover:outline-none py-2 px-12"
          >
            Ürünler
          </button>
        </li>
        <li className="my-3">
          <button className=" w-full rounded-lg outline outline-black hover:bg-gray-800 hover:text-white hover:outline-none py-2 px-12">
            Kategoriler
          </button>
        </li>
        <li className="my-3">
          <button
            onClick={handleUsers}
            className=" w-full rounded-lg outline outline-black hover:bg-gray-800 hover:text-white hover:outline-none py-2 px-12"
          >
            Kullanıcılar
          </button>
        </li>
        <li className="my-3">
          <button className=" w-full rounded-lg outline outline-black hover:bg-gray-800 hover:text-white hover:outline-none py-2 px-12">
            Siparişler
          </button>
        </li>
        <Separator className="bg-black" />
      </ul>
    </div>
  );
};

export default SideBar;
