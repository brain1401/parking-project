"use client";

import { useState } from "react";
import ImageInput from "../components/ImageInput";

export default function ReportPage() {
  const [image, setImage] = useState<File | null>(null);
  const [textArea, setTextArea] = useState<string>("");
  const [carNumber, setCarNumber] = useState<string>("");

  return (
    <div className="px-7 py-3 w-full">
      <h1 className="text-[2rem] text-center my-2">신고하기</h1>
      <div className="flex justify-center">
        <ImageInput imageFile={image} setImageFile={setImage} />
      </div>

      <div className="flex w-full justify-center items-center mt-5">
        <span className="mr-2 font-bold flex-shrink-0">차량 번호</span>
        <input
          type="text"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
          className="flex-grow border h-[2rem] p-2 border-black rounded-md focus:outline-none"
        />
      </div>

      <textarea
        className="mx-auto block w-full h-[10rem] border p-2 border-black rounded-md focus:outline-none mt-5"
        placeholder="상세정보를 입력해주세요."
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />

      <button className="mx-auto block mt-5 px-5 py-2 bg-red-500 text-white rounded-md">
        신고하기
      </button>
    </div>
  );
}
