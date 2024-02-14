"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SearchBox from "./SearchBox";
import useDebounce from "@/hooks/useDebounce";
import { Map, CustomOverlayMap, MarkerClusterer } from "react-kakao-maps-sdk";
import useLocation from "@/hooks/useLocation";
import useGetParkingLot from "@/hooks/useGetParkingLot";
import { calculateDistance } from "@/utils/calculateDistance";

export default function MainPage() {
  const [searchString, setSearchString] = useState("");

  const [currentCenter, setCurrentCenter] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: null,
    lng: null,
  });

  const debouncedSearchString = useDebounce(searchString, 500);

  const { error, latitude, longitude } = useLocation();

  const {
    parkingLotsResponse,
    error: parkingLotError,
    loading,
  } = useGetParkingLot();

  const mapRef = useRef<kakao.maps.Map>(null);

  useEffect(() => {
    console.log(error, latitude, longitude);
  }, [error, latitude, longitude]);

  const visibleMarkers = useMemo(() => {
    if (!parkingLotsResponse || !currentCenter.lat || !currentCenter.lng)
      return [];

    return parkingLotsResponse?.parkingInfoList.map((parkingLot) => {
      if (parkingLot.lat && parkingLot.lng) {
        return (
          <CustomOverlayMap
            key={parkingLot.parkingCode}
            position={{
              lat: parseFloat(parkingLot.lat),
              lng: parseFloat(parkingLot.lng),
            }}
          >
            <div className="flex justify-center items-center w-[5rem] h-[2rem] translate-y-[-50%] bg-slate-200">
              {parkingLot.rates}
            </div>
          </CustomOverlayMap>
        );
      }
    });
  }, [parkingLotsResponse, currentCenter.lat, currentCenter.lng]);

  return (
    <div className="h-full flex flex-col">
      <SearchBox
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <Map
        center={{ lat: latitude ?? 35.1599785, lng: longitude ?? 126.8513072 }}
        className="w-[80%] h-[80%] mx-auto"
        ref={mapRef}
        onCenterChanged={(map) => {
          const center = map.getCenter();
          setCurrentCenter({ lat: center.getLat(), lng: center.getLng() });
        }}
      >
        <MarkerClusterer averageCenter={true} minLevel={3}>
          {visibleMarkers}
        </MarkerClusterer>
      </Map>
    </div>
  );
}
