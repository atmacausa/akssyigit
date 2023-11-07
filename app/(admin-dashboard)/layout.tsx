"use client";

import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { data, status } = useSession();
  //if (status.toString() === "unauthenticated") redirect("/");
  //if (data?.user?.role === "user") redirect("/user-dashboard");
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex-grow-0">
        <Navbar />
      </div>
      <div className="flex-1 flex">
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default layout;
