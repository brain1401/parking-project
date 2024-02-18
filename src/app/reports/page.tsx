"use client";

import Goback from "../components/Goback";

const data = [
  {
    id: 1,
    "신고 날짜": "2021-10-10",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "접수중",
  },
  {
    id: 2,
    "신고 날짜": "2021-10-11",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "처리완료",
  },
  {
    id: 3,
    "신고 날짜": "2021-10-12",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "처리완료",
  },
  {
    id: 4,
    "신고 날짜": "2021-10-13",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "접수중",
  },
  {
    id: 5,
    "신고 날짜": "2021-10-14",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "처리완료",
  },
  {
    id: 6,
    "신고 날짜": "2021-10-15",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "접수중",
  },
  {
    id: 7,
    "신고 날짜": "2021-10-16",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "처리완료",
  },
  {
    id: 8,
    "신고 날짜": "2021-10-17",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "처리완료",
  },
  {
    id: 9,
    "신고 날짜": "2021-10-18",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "접수중",
  },
  {
    id: 10,
    "신고 날짜": "2021-10-19",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "처리완료",
  },
  {
    id: 11,
    "신고 날짜": "2021-10-20",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "처리완료",
  },
  {
    id: 12,
    "신고 날짜": "2021-10-21",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "접수중",
  },
  {
    id: 13,
    "신고 날짜": "2021-10-22",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "처리완료",
  },
  {
    id: 14,
    "신고 날짜": "2021-10-23",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "접수중",
  },
  {
    id: 15,
    "신고 날짜": "2021-10-24",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "처리완료",
  },
  {
    id: 16,
    "신고 날짜": "2021-10-25",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "처리완료",
  },
  {
    id: 17,
    "신고 날짜": "2021-10-26",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "접수중",
  },
  {
    id: 18,
    "신고 날짜": "2021-10-27",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "처리완료",
  },
  {
    id: 19,
    "신고 날짜": "2021-10-28",
    "차량 번호": "xxxx-xxxx-xxxx",
    신고결과: "접수중",
  },
];
export default function ReportsPage() {
  return (
    <section className="flex flex-col w-full h-full px-5 py-5 bg-gray-100">
      <Goback className="w-7 h-7 absolute" />
      <h1 className="text-lg text-center py-2 text-gray-800 font-semibold">
        신고 내역
      </h1>
      <div className="rounded-[2.5px] border-b-[5px] border-b-gray-600" />

      <ul className="flex flex-col my-5 px-2 py-3 rounded-md bg-white shadow-lg overflow-y-scroll">
        {data.map((report) => (
          <li
            key={report.id}
            className="flex justify-between items-center my-2 bg-gray-50 p-3 rounded-lg"
          >
            <div>
              <h2 className="text-sm font-medium text-gray-700">
                신고 날짜: {report["신고 날짜"]}
              </h2>
              <h2 className="text-sm font-medium text-gray-700">
                차량 번호: {report["차량 번호"]}
              </h2>
              <h2 className="text-sm font-medium text-gray-700">
                신고결과: {report["신고결과"]}
              </h2>
            </div>
            <button className="text-white bg-blue-500 hover:bg-blue-700 transition duration-150 ease-in-out rounded-md px-4 py-2 text-xs font-semibold">
              자세히
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
