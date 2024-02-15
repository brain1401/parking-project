"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ParkSearchBox from "./ParkSearchBox";
import useDebounce from "@/hooks/useDebounce";
import { Map, CustomOverlayMap, MarkerClusterer } from "react-kakao-maps-sdk";
import useLocation from "@/hooks/useLocation";
import useGetParkingLot from "@/hooks/useGetParkingLot";
import { calculateDistance } from "@/utils/calculateDistance";

export default function MainPage() {
  const [currentCenter, setCurrentCenter] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: null,
    lng: null,
  });

  const { error, latitude, longitude } = useLocation();

  const [map, setMap] = useState<kakao.maps.Map>();

  const {
    parkingLotsResponse,
    error: parkingLotError,
    loading,
  } = useGetParkingLot();

  useEffect(() => {
    // 사용자의 위치 정보가 유효할 때만 currentCenter 상태를 업데이트
    if (latitude && longitude) {
      setCurrentCenter({
        lat: latitude,
        lng: longitude,
      });
    }
  }, [latitude, longitude]); // latitude와 longitude가 변경될 때마다 실행

  const visibleMarkers = useMemo(() => {
    if (!parkingLotsResponse) return null;

    const rangeInKm = 1.5; // 중심점으로부터 5km 내의 마커만 표시

    return parkingLotsResponse?.parkingInfoList
      .filter((parkingLot) => {
        if (
          !currentCenter.lat ||
          !currentCenter.lng ||
          !parkingLot.lat ||
          !parkingLot.lng ||
          parkingLot.rates === "null"
        )
          return false;
        const distance = calculateDistance(
          currentCenter.lat,
          currentCenter.lng,
          parseFloat(parkingLot.lat),
          parseFloat(parkingLot.lng)
        );
        return distance <= rangeInKm;
      })
      .map((parkingLot) => {
        if (
          !currentCenter.lat ||
          !currentCenter.lng ||
          !parkingLot.lat ||
          !parkingLot.lng
        )
          return false;

        return (
          <CustomOverlayMap
            key={parkingLot.parkingCode}
            position={{
              lat: parseFloat(parkingLot.lat),
              lng: parseFloat(parkingLot.lng),
            }}
          >
            <div className="flex flex-col translate-y-[-25%]">
              <div className="flex justify-center items-center z-10 bg-neutral-300 px-2 h-[2.5rem] text-sm rounded-md">
                {`기본요금 : ${
                  parkingLot.rates === "무료" ? "무료" : `${parkingLot.rates}원`
                }`}
              </div>
              <div className="w-8 h-8 rotate-45 translate-y-[-1.6rem] bg-neutral-300 self-center"></div>
            </div>
          </CustomOverlayMap>
        );
      });
  }, [parkingLotsResponse, currentCenter.lat, currentCenter.lng]);

  return (
    <div className="h-full flex flex-col">
      <ParkSearchBox map={map} />

      <Map
        center={{ lat: latitude ?? 35.1599785, lng: longitude ?? 126.8513072 }}
        className="w-[80%] h-[80%] mx-auto"
        onCenterChanged={(map) => {
          const center = map.getCenter();
          setCurrentCenter({ lat: center.getLat(), lng: center.getLng() });
        }}
        minLevel={4}
        onCreate={setMap}
      >
        <MarkerClusterer averageCenter={true} minLevel={3}>
          {visibleMarkers}
        </MarkerClusterer>
      </Map>
    </div>
  );
}
