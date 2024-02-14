"use client";
import { TbSearch } from "react-icons/tb";
import { CiCircleInfo } from "react-icons/ci";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  searchString: string;
  setSearchString: (searchString: string) => void;
};

export default function SearchBox({ searchString, setSearchString }: Props) {

  const [isInputFocused, setIsInputFocused] = useState(false);

  // input 요소에 포커스가 있을 때 호출될 함수
  const handleFocus = () => {
    setIsInputFocused(true);
  };

  // input 요소에서 포커스가 벗어날 때 호출될 함수
  const handleBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="flex relative mx-auto w-[80vw] my-2">
      <TbSearch className="absolute left-3 top-[.55rem]" />
      <input
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="appearance-none flex-1 border-[2px] border-gray-300 rounded-lg text-sm py-2 pl-[2rem] pr-[2.5rem] text-gray-700 h-[2.1rem] leading-tight focus:outline-none focus:border-black"
        value={searchString}
        placeholder="공원 이름을 검색하세요."
        onChange={(e) => setSearchString(e.target.value)}
      />
      <button
        className={twMerge(
          `absolute flex justify-center items-center right-1 top-0 border-l-[2px] border-gray-300 w-[2rem] h-[2.1rem]`,
          isInputFocused && "border-black"
        )}
      >
        <CiCircleInfo />
      </button>
    </div>
  );
}
