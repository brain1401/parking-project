import { configureStore } from "@reduxjs/toolkit";
import parkingLotSlice from "./Slices/parkingLotSlice";
import mapInfoSlice from "./Slices/mapInfoSlice";
import isFirstSiteAccessSlice from "./Slices/isFirstSiteAccessSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      parkingLots: parkingLotSlice,
      mapInfo: mapInfoSlice,
      isFirstSiteAccess: isFirstSiteAccessSlice,
    },
  });
};


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
