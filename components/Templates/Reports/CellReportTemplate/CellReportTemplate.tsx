import React, { ForwardedRef, forwardRef } from "react";
import { CellReportType } from "../../../../constants/mockCellReport";

interface CellReportProps {
  report: CellReportType;
}

const CellReportTemplate = forwardRef<HTMLDivElement, CellReportProps>(
  (props, ref) => {
    const { report } = props;

    return (
      <main ref={ref} className="px-8 break-after-page">
        <header className="pt-8">
          <div className="pb-4 text-center">
            <h1 className="text-2xl font-bold">남정훈셀 셀보고서</h1>
          </div>
          <div>
            <p className="text-sm font-semibold leading-6 text-gray-900">
              2023년 5월 7일
            </p>
          </div>
        </header>
        <div className="mt-2 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                <thead>
                  <tr className="flex divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="w-[36px] text-center text-sm font-semibold text-gray-900"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="w-[64px] text-center text-sm font-semibold text-gray-900"
                    >
                      이름
                    </th>
                    <th
                      scope="col"
                      className="w-[44px] text-center text-sm font-semibold text-gray-900"
                    >
                      심방
                    </th>
                    <th
                      scope="col"
                      className="w-[76px] text-center text-sm font-semibold text-gray-900"
                    >
                      예배출석
                    </th>
                    <th
                      scope="col"
                      className="w-[52px] text-center text-sm font-semibold text-gray-900"
                    >
                      셀모임
                    </th>
                    <th
                      scope="col"
                      className="flex-1 text-center text-sm font-semibold text-gray-900"
                    >
                      한 주간 스토리
                    </th>
                    <th
                      scope="col"
                      className="flex-1 text-center text-sm font-semibold text-gray-900 sm:pr-0"
                    >
                      기도제목
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {report.memberReports.slice(0, 4).map((member) => (
                    <tr
                      key={member.id}
                      className="inline-flex divide-x divide-gray-200"
                    >
                      <td className="flex w-[36px] p-2 whitespace-nowrap items-center justify-center text-sm font-medium text-black">
                        {member.order}
                      </td>
                      <td className="flex w-[64px] p-2 whitespace-pre-wrap items-center justify-center text-sm text-black">
                        {member.name}
                      </td>
                      <td className="flex w-[44px] p-2 whitespace-pre-wrap items-center justify-center text-sm text-black">
                        {member.meeting}
                      </td>
                      <td className="flex w-[76px] p-2 whitespace-pre-wrap items-center justify-center text-center text-sm text-black">
                        {`젊은이예배\n(성전)`}
                      </td>
                      <td className="flex w-[52px] p-2 whitespace-pre-wrap items-center justify-center text-sm text-black">
                        {member.cellMeeting ? "참석" : "불참"}
                      </td>
                      <td className="flex-1 p-2 whitespace-pre-wrap text-base text-black">
                        {member.story}
                      </td>
                      <td className="flex-1 p-2 whitespace-pre-wrap text-base text-black">
                        <ul className="list-outside pl-4">
                          {member.praylist.map((pray) => (
                            <li key={pray.id} className="list-decimal ">
                              {pray.content}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center items-center py-2 mt-4 border border-b-0 border-gray-300 bg-blue-200">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  강한용사 리더생활
                </h3>
              </div>
              <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                <thead>
                  <tr className="grid grid-cols-8 divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="col-span-1 py-1 justify-center items-center text-center text-sm font-semibold text-gray-900"
                    >
                      개인기도
                    </th>
                    <th
                      scope="col"
                      className="col-span-1 py-1 justify-center items-center text-center text-sm font-semibold text-gray-900"
                    >
                      성전기도
                    </th>
                    <th
                      scope="col"
                      className="col-span-1 py-1 justify-center items-center text-center text-sm font-semibold text-gray-900"
                    >
                      천사기도
                    </th>
                    <th
                      scope="col"
                      className="col-span-1 py-1 justify-center items-center text-center text-sm font-semibold text-gray-900"
                    >
                      미션통독
                    </th>
                    <th
                      scope="col"
                      className="col-span-1 py-1 justify-center items-center text-center text-sm font-semibold text-gray-900"
                    >
                      큐티
                    </th>
                    <th
                      scope="col"
                      className="col-span-1 py-1 justify-center items-center text-center text-sm font-semibold text-gray-900"
                    >
                      새벽예배
                    </th>
                    <th
                      scope="col"
                      className="col-span-1 py-1 justify-center items-center text-center text-sm font-semibold text-gray-900"
                    >
                      수요예배
                    </th>
                    <th
                      scope="col"
                      className="col-span-1 py-1 justify-center items-center text-center text-sm font-semibold text-gray-900 sm:pr-0"
                    >
                      금요성령집회
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="grid grid-cols-8 divide-x divide-gray-200">
                    <td className="col-span-1 py-2 justify-center items-center whitespace-nowrap text-center text-base text-black">
                      {report.leaderReport.individualPray}
                    </td>
                    <td className="col-span-1 py-2 justify-center items-center whitespace-pre-wrap text-center text-base text-black">
                      {report.leaderReport.inplacePray}
                    </td>
                    <td className="col-span-1 py-2 justify-center items-center whitespace-pre-wrap text-center text-base text-black">
                      {report.leaderReport.manitoPray}
                    </td>
                    <td className="col-span-1 py-2 justify-center items-center whitespace-pre-wrap text-center text-base text-black">
                      {report.leaderReport.missionBible}
                    </td>
                    <td className="col-span-1 py-2 justify-center items-center whitespace-pre-wrap text-center text-base text-black">
                      {report.leaderReport.qt}
                    </td>
                    <td className="col-span-1 py-2 justify-center items-center whitespace-pre-wrap text-center text-base text-black">
                      {report.leaderReport.morningWorship}
                    </td>
                    <td className="col-span-1 py-2 justify-center items-center whitespace-pre-wrap text-center text-base text-black">
                      {report.leaderReport.wednesdayWorship}
                    </td>
                    <td className="col-span-1 py-2 justify-center items-center whitespace-pre-wrap text-center text-base text-black">
                      {report.leaderReport.fridayWorship}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-center items-center py-2 mt-4 border border-b-0 border-gray-300 bg-blue-200">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  To. 사랑하는 백선경 목사님께
                </h3>
              </div>
              <div className="min-h-[48px] border border-gray-300 px-4 py-2">
                <p className="text-base text-black">{report.toPastor}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
);

CellReportTemplate.displayName = "CellReport";

export default CellReportTemplate;
