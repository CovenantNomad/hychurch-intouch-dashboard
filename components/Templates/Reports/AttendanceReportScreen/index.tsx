import React, { useState } from "react";
//components
import Spinner from "../../../Atoms/Spinner";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import AttendanceFormSection from "../../../Organisms/Reports/AttendanceFormSection";
import BlockCardContainer from "../../../Atoms/Container/BlockCardContainer";

interface AttendanceReportScreenProps {}

const AttendanceReportScreen = ({}: AttendanceReportScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const mockWayData = ["강소은셀", "김도원셀", "김민석셀", "김유진셀", "김파비오셀", "박성연셀", "박성은셀", "신가원셀"]
  const mockLightData = ["김희연셀", "민예원셀", "신다은셀", "윤예진셀", "이혜인셀", "최현경셀"]
  const mockLifeData = ["김혜원셀", "인슬아셀", "류수진셀", "주원형셀"]
  const mockFaithData = ["강바다셀", "김별셀", "김소리셀", "김한살셀", "이정화셀", "이찬미셀"]

  const mockWayMissingData = []
  const mockLightMissingData = ["김희연셀", "민예원셀"]
  const mockLifeMissingData = ["김혜원셀", "인슬아셀", "류수진셀", "주원형셀"]
  const mockFaithMissingData = ["강바다셀", "김별셀"]

  return (
    <>
      <div className="h-screen flex justify-center items-center">
          <h1 className="text-4xl font-bold">
            현재 페이지는
            <br />
            개발 중입니다
          </h1>
      </div>
      {/* {isLoading ? (
        <div className="w-full h-screen flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <BlockContainer firstBlock>
            <AttendanceFormSection />
          </BlockContainer>
          <div className="grid grid-cols-1 gap-y-2 lg:grid-cols-3 lg:gap-x-2 ">
            <BlockCardContainer>
              <div><h4 className="text-center text-lg font-bold">셀별 출석체크 제출 현황</h4></div>
              <div className="h-[1px] bg-gray-300 my-4"/>
              <div>
                <div className="mb-4">
                  <p className="text-center text-green-600">24셀 제출완료</p>
                </div>
                <div className="flex flex-col gap-y-6">
                  <div className="w-full">
                    <div className="mb-2">
                      <p className="text-lg font-bold">생명 공동체</p>
                      <p className="text-sm text-gray-500">4셀 제출 완료</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {mockLifeData.map((item, index) => (
                        <div key={index} className="flex justify-start">
                          <p className="max-w-fit px-2 py-1 text-sm bg-gray-600 text-white">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-2">
                      <p className="text-lg font-bold">진리 공동체</p>
                      <p className="text-sm text-gray-500">6셀 제출 완료</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {mockFaithData.map((item, index) => (
                        <div key={index} className="flex justify-start">
                          <p className="max-w-fit px-2 py-1 text-sm bg-gray-600 text-white">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-2">
                      <p className="text-lg font-bold">빛 공동체</p>
                      <p className="text-sm text-gray-500">6셀 제출 완료</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {mockLightData.map((item, index) => (
                        <div key={index} className="flex justify-start">
                          <p className="max-w-fit px-2 py-1 text-sm bg-gray-600 text-white">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-2">
                      <p className="text-lg font-bold">길 공동체</p>
                      <p className="text-sm text-gray-500">8셀 제출 완료</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {mockWayData.map((item, index) => (
                        <div key={index} className="flex justify-start">
                          <p className="max-w-fit px-2 py-1 text-sm bg-gray-600 text-white">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </BlockCardContainer>
            <BlockCardContainer>
              <div><h4 className="text-center text-lg font-bold">셀별 출석체크 미제출 현황</h4></div>
              <div className="h-[1px] bg-gray-300 my-4"/>
              <div>
                <div className="mb-4">
                  <p className="text-center text-orange-600">8셀 미제출</p>
                </div>
                <div className="flex flex-col gap-y-6">
                  <div className="w-full">
                    <div className="mb-2">
                      <p className="text-lg font-bold">생명 공동체</p>
                      <p className="text-sm text-gray-500">4셀</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {mockLifeMissingData.map((item, index) => (
                        <div key={index} className="flex justify-start">
                          <p className="max-w-fit px-2 py-1 text-sm bg-gray-600 text-white">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-2">
                      <p className="text-lg font-bold">진리 공동체</p>
                      <p className="text-sm text-gray-500">2셀</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {mockFaithMissingData.map((item, index) => (
                        <div key={index} className="flex justify-start">
                          <p className="max-w-fit px-2 py-1 text-sm bg-gray-600 text-white">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-2">
                      <p className="text-lg font-bold">빛 공동체</p>
                      <p className="text-sm text-gray-500">2셀</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {mockLightMissingData.map((item, index) => (
                        <div key={index} className="flex justify-start">
                          <p className="max-w-fit px-2 py-1 text-sm bg-gray-600 text-white">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-2">
                      <p className="text-lg font-bold">길 공동체</p>
                      <p className="text-sm text-gray-500">0셀</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {mockWayMissingData.length !== 0 ? (
                        mockLightMissingData.map((item, index) => (
                          <div key={index} className="flex justify-start">
                            <p className="max-w-fit px-2 py-1 text-sm bg-gray-600 text-white">{item}</p>
                          </div>
                        ))
                      ) : (
                        <div>
                          <p className="text-green-600">모든 셀이 제출하였습니다</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </BlockCardContainer>
            <BlockCardContainer>
              <div><h4 className="text-center text-lg font-bold">바나바 출석체크 현황</h4></div>
              <div className="h-[1px] bg-gray-300 my-4"/>
              <div>
                <div className="mb-4">
                  <p className="text-center text-orange-600">2명 바나바 미제출</p>
                </div>
                <div className="flex flex-col gap-y-6">
                  <div className="w-full">
                    <div className="mb-2">
                      <p className="text-lg font-bold">출석</p>
                      <p className="text-sm text-gray-500">4명</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {mockLifeMissingData.map((item, index) => (
                        <div key={index} className="flex justify-start">
                          <p className="max-w-fit px-2 py-1 text-sm bg-gray-600 text-white">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-2">
                      <p className="text-lg font-bold">미출석</p>
                      <p className="text-sm text-gray-500">8명</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {mockFaithMissingData.map((item, index) => (
                        <div key={index} className="flex justify-start">
                          <p className="max-w-fit px-2 py-1 text-sm bg-gray-600 text-white">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-[1px] bg-gray-300 my-4"/>
                  <div className="w-full">
                    <div className="mb-2">
                      <p className="text-lg font-bold">미제출 바나바</p>
                      <p className="text-sm text-gray-500">2명</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {mockLightMissingData.map((item, index) => (
                        <div key={index} className="flex justify-start">
                          <p className="max-w-fit px-2 py-1 text-sm bg-gray-600 text-white">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </BlockCardContainer>
          </div>
        </>
      )} */}
    </>
  );
};

export default AttendanceReportScreen;
