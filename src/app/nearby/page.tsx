"use client";

import useFirstSiteAccess from "@/hooks/useFirstSiteAccess";
import useMapInfo from "@/hooks/useMapInfo";
import useParkingLots from "@/hooks/useParkingLots";
import { ParkingLotState } from "@/lib/Slices/parkingLotSlice";
import { ParkingLotResponse } from "@/types/parkingLot";
import { calculateDistance } from "@/utils/calculateDistance";
import formatDistance from "@/utils/formatDistance";
import formatPrice from "@/utils/formatPrice";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Goback from "../components/Goback";

export default function NearByPage() {
  const { parkingLots: globalParkingLots } = useParkingLots();

  const { mapCenter } = useMapInfo();

  const [nearbyParkingLots, setNearbyParkingLots] = useState<
    { nearByParkingLot: ParkingLotState; distance: number }[] | undefined
  >(undefined);

  const { isFirstSiteAccess } = useFirstSiteAccess();

  useEffect(() => {
    if (globalParkingLots.length <= 0) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get<ParkingLotResponse>(
            "/api/getParkingLots"
          );

          const filteredData = data.parkingInfoList
            .filter((lot) => {
              if (!lot.lat || !lot.lng) return false;

              return (
                calculateDistance(
                  mapCenter.lat,
                  mapCenter.lng,
                  Number(lot.lat),
                  Number(lot.lng)
                ) <= 1
              );
            })
            .sort((a, b) => {
              if (!a.lat || !a.lng || !b.lat || !b.lng) return 0;

              return (
                calculateDistance(
                  mapCenter.lat,
                  mapCenter.lng,
                  Number(a.lat),
                  Number(a.lng)
                ) -
                calculateDistance(
                  mapCenter.lat,
                  mapCenter.lng,
                  Number(b.lat),
                  Number(b.lng)
                )
              );
            })
            .map((lot) => {
              return {
                nearByParkingLot: lot,
                distance: calculateDistance(
                  mapCenter.lat,
                  mapCenter.lng,
                  Number(lot.lat),
                  Number(lot.lng)
                ),
              };
            });

          setNearbyParkingLots(filteredData);
        } catch (e) {
          if (axios.isAxiosError(e)) {
            console.error(e);
          }
        }
      };

      fetchData();
    } else {
      const filteredData = globalParkingLots
        .filter((lot) => {
          if (!lot.lat || !lot.lng) return false;

          return (
            calculateDistance(
              mapCenter.lat,
              mapCenter.lng,
              Number(lot.lat),
              Number(lot.lng)
            ) <= 1
          );
        })
        .sort((a, b) => {
          if (!a.lat || !a.lng || !b.lat || !b.lng) return 0;

          return (
            calculateDistance(
              mapCenter.lat,
              mapCenter.lng,
              Number(a.lat),
              Number(a.lng)
            ) -
            calculateDistance(
              mapCenter.lat,
              mapCenter.lng,
              Number(b.lat),
              Number(b.lng)
            )
          );
        })
        .map((lot) => {
          return {
            nearByParkingLot: lot,
            distance: calculateDistance(
              mapCenter.lat,
              mapCenter.lng,
              Number(lot.lat),
              Number(lot.lng)
            ),
          };
        });

      setNearbyParkingLots(filteredData);
    }
  }, [globalParkingLots, mapCenter.lat, mapCenter.lng]);

  if (isFirstSiteAccess)
    return (
      <div>지도에서 현재 위치를 설정 후 주변 주차장을 확인할 수 있습니다.</div>
    );

  return (
    <section className="px-4 py-4 sm:px-5 sm:py-5">
      <div className="relative flex flex-col">
        <Goback className="w-10 h-10 absolute top-2 left-2 p-2 text-gray-800" />
        <h1 className="text-2xl font-bold text-center my-4 text-gray-800">
          주변 주차장
        </h1>
        {nearbyParkingLots && nearbyParkingLots.length > 0 ? (
          <ul className="flex flex-col items-center">
            {nearbyParkingLots?.map((lot) => (
              <li
                key={lot.nearByParkingLot.parkingCode}
                className="flex flex-col bg-blue-600 text-white my-2 w-full max-w-md rounded-lg shadow-lg overflow-hidden"
              >
                <Link
                  href={`/parking/${lot.nearByParkingLot.parkingCode}`}
                  className="p-3"
                >
                  <p className="text-lg font-bold">
                    {lot.nearByParkingLot.parkingName}
                  </p>
                  <p className="text-sm">{lot.nearByParkingLot.addrRoad}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-base">{formatDistance(lot.distance)}</p>
                    <p className="font-bold">
                      {formatPrice(lot.nearByParkingLot.rates)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-800 mt-4">
            주변에 주차장이 없습니다.
          </div>
        )}
      </div>
    </section>
  );
}
