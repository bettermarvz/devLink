"use client";

import { useState } from "react";
import Header from "../components/header.tsx";
import ProfileAvatar from "../components/profileAvatar.tsx";
import EditableField from "../components/editableField.tsx";
import AddLinkButton from "../components/addLinkButton.tsx";
import NewLinkForm from "../components/newLinkForm.tsx";

export default function App() {
  const [name, setName] = useState("Your name");
  const [bio, setBio] = useState("Add your Bio");
  const [editingName, setEditingName] = useState(false);
  const [editingBio, setEditingBio] = useState(false);

  console.log(editingName, editingBio);

  const handleNameSave = (newName: string) => {
    setName(newName || "Your name");
    setEditingName(false);
  };

  const handleBioSave = (newBio: string) => {
    setBio(newBio || "Add your Bio");
    setEditingBio(false);
  };

  const handleAddLink = () => {
    // Placeholder for add link functionality
    alert("Add Link functionality would be implemented here");
  };

  return (
    <div
      className="bg-[#4fa69b] relative size-full min-h-screen"
      data-name="Profile"
    >
      {/* Background gradient */}
      <div className="absolute bg-[#6ee0ff] h-full w-full left-0 top-0" />

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
            value={name}
            placeholder="Your name"
            isEditing={editingName}
            onEdit={() => setEditingName(true)}
            onSave={handleNameSave}
            onCancel={() => setEditingName(false)}
            fontSize="18px"
            fontWeight="semibold"
          />
          <EditableField
            value={bio}
            placeholder="Add your Bio"
            isEditing={editingBio}
            onEdit={() => setEditingBio(true)}
            onSave={handleBioSave}
            onCancel={() => setEditingBio(false)}
            fontSize="14px"
            fontWeight="normal"
          />
        </div>

        {/* Add Link Button */}
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
          {/* New Link Form  */}
          <NewLinkForm />
          <AddLinkButton onClick={handleAddLink} />
        </div>
      </div>
    </div>
  );
}
