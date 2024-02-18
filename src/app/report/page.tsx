"use client";

import { useState } from "react";
import ImageInput from "../components/ImageInput";
import Goback from "../components/Goback";

export default function ReportPage() {
  const [image, setImage] = useState<File | null>(null);
  const [textArea, setTextArea] = useState<string>("");
  const [carNumber, setCarNumber] = useState<string>("");

  return (
    <div className="px-4 py-4 w-full h-full bg-gray-50">
      <div className="relative">
        <Goback className="w-8 h-8 absolute top-3 left-0" />
        <h1 className="text-xl font-bold text-center my-4 text-gray-700">
          신고하기
        </h1>
        <div className="flex justify-center">
          <ImageInput imageFile={image} setImageFile={setImage} />
        </div>

        <div className="flex flex-col w-full items-center mt-4 space-y-3">
          <div className="w-full flex items-center">
            <span className="text-sm font-bold text-gray-700">차량 번호</span>
            <input
              type="text"
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value)}
              className="flex-grow ml-2 border h-12 p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <textarea
            className="w-full h-40 border p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="상세정보를 입력해주세요."
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          />

          <button className="w-full py-3 bg-red-500 text-white rounded-lg transition">
            신고하기
          </button>
        </div>
      </div>
    </div>
  );
}
