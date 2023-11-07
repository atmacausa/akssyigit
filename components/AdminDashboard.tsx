"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import SideBar from "./SideBar";

const AdminDashboard = () => {
  const { data }: any = useSession();
  return (
    <>
      <div className="text-center w-full self-center">
        <h1 className="text-4xl font-extrabold italic">Kullanıcı Bilgileri</h1>
        <p className="text-center m-9">
          {`id: ${data?.user?._id}`} <br /> {`email: ${data?.user?.email}`}{" "}
          <br />
          {`username: ${data?.user?.username}`}
          <br />
          {`role: ${data?.user?.role}`}
        </p>

        <Button
          onClick={() => {
            signOut();
          }}
        >
          Çıkış Yap
        </Button>
      </div>
    </>
  );
};

export default AdminDashboard;
