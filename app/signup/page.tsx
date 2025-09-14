"use client";

import Form from "next/form";
import React from "react";
import CustomButton from "../components/addLinkButton";
import { isLoggedIn, signUp } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";

const SignUp = () => {
  //   const user  = isLoggedIn();

  //   if (user) {
  //     console.log(user);
  //   }

  const handleSignUp = async (data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;
    const username = data.get("username") as string;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const user = await signUp({ email, password, username });

    if (user) {
      window.location.href = "/dashboard"; // redirect after successful signup
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary p-4">
      <div className="flex flex-col items-center text-center max-w-xs w-full">
        {/* Logo */}
        <div className="box-border content-stretch flex gap-1.5 items-center justify-start p-0 relative shrink-0">
          <div className="font-['Inter:Black',_sans-serif] font-black leading-[0] not-italic relative shrink-0 text-[#343434] text-[20px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">DevLink</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-white text-3xl font-bold mb-2">
          Welcome to DevLink
        </h1>

        {/* Subtitle */}
        <p className="text-white text-2xl mb-10">
          One profile. All your dev links.
        </p>

        <Form action={handleSignUp} className="flex flex-col gap-2 w-full">
          <Input type="email" name="email" placeholder="Email" />
          <Input type="text" name="username" placeholder="Username" />
          <Input type="password" name="password" placeholder="Password" />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
          />
          <CustomButton type="submit" label="SignUp" />
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
