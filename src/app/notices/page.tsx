import { HiBellAlert } from "react-icons/hi2";

const NOTICE_LIST_CLASS = "px-2 py-5 bg-blue-200 text-center rounded-lg";

export default function NoticePage() {
  return (
    <section className="px-[2rem] py-[1rem] ">
      <div className="flex justify-center items-center">
        <h2 className="text-[2.5rem]">유의 사항</h2>
        <HiBellAlert className="w-[2.5rem] h-[2.5rem]" />
      </div>

      <div className="border-b-[1px] border-black" />
      <ul className="mt-10 flex flex-col justify-center gap-y-5">
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
    </section>
  );
}
