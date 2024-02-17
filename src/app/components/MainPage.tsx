"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { BiCurrentLocation } from "react-icons/bi";
import ParkSearchBox from "./ParkSearchBox";
import { Map, CustomOverlayMap, MarkerClusterer } from "react-kakao-maps-sdk";
import useGetParkingLot from "@/hooks/useGetParkingLot";
import { calculateDistance } from "@/utils/calculateDistance";
import Link from "next/link";
import useParkingLots from "@/hooks/useParkingLots";
import useMapInfo from "@/hooks/useMapInfo";
import { IoMenu } from "react-icons/io5";

import useFirstSiteAccess from "@/hooks/useFirstSiteAccess";
import SideMenu from "./SideMenu";

export default function MainPage() {
  const [map, setMap] = useState<kakao.maps.Map>();
  const { mapCenter, setMapCenter, mapLevel, setMapLevel } = useMapInfo();
  const { setParkingLots } = useParkingLots();
  const { isFirstSiteAccess, setFirstSiteAccess } = useFirstSiteAccess();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    parkingLotsResponse,
    error: parkingLotError,
    loading,
  } = useGetParkingLot();

  const onCurrentLocationClick = useCallback(() => {
    if (!navigator.geolocation) {
      alert("현재 위치를 가져올 수 없습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapCenter(position.coords.latitude, position.coords.longitude);
      },
      () => {
        alert("현재 위치를 가져올 수 없습니다.");
      }
    );
  }, [setMapCenter]);

  useEffect(() => {
    if (isFirstSiteAccess) {
      onCurrentLocationClick();
      setFirstSiteAccess(false);
    }
  }, [onCurrentLocationClick, setFirstSiteAccess, isFirstSiteAccess]);

  //api로부터 받아온 주차장 정보를 글로벌 state에 저장
  useEffect(() => {
    if (!parkingLotsResponse) return;

    setParkingLots(parkingLotsResponse?.parkingInfoList);
  }, [parkingLotsResponse, setParkingLots]);

  const visibleMarkers = useMemo(() => {
    if (!parkingLotsResponse) return null;

    const rangeInKm = 1.5; // 중심점으로부터 5km 내의 마커만 표시

    return parkingLotsResponse?.parkingInfoList
      .filter((parkingLot) => {
        if (!parkingLot.lat || !parkingLot.lng || parkingLot.rates === null)
          return false;

        const distance = calculateDistance(
          mapCenter.lat,
          mapCenter.lng,
          parseFloat(parkingLot.lat),
          parseFloat(parkingLot.lng)
        );
        return distance <= rangeInKm;
      })
      .map((parkingLot) => {
        if (!parkingLot.lat || !parkingLot.lng) return null;

        return (
          <CustomOverlayMap
            key={parkingLot.parkingCode}
            position={{
              lat: parseFloat(parkingLot.lat),
              lng: parseFloat(parkingLot.lng),
            }}
          >
            <div className="flex flex-col translate-y-[-25%] select-none">
              <Link
                href={`/parking/${parkingLot.parkingCode}`}
                className="flex justify-center items-center z-10 bg-neutral-800 text-white px-2 h-[2.5rem] text-sm rounded-md"
              >
                <button>
                  {`기본요금 : ${
                    parkingLot.rates === "무료"
                      ? "무료"
                      : `${parkingLot.rates}원`
                  }`}
                </button>
              </Link>

              <div className="w-8 h-8 rotate-45 translate-y-[-1.6rem] bg-neutral-800 text-white self-center"></div>
            </div>
          </CustomOverlayMap>
        );
      });
  }, [parkingLotsResponse, mapCenter.lat, mapCenter.lng]);

  return (
    <div className={`relative h-full flex flex-col px-5 py-3`}>
      {isMenuOpen &&
        createPortal(<SideMenu setIsMenuOpen={setIsMenuOpen} />, document.body)}
        
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-20 animate-fadeIn"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      <div className="flex flex-col h-full w-full">
        <div className="flex relative justify-center items-center">
          <h1 className="text-2xl font-bold">ParkNFind</h1>
          <button
            className="absolute left-0"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <IoMenu className="w-8 h-8" />
          </button>
        </div>

        <ParkSearchBox map={map} />

        <div className="self-center w-full h-full relative overflow-hidden">
          <Map
            center={{
              lat: mapCenter.lat,
              lng: mapCenter.lng,
            }}
            level={mapLevel}
            className="h-full w-full"
            onCenterChanged={(map) => {
              const center = map.getCenter();
              setMapCenter(center.getLat(), center.getLng());
            }}
            minLevel={4}
            onCreate={setMap}
            onZoomChanged={(map) => {
              setMapLevel(map.getLevel());
            }}
          >
            <MarkerClusterer averageCenter={true} minLevel={3}>
              {visibleMarkers}
            </MarkerClusterer>
          </Map>
          <Link href={"/nearby"}>
            <button className="absolute top-1 left-3 z-10 bg-blue-500 opacity-90 px-2 py-2 rounded-md text-white">
              거리순으로 보기
            </button>
          </Link>

          <button
            className="absolute bg-blue-600 opacity-90 text-white bottom-1 right-1 z-10 px-2 py-2 rounded-md"
            onClick={onCurrentLocationClick}
          >
            <BiCurrentLocation className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
