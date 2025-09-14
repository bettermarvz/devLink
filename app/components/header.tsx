// import { signOut } from "@/lib/supabaseClient";
import { LogOut, Share2 } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/supabaseClient";

// Header component with DevLink branding and action icons
export const signOut = async () => {
  const { error } = await createClientComponentClient().auth.signOut();
  if (error) throw error;
};
const Header = () => {
  const { currentUserData } = useCurrentUser();
  const router = useRouter();
  const handleSignOut = async () => {
    console.log("hello");
    try {
      await signOut();
      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="box-border content-stretch flex items-center justify-between p-0 relative size-full">
      <div className="box-border content-stretch flex gap-1.5 items-center justify-start p-0 relative shrink-0">
        <div className="font-['Inter:Black',_sans-serif] font-black leading-[0] not-italic relative shrink-0 text-[#343434] text-[20px] text-center text-nowrap">
          <p className="block leading-[normal] whitespace-pre">DevLink</p>
        </div>
      </div>
      <div className="box-border content-stretch flex gap-3 items-center justify-end p-0 relative shrink-0">
        <button className="relative shrink-0 size-6 p-0 bg-transparent border-none cursor-pointer">
          <Share2 size={24} color="#343434" />
        </button>
        {currentUserData && (
          <button
            onClick={handleSignOut}
            className="relative shrink-0 size-6 p-0 bg-transparent border-none cursor-pointer"
          >
            <LogOut size={24} color="#343434" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
