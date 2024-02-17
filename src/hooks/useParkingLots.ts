import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  ParkingLotState,
  addParkingLotAction,
  removeParkingLotAction,
  setParkingLotAction,
} from "@/lib/Slices/parkingLotSlice";
import { useCallback } from "react";
import { RootState } from "@/lib/store";
export default function useParkingLots() {
  const parkingLots = useAppSelector((state: RootState) => state.parkingLots);
  const dispatch = useAppDispatch();

  const addParkingLots = useCallback(
    (parkingLot: ParkingLotState) => {
      dispatch(addParkingLotAction(parkingLot));
    },
    [dispatch]
  );

  const removeParkingLots = useCallback(
    (parkingLot: ParkingLotState) => {
      dispatch(removeParkingLotAction(parkingLot));
    },
    [dispatch]
  );

  const setParkingLots = useCallback(
    (parkingLot: ParkingLotState[]) => {
      dispatch(setParkingLotAction(parkingLot));
    },
    [dispatch]
  );

  return {
    parkingLots,
    addParkingLots,
    removeParkingLots,
    setParkingLots,
  };
}
