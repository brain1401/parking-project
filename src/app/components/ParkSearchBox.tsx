"use client";
import { TbSearch } from "react-icons/tb";
import { CiCircleInfo } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import useDebounce from "@/hooks/useDebounce";

type Props = {
  map: kakao.maps.Map | undefined;
};

export default function ParkSearchBox({ map }: Props) {
  const [searchString, setSearchString] = useState("");

  const debouncedSearchString = useDebounce(searchString, 500);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const [searchedPlaces, setSearchedPlaces] = useState<
    kakao.maps.services.PlacesSearchResult | undefined | null
  >();

  const searchedListRef = useRef<HTMLUListElement>(null);

  // input 요소에 포커스가 있을 때 호출될 함수
  const handleFocus = (input: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsInputFocused(true);
  };

  // input 요소에서 포커스가 벗어날 때 호출될 함수
  const handleBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchedListRef.current &&
        !searchedListRef.current.contains(event.target as Node)
      ) {
        setSearchedPlaces(undefined);
      }
    };

    // document에 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 클린업 함수에서 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    if (!debouncedSearchString) {
      setSearchedPlaces(undefined);
      return;
    }
    if (!isInputFocused) return;

    ps.keywordSearch(
      debouncedSearchString,
      (data, status, pagenation) => {
        if (status === kakao.maps.services.Status.OK) {
          const filteredData = data.filter((place) =>
            place.category_name.includes("공원")
          );
          filteredData.length > 0 && setSearchedPlaces(filteredData);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          setSearchedPlaces(null);
        }
      },
      {
        location: map.getCenter(),
        sort: kakao.maps.services.SortBy.DISTANCE,
      }
    );
  }, [debouncedSearchString, map, setSearchedPlaces, isInputFocused]);

  useEffect(() => {
    console.log("debouncedSearchString : ", debouncedSearchString);
  }, [debouncedSearchString]);

  useEffect(() => {
    console.log("searchedPlaces : ", searchedPlaces);
  }, [searchedPlaces]);

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
        <CiCircleInfo className="w-6 h-6" />
      </button>
      {searchedPlaces
        ? searchedPlaces.length > 0 && (
            <ul
              className="flex flex-col absolute left-0 top-[120%] z-20 bg-neutral-100 rounded-md w-full"
              ref={searchedListRef}
            >
              {searchedPlaces.map((place) => (
                <li key={place.id} className="my-2">
                  <h2
                    className="text-sm pl-2 cursor-pointer"
                    onClick={() => {
                      map?.setCenter(
                        new kakao.maps.LatLng(Number(place.y), Number(place.x))
                      );
                      setSearchedPlaces([]);
                    }}
                  >
                    {place.place_name}
                  </h2>
                </li>
              ))}
            </ul>
          )
        : searchedPlaces === null && (
            <div className="flex justify-center items-center absolute left-0 top-[120%] z-20 bg-neutral-100 rounded-md w-full">
              <h2 className="text-sm px-2 py-10">검색 결과가 없습니다.</h2>
            </div>
          )}
    </div>
  );
}
