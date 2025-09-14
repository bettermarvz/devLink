import { Pencil, X } from "lucide-react";
import React from "react";

const LinkItem = ({ title, isUser }: { title: string; isUser: boolean }) => {
  const DefaultView = () => (
    <div className="flex bg-white w-full justify-between items-center border p-2 px-4 rounded-full">
      <p className=" capitalize">{title}</p>
    </div>
  );

  const UserView = () => (
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
  );

  return isUser ? <UserView /> : <DefaultView />;
};

export default LinkItem;
