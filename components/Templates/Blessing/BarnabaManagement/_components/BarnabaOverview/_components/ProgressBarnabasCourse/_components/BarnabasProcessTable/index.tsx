import {TMatching} from "../../../../../../../../../../interface/barnabas";
import BarnabasProcessTableBody from "./_components/BarnabasProcessSetting/_components/BarnabasProcessTableBody";

type Props = {
  data: TMatching[];
};

const BarnabasProcessTable = ({data}: Props) => {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-300">
      {/* Header */}
      <div className="grid grid-cols-12 border-b border-gray-300 text-sm text-center text-[#71717A] hover:bg-gray-50">
        <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
          매칭일
        </div>
        <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
          바나바
        </div>
        <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
          멘티
        </div>
        <div className="h-10 col-span-1 flex items-center justify-center cursor-pointer border-r border-gray-300">
          진행 기간
        </div>
        <div className="h-10 col-span-1 flex items-center justify-center cursor-pointer border-r border-gray-300">
          진행 주차
        </div>
        <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
          마지막 만남
        </div>
        <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
          다음 주차
        </div>
        <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
          만남일
        </div>
        <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
          만남장소
        </div>
        <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
          만남상태
        </div>
        <div className="h-10 col-span-1 flex items-center justify-center border-r border-gray-300">
          만남 새로고침
        </div>
        <div className="h-10 col-span-1 flex items-center justify-center">
          전체과정 설정
        </div>
      </div>

      {/* Body */}
      <div className="divide-y divide-gray-300">
        {data
          .slice()
          .sort((a, b) => a.matchingDate.localeCompare(b.matchingDate))
          .map((barnabas, index) => (
            <BarnabasProcessTableBody key={index} barnabas={barnabas} />
          ))}
      </div>
    </div>
  );
};

export default BarnabasProcessTable;
