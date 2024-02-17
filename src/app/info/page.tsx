"use client"

export default function InfoPage() {
  return (
    <section className="w-full h-full flex flex-col px-4 py-3">
      <div>
        <h1 className="text-3xl font-bold text-center m-3">ParkNFind</h1>
        <p className="text-center">광주광역시 공공데이터를 기반으로 공원 검색 및 지도 주변 주차장 정보를 제공하는 모바일 전용 웹사이트입니다.</p>
      </div>

      <div className="flex flex-col flex-1 gap-y-[8rem] justify-center items-center">
        <div className="text-xl">최근 업데이트 날짜 : 2024-02-17</div>

        <div className="text-xl">이메일 : brain1401@gmail.com</div>
      </div>
    </section>
  );
}