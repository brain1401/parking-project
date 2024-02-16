import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  ParkingLotState,
  addParkingLotAction,
  removeParkingLotAction,
  setParkingLotAction,
} from "@/lib/Slices/parkingLotSlice";
import { useCallback } from "react";
import { RootState } from "@/lib/store";
export default function useParkingLot() {
  const parkingLots = useAppSelector((state: RootState) => state.parkingLots);
  const dispatch = useAppDispatch();

  const addParkingLot = useCallback(
    (parkingLot: ParkingLotState) => {
      dispatch(addParkingLotAction(parkingLot));
    },
    [dispatch]
  );

  const removeParkingLot = useCallback(
    (parkingLot: ParkingLotState) => {
      dispatch(removeParkingLotAction(parkingLot));
    },
    [dispatch]
  );

  const setParkingLot = useCallback(
    (parkingLot: ParkingLotState[]) => {
      dispatch(setParkingLotAction(parkingLot));
    },
    [dispatch]
  );

  return {
    parkingLots,
    addParkingLot,
    removeParkingLot,
    setParkingLot,
  };
}
