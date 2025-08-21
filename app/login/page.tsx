export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary p-4">
      <div className="flex flex-col items-center text-center max-w-xs w-full">
        
        {/* Logo */}
        <div className="box-border content-stretch flex gap-1.5 items-center justify-start p-0 relative shrink-0">
        <div className="font-['Inter:Black',_sans-serif] font-black leading-[0] not-italic relative shrink-0 text-[#343434] text-[20px] text-center text-nowrap">
          <p className="block leading-[normal] whitespace-pre">DevLink</p>
        </div>
      </div>

        {/* Title */}
        <h1 className="text-white text-3xl font-bold mb-2">
          Welcome to DevLink
        </h1>

        {/* Subtitle */}
        <p className="text-white text-2xl mb-10">
          One profile. All your dev links.
        </p>

        {/* Google Sign-in Button */}
        <button
          // onClick={() => alert("Google Login coming soon")}
          className="flex items-center justify-center w-full gap-3 bg-white text-gray-700 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <img
            src="/google-icon.svg"
            alt="Google Icon"
            className="h-5 w-5"
          />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}