import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useCallback } from "react";
import { setFirstSiteAccessAction } from "@/lib/Slices/isFirstSiteAccessSlice";

export default function useFirstSiteAccess() {
  const isFirstSiteAccess = useAppSelector((state) => state.isFirstSiteAccess);

  const dispatch = useAppDispatch();

  const setFirstSiteAccess = useCallback(
    (isFirstSiteAccess: boolean) => {
      dispatch(setFirstSiteAccessAction(isFirstSiteAccess));
    },
    [dispatch]
  );

  return { isFirstSiteAccess, setFirstSiteAccess };
}
