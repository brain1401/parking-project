"use client"
import useParkingLot from "@/hooks/useParkingLot";

export default function ParkingLotPage({ params: { id } }: { params: { id: string } }) {
  const { parkingLots } = useParkingLot();

  const parkingLot = parkingLots.find((lot) => lot.parkingCode === id);

  return <div>{parkingLot?.parkingName}</div>;
}
