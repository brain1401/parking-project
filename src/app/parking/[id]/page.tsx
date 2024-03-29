"use client";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import PakringLot from "/public/parkingLot.jpg";

import useParkingLots from "@/hooks/useParkingLots";
import { ParkingLotState } from "@/lib/Slices/parkingLotSlice";
import { ParkingLotResponse } from "@/types/parkingLot";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import formatPrice from "@/utils/formatPrice";
import Goback from "@/app/components/Goback";

export default function ParkingLotPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { parkingLots } = useParkingLots();
  const [parkingLot, setParkingLot] = useState<ParkingLotState | undefined>(
    undefined
  );

  useEffect(() => {
    if (parkingLots.length <= 0) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get<ParkingLotResponse>(
            "/api/getParkingLots"
          );
          setParkingLot(
            data.parkingInfoList.find((lot) => lot.parkingCode === id)
          );
        } catch (e) {
          if (axios.isAxiosError(e)) {
            console.error(e);
          }
        }
      };

      fetchData();
    } else {
      setParkingLot(parkingLots.find((lot) => lot.parkingCode === id));
    }
  }, [parkingLots, id]);

  return (
    <section className="flex flex-col h-full w-full">
      <div className="relative flex w-full h-[12rem]">
        <Goback className="w-8 h-8 absolute top-5 left-5 z-10 text-white" />
        <Image fill src={PakringLot} className="" alt="parkingLot" />
        <h2 className="z-10 text-yellow-300 font-bold self-center mx-auto">
          공공데이터에서 주차장 사진을 제공하지 않았습니다.
        </h2>
      </div>

      <div className="flex flex-col h-[13rem] justify-center w-full border-b border-b-zinc-400">
        <h3 className="text-lg font-bold flex justify-center items-center w-full h-[3rem] my-5">
          {parkingLot?.parkingName}
        </h3>
        <div className="flex flex-col gap-y-2 w-full px-5 mx-auto py-5 ">
          <div className="flex justify-between">
            <p>주차요금</p>
            <p>
              기본요금 : {parkingLot?.rates && formatPrice(parkingLot.rates)}
            </p>
          </div>
          <div className="flex justify-between">
            <p>운영시간</p>
            <p>
              {`${parkingLot?.weekdayBeginTime.split(":")[0]}:${
                parkingLot?.weekdayBeginTime.split(":")[1]
              }`}
              {` ~ `}
              {`${parkingLot?.weekdayEndTime.split(":")[0]}:${
                parkingLot?.weekdayEndTime.split(":")[1]
              }`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-2 w-full px-5 mx-auto my-10 ">
        <div className="flex items-center">
          <div className="flex justify-center items-center mr-5">
            <MdOutlineLocationOn className="w-8 h-8" />
          </div>
          <a
            href={`kakaomap://look?p=${parkingLot?.lat},${parkingLot?.lng}`}
            target="_blank"
          >
            <p>{parkingLot?.addrRoad}</p>
          </a>
        </div>

        <div className="flex items-center">
          <div className="flex justify-center items-center mr-5">
            <FaPhoneAlt className="w-7 h-7" />
          </div>
          <a href={`tel:${parkingLot?.tel}`} target="_blank">
            <p>{parkingLot?.tel}</p>
          </a>
        </div>
      </div>

      <div className="flex w-full justify-center items-center">
        <button className="flex justify-center items-center bg-blue-600 px-2 py-2 rounded-lg text-white my-2">
          <a
            href={`kakaomap://route?ep=${parkingLot?.lat},${parkingLot?.lng}&by=CAR`}
            target="_blank"
          >
            네비로 길안내 받기
          </a>
        </button>
      </div>
      <p className="text-sm text-center text-gray-600 mt-1">
        위 버튼은 카카오맵이 설치되어 있어야 작동합니다.
      </p>
    </section>
  );
}
