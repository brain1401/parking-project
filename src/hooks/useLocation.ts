import { useState, useEffect } from "react";

type Location = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
};

export default function useLocation() {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prevState) => ({
        ...prevState,
        error: "Geolocation is not supported by your browser.",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      () => {
        setLocation((prevState) => ({
          ...prevState,
          error: "Unable to retrieve your location.",
        }));
      }
    );
  }, []);

  return location;
}
