"use client";

import Dashboard from "@/components/Dashboard";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import AdminDashboard from "@/components/AdminDashboard";

const page = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default page;
