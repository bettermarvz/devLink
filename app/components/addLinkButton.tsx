// Add Link button component
const AddLinkButton = ({ onClick }:{onClick:()=>void})=> {
  return (
    <button 
      onClick={onClick}
      className="bg-[#ffffff] relative rounded-[100px] shrink-0 w-full cursor-pointer border-none hover:bg-gray-50 transition-colors"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-center px-4 py-3 relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#343434] text-[16px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Add Link</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default AddLinkButton