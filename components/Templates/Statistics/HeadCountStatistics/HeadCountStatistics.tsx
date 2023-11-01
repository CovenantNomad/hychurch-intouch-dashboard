import React from 'react';

interface HeadCountStatisticsProps {}

const HeadCountStatistics = ({}: HeadCountStatisticsProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold">인터치 인원 통계</h2>
      <div className="grid grid-cols-1 gap-y-2 lg:grid-cols-4 lg:gap-x-4 mt-4">
        <div className="py-5 px-3 rounded-md shadow-md bg-DARKGREEN text-white">
          <h3 className="">전체인원</h3>
          <div className="px-2 mt-2">
            <span className="text-3xl font-extralight">562명</span>
          </div>
        </div>
        <div className="py-5 px-3 bg-MUSTAD rounded-md shadow-md text-white">
          <h3 className="">셀 편성 인원</h3>
          <div className="px-2 mt-2">
            <span className="text-3xl font-extralight">362명</span>
          </div>
        </div>
        <div className="py-5 px-3 bg-DARKGREEN rounded-md shadow-md text-white">
          <h3 className="">새가족+블레싱</h3>
          <div className="px-2 mt-2">
            <span className="text-3xl font-extralight">62명</span>
          </div>
        </div>
        <div className="py-5 px-3 bg-INDIGO rounded-md shadow-md text-white">
          <h3 className="">새싹셀</h3>
          <div className="px-2 mt-2">
            <span className="text-3xl font-extralight">162명</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadCountStatistics;
