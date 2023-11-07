"use client";

import { useState } from "react";
import LoginCard from "../components/LoginCard";
import SignupCard from "../components/SignupCard";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [choice, setChoice] = useState("login");

  return (
    <main
      className={classNames(
        "grid min-w-fit content-center px-60 max-xl:px-20 max-lg:py-20 max-lg:px-12 max-md:px-3 max-md:py-5 min-h-screen",
        choice == "login" ? "py-24" : "py-0"
      )}
    >
      <div className="py-3">
        {choice === "login" ? (
          <LoginCard toggle={setChoice} />
        ) : (
          <SignupCard toggle={setChoice} />
        )}
      </div>
    </main>
  );
}
