"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { getAllUsers } from "@/lib/actions/user.action";
import { useEffect, useState } from "react";

const page = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const handleUsers = async () => {
      setResult(await getAllUsers());
      console.log(
        "🚀 ~ file: page.tsx:7 ~ handleUsers ~ result",
        result?.users
      );
    };
    handleUsers();
  }, []);
  return (
    <>
      <div className="w-full">
        <h1 className="text-4xl p-4 font-bold italic">Kullanıcılar</h1>
        {result?.users?.map((user) => {
          return (
            <div
              key={user.username}
              className="outline-2 outline-black h-fit rounded-md p-4"
            >
              <Accordion type="single" collapsible className="break-all">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    {user.username}, {user.email}
                  </AccordionTrigger>
                  <AccordionContent>
                    <pre className="text-slate-500">
                      {JSON.stringify(user, null, "\t")}
                    </pre>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default page;
