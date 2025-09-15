"use client";

import { useEffect, useState } from "react";
import Header from "../components/header.tsx";
import ProfileAvatar from "../components/profileAvatar.tsx";
import EditableField from "../components/editableField.tsx";
import CustomButton from "../components/addLinkButton.tsx";
import AddLinkForm from "../components/addLinkForm.tsx";
import { getCurrentUser, saveProfile, useLinks } from "@/lib/supabaseClient.ts";
import { User } from "@supabase/supabase-js";
import LinkItem from "../components/linkItem.tsx";

const Dashboard = () => {
  const { linkData, mutateLinks } = useLinks();

  console.log(linkData, "user in dashboard");
  const [currentUser, setCurrentUser] = useState<{
    user: User | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profileData: any;
  } | null>(null);

  const [editingName, setEditingName] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  const handleNameSave = (newName: string) => {
    setEditingName(false);
    console.log("saving name", newName);
    saveProfile(newName, currentUser?.profileData?.bio ?? "");
    window.location.reload();
  };

  const handleBioSave = (newBio: string) => {
    setEditingBio(false);
    saveProfile(currentUser?.profileData?.name, newBio ?? "");
    window.location.reload();
  };

  const handleAddLink = () => {
    // Placeholder for add link functionality
    setIsAdding(true);
  };

  const handleLinkAdded = async () => {
    setIsAdding(false); // Optionally close the form
    mutateLinks(); // Refresh the links list
  };

  return (
    <div
      className="bg-[#6ee0ff] relative size-full min-h-screen"
      data-name="Profile"
    >
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
            value={currentUser?.profileData?.name || ""}
            placeholder="Your name"
            isEditing={editingName}
            onEdit={() => setEditingName(true)}
            onSave={handleNameSave}
            onCancel={() => setEditingName(false)}
            fontSize="18px"
            fontWeight="semibold"
            editable
          />
          <EditableField
            value={currentUser?.profileData?.bio || ""}
            placeholder="Add your Bio"
            isEditing={editingBio}
            onEdit={() => setEditingBio(true)}
            onSave={handleBioSave}
            onCancel={() => setEditingBio(false)}
            fontSize="14px"
            fontWeight="normal"
            editable
          />
        </div>

        {/* Add Link Button */}
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
          {linkData &&
            linkData?.length > 0 &&
            linkData.map((i, y) => (
              <div className="w-full" key={y}>
                <LinkItem
                  url={i.url}
                  title={i.platform}
                  isUser={!!currentUser}
                />
              </div>
            ))}
          {isAdding ? (
            <>
              <AddLinkForm
                onLinkAdded={handleLinkAdded}
                closeHandler={setIsAdding}
              />
            </>
          ) : (
            linkData &&
            linkData?.length < 5 && (
              <CustomButton label="Add Link" onClick={handleAddLink} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;