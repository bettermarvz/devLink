"use client";

import Form from "next/form";
import React from "react";
import CustomButton from "../components/addLinkButton";
import { signUp } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import Link from "next/link";

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
          <div className="font-['Inter:Black',_sans-serif] font-black leading-[0] not-italic relative shrink-0 text-white text-4xl text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">DevLink</p>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-white text-2xl mb-10">
          One profile. All your dev links.
        </p>

        <Form action={handleSignUp} className="flex flex-col gap-2 w-full">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-white border-0"
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            className="bg-white border-0"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-white border-0"
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="bg-white border-0"
          />
          <CustomButton type="submit" label="Sign Up" />
        </Form>

        {/* login */}
        <p className="text-white mt-10">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
