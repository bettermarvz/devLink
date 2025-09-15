import React, { Dispatch, SetStateAction } from "react";
import Form from "next/form";
import CustomButton from "./addLinkButton";
import { Input } from "@/components/ui/input";
import { saveLink } from "@/lib/supabaseClient";

const AddLinkForm = ({
  onLinkAdded,
  closeHandler,
}: {
  onLinkAdded: () => Promise<void>;
  closeHandler: Dispatch<SetStateAction<boolean>>;
}) => {
  // FormData is title and url
  const handleFormSubmit = (data: FormData) => {
    const title = data.get("title") as string;
    const url = data.get("url") as string;
    saveLink(title, url);
    onLinkAdded();
  };
  return (
    <Form action={handleFormSubmit} className="flex flex-col gap-2 w-full">
      <Input
        placeholder="Title"
        defaultValue={""}
        name="title"
        required
        className="text-white"
      />
      <Input
        placeholder="http://"
        defaultValue={""}
        name="url"
        required
        type="url"
        className="text-white"
      />
      <CustomButton label="Save" type="submit" />
      <CustomButton label="Cancel" onClick={() => closeHandler(false)} />
    </Form>
  );
};

export default AddLinkForm;
