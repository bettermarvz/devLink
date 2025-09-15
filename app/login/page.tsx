"use client";

import { Input } from "@/components/ui/input";
import Form from "next/form";
import CustomButton from "../components/addLinkButton";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async (data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("Login error:", error.message);
      return;
    }

    if (user) {
      // ✅ session cookie is now set automatically
      router.replace("/dashboard");
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
        <p className="text-white  text-2xl mb-10">
          One profile. All your dev links.
        </p>

        {/* Email/password login */}
        <Form action={handleSignIn} className="flex flex-col gap-2 w-full">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="bg-white border-0"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="bg-white border-0"
          />
          <CustomButton type="submit" label="Log in" />
        </Form>

        {/* signup */}
        <p className="text-white mt-10">
          No account yet?{" "}
          <Link href="/signup" className="underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
