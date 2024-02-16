import { ParkingLotResponse } from "@/types/parkingLot";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ParkingLotState = ParkingLotResponse["parkingInfoList"][number];

const initialState: ParkingLotState[] = [];

const parkingLotSlice = createSlice({
  name: "parkingLot",
  initialState,
  reducers: {
    setParkingLotAction: (state, action: PayloadAction<ParkingLotState[]>) => {
      return action.payload;
    },
    addParkingLotAction: (state, action: PayloadAction<ParkingLotState>) => {
      state.push(action.payload);
    },
    removeParkingLotAction: (state, action: PayloadAction<ParkingLotState>) => {
      return state.filter((lot) => lot.parkingCode !== action.payload.parkingCode);
    },
  },
});

export const { setParkingLotAction, addParkingLotAction, removeParkingLotAction } = parkingLotSlice.actions;

export default parkingLotSlice.reducer;
