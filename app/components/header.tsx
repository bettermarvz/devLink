import { LogOut, Share2 } from "lucide-react";

// Header component with DevLink branding and action icons
const  Header = ()=> {
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
        <button className="relative shrink-0 size-6 p-0 bg-transparent border-none cursor-pointer">
          <LogOut size={24} color="#343434" />
        </button>
      </div>
    </div>
  );
}

export default Header