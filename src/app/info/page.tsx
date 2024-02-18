"use client";

import Goback from "../components/Goback";

export default function InfoPage() {
  return (
    <section className="w-full h-full px-4 py-5 bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="relative w-full h-full flex flex-col items-center">
        <Goback className="w-8 h-8 absolute top-5 left-5 text-blue-800" />
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-blue-900 m-5">
            ParkNFind
          </h1>
          <p className="text-center mt-8 mb-12 text-lg text-blue-800">
            광주광역시 공공데이터를 기반으로 공원 검색 및 지도 주변 주차장
            정보를 제공하는 모바일 전용 웹사이트입니다.
          </p>
        </div>

        <div className="flex flex-col gap-y-10 justify-center items-center mb-10">
          <div className="text-lg bg-blue-100 text-blue-900 px-6 py-3 rounded-lg shadow">
            최근 업데이트 날짜 : 2024-02-18
          </div>

          <a
            href="mailto:brain1401@gmail.com"
            className="text-lg text-blue-900 underline"
          >
            이메일 : brain1401@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
