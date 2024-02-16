export default function formatPrice(price: string | null): string {
  if (price === "무료") {
    return price;
  }
  if (price === null) {
    return "정보 없음";
  }
  return price + "원";
}
