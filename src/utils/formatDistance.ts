export default function formatDistance(input: number): string {
  if (input < 1) {
    const meters = Math.round(input * 1000 * 10) / 10; // km를 m로 변환
    return `${meters}m`;
  } else {
    // 1km 이상인 경우, 소수점 한 자리까지 반올림
    const roundedKm = Math.round(input * 10) / 10;
    return `${roundedKm}km`;
  }
}
