import React from "react";

const page = () => {
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
        <p className="text-white text-2xl mt-10 mb-2">Complete Your Sign-Up</p>
        <p className="text-white">
          Thank you for signing up. A confirmation email has been sent to your
          inbox. Please follow the link inside to activate your account.
        </p>
      </div>
    </div>
  );
};

export default page;
