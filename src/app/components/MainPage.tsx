"use client";

import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import useDebounce from "@/hooks/useDebounce";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useLocation from "@/hooks/useLocation";

export default function MainPage() {
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString, 500);

  const { error, latitude, longitude } = useLocation();

  useEffect(() => {
    console.log(error, latitude, longitude);
  }, [error, latitude, longitude]);

  return (
    <div className="h-full flex flex-col">
      <SearchBox
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <Map
        center={{ lat: latitude ?? 35.1599785, lng: longitude ?? 126.8513072 }}
        className="w-[80%] h-[80%] mx-auto flex-1"
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
      </Map>
    </div>
  );
}
