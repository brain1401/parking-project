"use client";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};
export default function Goback({ className }: Props) {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <IoArrowBack className={className} />
    </button>
  );
}
