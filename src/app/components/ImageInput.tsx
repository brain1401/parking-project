import Image from "next/image";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";

type Props = { 
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
};

export default function ImageInput({ imageFile, setImageFile }: Props) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 선택 핸들러
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    // 기존에 생성된 URL이 있다면 해제
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl("");

      if (imageFile) {
        setImageFile(null);
      }
    }

    const file = e.target.files?.[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);

      setImageFile(file);
    }
  };

  // 컴포넌트가 언마운트될 때 생성된 URL 해제
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  return (
    <div className="w-full h-[13rem] relative">
      <input
        type="file"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        onClick={() => {
          fileInputRef.current?.click();
        }}
        className="w-full h-full bg-gray-200 flex justify-center items-center rounded-md"
      >
        <span>이미지 선택</span>
      </button>
      {imagePreviewUrl && (
        <Image
          src={imagePreviewUrl}
          width={100}
          height={100}
          alt="Image preview"
          className="absolute top-0 left-0 w-full h-full object-contain"
          onClick={() => {
            fileInputRef.current?.click();
          }}
        />
      )}
    </div>
  );
}
