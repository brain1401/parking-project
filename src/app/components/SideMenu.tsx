"use client";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from "react";
import Link from "next/link";

const LIST_ITEM_CLASSNAME = "text-[1.1rem] font-bold text-stone-900 border-b border-stone-300 py-2 px-1";

type Props = {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};
export default function SideMenu({ setIsMenuOpen }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // document에 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 클린업 함수에서 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuOpen]);

  return (
    <div
      className="absolute z-30 w-[60vw] h-full bg-slate-50 rounded-tr-md rounded-br-md px-3 py-2 animate-slideIn"
      ref={menuRef}
    >
      <div className="relative">
        <h1 className="my-2 text-center font-bold text-[1.2rem]">ParkNFind</h1>
        <button className="absolute right-0 top-0">
          <IoClose
            className="w-8 h-8"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          />
        </button>
        <ul className="flex flex-col gap-y-3 mt-3">
          <li className={LIST_ITEM_CLASSNAME}>
            <Link href="/nearby" className="flex w-full h-full">
              가까운 거리순으로 보기
            </Link>
          </li>
          <li className={LIST_ITEM_CLASSNAME}>
            <Link href="/report" className="flex w-full h-full">
              불법 주차 신고
            </Link>
          </li>
          <li className={LIST_ITEM_CLASSNAME}>
            <Link href="/reports" className="flex w-full h-full">
              신고 내역
            </Link>
          </li>
          <li className={LIST_ITEM_CLASSNAME}>
            <Link href="/info" className="flex w-full h-full">
              정보
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
