"use client";

import {
  getUserDataByUsername,
  useCurrentUser,
  useUserByUsername,
  useViewUserLinks,
} from "@/lib/supabaseClient";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "../components/header";
import ProfileAvatar from "../components/profileAvatar";
import EditableField from "../components/editableField";
import LinkItem from "../components/linkItem";

const UserProfile = () => {
  const usernameFromPath = usePathname().substring(1); // remove leading slash
  const { userByUsernameData, isLoading } = useUserByUsername(usernameFromPath);
  const { currentUserData } = useCurrentUser();
  const { linkData } = useViewUserLinks(usernameFromPath);

  console.log(linkData, "linkData in user profile");

  if (
    currentUserData &&
    currentUserData?.profileData?.username === usernameFromPath
  ) {
    window.location.href = "/dashboard";
  }

  if (userByUsernameData?.profileData === null) {
    window.location.href = "/login";
  }
  console.log(userByUsernameData, "userByUsernameData");
  const profileData = getUserDataByUsername(usernameFromPath);

  console.log(profileData, "profileData", usernameFromPath, currentUserData);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className=" relative size-full min-h-screen" data-name="Profile">
      {/* Background gradient */}
      <div className="absolute bg-primary h-full w-full left-0 top-0" />

      {/* Header */}
      <div className="absolute box-border content-stretch flex items-center justify-between p-4 top-[43px] left-0 right-0 mx-auto max-w-md">
        <Header />
      </div>

      {/* Main content */}
      <div className="absolute box-border content-stretch flex flex-col gap-[45px] items-center justify-start left-1/2 transform -translate-x-1/2 p-4 w-full max-w-[299px] top-1/2 -translate-y-1/2">
        {/* Profile Avatar */}
        <ProfileAvatar />

        {/* Profile Info */}
        <div className="box-border content-stretch flex flex-col gap-1.5 items-center justify-start p-0 relative shrink-0 w-full">
          <EditableField
            value={userByUsernameData?.profileData?.name || ""}
            placeholder="Your name"
            isEditing={false}
            fontSize="18px"
            fontWeight="semibold"
          />
          <EditableField
            value={userByUsernameData?.profileData?.bio || ""}
            placeholder="Add your Bio"
            isEditing={false}
            fontSize="14px"
            fontWeight="normal"
          />
        </div>

        {/* Add Link Button */}
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
          {linkData &&
            linkData?.length > 0 &&
            linkData.map((i, y) => (
              <div className="w-full" key={y}>
                <LinkItem url={i.url} title={i.platform} isUser viewOnly />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
