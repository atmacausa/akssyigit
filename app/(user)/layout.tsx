"use client";

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { data, status } = useSession();
  //if (status.toString() === "unauthenticated") redirect("/");
  //if (data?.user?.role === "admin") redirect("/dashboard");
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex-grow-0">
        <Navbar />
      </div>
      <div className="flex-1 flex">{children}</div>
    </div>
  );
};

export default layout;
