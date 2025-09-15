// import { signOut } from "@/lib/supabaseClient";
import { LogOut, Share2 } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import { useEffect, useState } from "react";

// Header component with DevLink branding and action icons
export const signOut = async () => {
  const { error } = await createClientComponentClient().auth.signOut();
  if (error) throw error;
};

const ShareDialog = () => {
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.origin + window.location.pathname);
    }
  }, []);
  return (
    <Dialog>
      <DialogTrigger className="text-white cursor-pointer">
        <Share2 size={24} color="#fff" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <hr className="my-2" />
          <DialogDescription className="text-[16px] flex justify-between">
            {fullUrl}
            <button
              type="button"
              className="bg-primary text-white px-2 py-1 rounded text-[12px] cursor-pointer"
              onClick={() => {
                // copy the current url to clipboard
                navigator.clipboard.writeText(fullUrl);
              }}
            >
              Copy
            </button>
          </DialogDescription>
        </DialogHeader>
        <hr className="my-2" />
        <div className="flex gap-2">
          <EmailShareButton url={fullUrl}>
            <EmailIcon size={32} round />
          </EmailShareButton>
          <LinkedinShareButton url={fullUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <TwitterShareButton url={fullUrl}>
            <XIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton url={fullUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <RedditShareButton url={fullUrl}>
            <RedditIcon size={32} round />
          </RedditShareButton>
        </div>
      </DialogContent>
    </Dialog>
  );
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
        <div className="font-['Inter:Black',_sans-serif] font-black leading-[0] not-italic relative shrink-0 text-white text-[20px] text-center text-nowrap">
          <button
            className="block leading-[normal] whitespace-pre cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            DevLink
          </button>
        </div>
      </div>
      <div className="box-border content-stretch flex gap-3 items-center justify-end p-0 relative shrink-0">
        <ShareDialog />
        {currentUserData && (
          <button
            onClick={handleSignOut}
            className="relative shrink-0 size-6 p-0 bg-transparent border-none cursor-pointer"
          >
            <LogOut size={24} color="#fff" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
