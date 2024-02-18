import { HiBellAlert } from "react-icons/hi2";
import Goback from "../components/Goback";

const NOTICE_LIST_CLASS =
  "px-4 py-3 bg-blue-50 text-blue-900 text-center rounded-lg shadow-lg transition-all duration-300";

export default function NoticePage() {
  return (
    <section className="p-4 h-full">
      <div className="relative flex flex-col h-full items-center text-sm bg-white rounded-lg p-6">
        <Goback className="w-6 h-6 absolute top-3 left-3 text-blue-500" />
        <div className="flex flex-col justify-center items-center text-center mb-6">
          <h2 className="text-2xl font-bold mb-2 text-blue-800">유의 사항</h2>
          <HiBellAlert className="w-12 h-12 text-blue-500" />
        </div>

        <div className="w-full border-b-4 border-blue-300 mb-8" />
        <ul className="w-full flex flex-col items-center gap-y-4">
          <li className={NOTICE_LIST_CLASS}>
            공공데이터를 기반으로 제공되는 정보로, 모든 주차장의 정보가 포함되어
            있지 않을 수 있습니다.
          </li>
          <li className={NOTICE_LIST_CLASS}>
            유의사항 미숙지로 발생된 피해는 운전자에게 책임이 있습니다.
          </li>
          <li className={NOTICE_LIST_CLASS}>
            주차장 내에서의 사고 및 분쟁은 당사자간 해결하셔야 합니다.
          </li>
          <li className={NOTICE_LIST_CLASS}>
            긴급사태 대비, 차량 보호 등을 위해 운전자 연락처를 차량에 부착해
            주시기 바랍니다.
          </li>
          <li className={NOTICE_LIST_CLASS}>
            차량 훼손, 도난 등에 따른 민·형사상 책임은 이용자에게 있음
          </li>
        </ul>
      </div>
    </section>
  );
}
