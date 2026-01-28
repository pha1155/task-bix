import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "@/constants/api";
import IconImage from "@/assets/icon_image.svg";

interface ImageUploaderProps {
  image: File | string | null;
  onChange: (value: File | string | null) => void;
}

const resolveImageUrl = (image: File | string): string => {
  if (typeof image === "string") {
    return image.startsWith("http") ? image : `${API_BASE_URL}${image}`;
  }

  return URL.createObjectURL(image);
};

const ImageUploader = ({ image, onChange }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const url = resolveImageUrl(image);
    setPreview(url);

    if (typeof image !== "string") {
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  const resetInput = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onChange(file);
    resetInput();
  };

  const handleRemove = () => {
    onChange(null);
    resetInput();
  };

  const hasPreview = Boolean(preview);

  return (
    <div className="flex gap-7">
      <div>
        <label
          htmlFor="image-upload"
          className={`border-gray text-gray inline-flex cursor-pointer items-center rounded-sm border ${
            hasPreview ? "gap-4 pr-4" : "gap-2 p-4"
          }`}
        >
          <img
            src={hasPreview ? preview! : IconImage}
            alt={hasPreview ? "preview" : "이미지 등록"}
            className={hasPreview ? "size-14.5 rounded-sm object-cover" : undefined}
          />
          {hasPreview ? "이미지 변경" : "이미지 등록 (최대 1개)"}
        </label>

        <input
          id="image-upload"
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {hasPreview && (
        <button type="button" onClick={handleRemove} className="text-gray">
          이미지 삭제
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
