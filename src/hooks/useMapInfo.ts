import {
  setMapCenterAction,
  setMapLevelAction,
} from "@/lib/Slices/mapInfoSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useCallback } from "react";

export default function useMapInfo() {
  const mapCenter = useAppSelector((state) => state.mapInfo.center);
  const mapLevel = useAppSelector((state) => state.mapInfo.level);

  const dispatch = useAppDispatch();

  const setMapCenter = useCallback(
    (lat: number, lng: number) => {
      dispatch(setMapCenterAction({ lat, lng }));
    },
    [dispatch]
  );

  const setMapLevel = useCallback(
    (level: number) => {
      dispatch(setMapLevelAction(level));
    },
    [dispatch]
  );

  return { mapCenter, mapLevel, setMapCenter, setMapLevel };
}
