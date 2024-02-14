import { ParkingLotResponse } from "@/types/parkingLot";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetParkingLot() {
  const [parkingLotsResponse, setParkingLotsResponse] =
    useState<ParkingLotResponse | null>(null);

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/getParkingLots");

        setParkingLotsResponse(response.data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e);
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {parkingLotsResponse, error, loading};
}
