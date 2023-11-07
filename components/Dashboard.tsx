import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Toast } from "@/lib/utils";
// import { sendEmail } from "@/lib/utils";

const Dashboard = () => {
  const { data }: any = useSession();

  const handleEmail = async () => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify({
          email: data?.user?.email,
          name: data?.user?.name,
          surname: data?.user?.surname,
        }),
      });
      if (res.ok) {
        Toast.fire({
          icon: "success",
          title: "Mail gönderildi.",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Mail gönderilemedi.",
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "info",
        title: "Mail gönderilemedi.",
      });
    }
  };

  return (
    <>
      <div className="text-center w-full self-center">
        <h1 className="text-4xl font-extrabold italic">Kullanıcı Bilgileri</h1>
        <pre className="text-start m-9 whitespace-pre-wrap">
          {/* {`id: ${data?.user?._id}`} <br /> {`email: ${data?.user?.email}`}{" "}
          <br />
          {`username: ${data?.user?.username}`}
          <br />
          {`role: ${data?.user?.role}`} */}
          {JSON.stringify(data?.user, null, 2)}
        </pre>

        <Button
          onClick={() => {
            signOut();
          }}
        >
          Çıkış Yap
        </Button>
        <Button onClick={handleEmail} className="ms-3">
          Mail Gönder
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
