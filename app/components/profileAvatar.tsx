import svgPaths from "../../public/profile-default.ts";
// Profile avatar component with camera icon for uploading
const ProfileAvatar =()=> {
  return (
    <div className="relative shrink-0 size-[159px]">
      <div className="absolute inset-[-2.516%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 167 167">
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
    </div>
  );
}

export default ProfileAvatar