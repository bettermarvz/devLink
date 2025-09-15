"use client";

import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { useState } from "react";

// Editable field component for name and bio
const EditableField = ({
  value,
  placeholder,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  fontSize = "18px",
  fontWeight = "semibold",
  editable = false,
}: {
  value: string;
  placeholder: string;
  isEditing: boolean;
  onEdit?: () => void;
  onSave?: (name: string) => void;
  onCancel?: () => void;
  fontSize?: string;
  fontWeight?: string;
  editable?: boolean;
}) => {
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    if (onSave) {
      onSave(editValue);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    if (onCancel) {
      onCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-21 w-full focus-within: border active:border-0 rounded-sm pr-2 bg-white/50">
        <Input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="focus-visible:ring-0 focus-visible:border-0 text-sm"
          autoFocus
        />
        <div className="flex">
          <button
            onClick={handleSave}
            className="text-gray-600 hover:text-gray-800 p-1 text-sm"
          >
            ✓
          </button>
          <button
            onClick={handleCancel}
            className="text-red-600 hover:text-red-800 p-1"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="box-border content-stretch flex gap-4 items-center justify-center p-0 relative shrink-0 w-full">
      <div
        className={`font-['Inter:${
          fontWeight === "semibold" ? "Semi_Bold" : "Regular"
        }',_sans-serif] font-${fontWeight} leading-[0] not-italic relative shrink-0 text-white text-center text-nowrap`}
        style={{ fontSize }}
      >
        <p className="block leading-[normal] whitespace-pre">
          {value || placeholder}
        </p>
      </div>
      {editable && (
        <button
          onClick={onEdit}
          className="relative shrink-0 size-3.5 p-0 bg-transparent border-none cursor-pointer"
        >
          <Edit size={14} color="#fff" />
        </button>
      )}
    </div>
  );
};
export default EditableField;
