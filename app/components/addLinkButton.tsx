import { Loader2Icon } from "lucide-react";

// Add Link button component
const CustomButton = ({
  label,
  loading,
  ...props
}: React.ComponentProps<"button"> & {
  label: string;
  loading?: boolean;
}) => {
  return (
    <button
      className="border-white border-1 relative rounded-[100px] shrink-0 w-full cursor-pointer hover:bg-gray-950 transition-colors"
      {...props}
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-4 py-3 relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-white text-[16px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              {loading ? <Loader2Icon className="animate-spin" /> : label}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CustomButton;
