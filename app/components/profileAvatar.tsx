import Image from "next/image";
import svgPaths from "../../public/profile-default.ts";
import { useState } from "react";
import { uploadAvatar } from "@/lib/supabaseClient.ts";
import { Spinner } from "@/components/ui/shadcn-io/spinner/index.tsx";
// Profile avatar component with camera icon for uploading
const ProfileAvatar = ({ avatar_url }: { avatar_url: string }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const url = await uploadAvatar(file);
      alert("Uploaded! Image URL: " + url);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="relative shrink-0 size-[159px]">
      {uploading && (
        <Spinner
          variant="ring"
          className="absolute z-20 top-[43%] left-[43%]"
        />
      )}
      <input
        className="absolute z-10 h-full w-full bg-red-400 rounded-full opacity-0"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleUpload}
        disabled={uploading}
      />
      {avatar_url ? (
        <div className="absolute inset-0">
          <Image
            className="rounded-[50%] border-[4px] border-solid border-white object-cover"
            src={avatar_url}
            alt="Profile Avatar"
            fill
          />
        </div>
      ) : (
        <div className="absolute inset-[-2.516%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 167 167"
          >
            <g id="Group 1">
              <circle
                cx="83.5"
                cy="83.5"
                fill="var(--fill-0, #D9D9D9)"
                id="Ellipse 1"
                r="81.5"
                stroke="var(--stroke-0, white)"
                strokeWidth="4"
              />
              <g id="Frame">
                <path
                  d={svgPaths.p1a764400}
                  id="Vector"
                  stroke="var(--stroke-0, white)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d={svgPaths.p8159600}
                  id="Vector_2"
                  stroke="var(--stroke-0, white)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </g>
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
