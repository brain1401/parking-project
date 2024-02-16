import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type isFirstSiteAccessState = boolean;

const initialState: isFirstSiteAccessState = true;

const isFirstSiteAccessSlice = createSlice({
  name: "isFirstSiteAccess",
  initialState,
  reducers: {
    setFirstSiteAccessAction: (state, action: PayloadAction<isFirstSiteAccessState>) => {
      return action.payload;
    },
  },
});

export const { setFirstSiteAccessAction } = isFirstSiteAccessSlice.actions;

export default isFirstSiteAccessSlice.reducer;
