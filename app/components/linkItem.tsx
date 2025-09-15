import { ChevronRight, Pencil, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const LinkItem = ({
  title,
  url,
  isUser,
  viewOnly = false,
}: {
  title: string;
  url: string;
  isUser: boolean;
  viewOnly?: boolean;
}) => {
  const DefaultView = () => (
    <div className="flex bg-white w-full justify-between items-center border p-2 px-4 rounded-full">
      <p className=" capitalize">{title}</p>
    </div>
  );

  const UserView = () =>
    !viewOnly ? (
      <div className="flex bg-white w-full justify-between items-center border p-2 px-4 rounded-full">
        <p className=" capitalize">{title}</p>

        <div className="flex justify-center items-center gap-2">
          <button type="button" className="cursor-pointer">
            <Pencil strokeWidth={1.5} className="w-[14px]" />
          </button>
          <button type="button" className="cursor-pointer">
            <X strokeWidth={1.5} className="w-[14px]" />
          </button>
        </div>
      </div>
    ) : (
      <Link
        target="_blank"
        href={url}
        className="flex bg-white w-full justify-between items-center border p-2 px-4 rounded-full"
      >
        {title}
        <ChevronRight strokeWidth={1.5} className="w-[14px]" />
      </Link>
    );

  return isUser ? <UserView /> : <DefaultView />;
};

export default LinkItem;
