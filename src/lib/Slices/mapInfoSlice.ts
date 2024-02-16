import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type MapInfoState = {
  center: { lat: number; lng: number };
  level: number;
};

const initialState: MapInfoState = {
  center: { lat: 35.1599785, lng: 126.8513072 },
  level: 4,
};

const mapInfoSlice = createSlice({
  name: "mapCenter",
  initialState,
  reducers: {
    setMapCenterAction: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>
    ) => {
      state.center = action.payload;
    },
    setMapLevelAction: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
  },
});

export const { setMapCenterAction, setMapLevelAction } = mapInfoSlice.actions;

export default mapInfoSlice.reducer;
