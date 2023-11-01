import React from 'react';
import { mockAttendanceHistoryType } from '../../../../Organisms/Statistics/AttendanceStatistics/IndividualAttendanceSatus';
import EmptyStateSimple from '../../../../Atoms/EmptyStates/EmptyStateSimple';
import { CheckIcon, VideoCameraIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface IndividualAttendanceHistoryProps {
  attendanceHistoryData: mockAttendanceHistoryType[] | null
}

const IndividualAttendanceHistory = ({ attendanceHistoryData }: IndividualAttendanceHistoryProps) => {
  return (
    <div className="mt-8 flow-root">
      <p className='text-sm font-medium text-gray-500'>최근 4주 출석현황</p>
      {attendanceHistoryData ? (
        <div className="-mx-4 -my-2 overflow-x-auto mt-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="divide-x divide-gray-200">
                  <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 lg:pl-0">
                    <span className="sr-only">주차</span>
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                    1~4부
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                    인터치
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
                    셀모임
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {attendanceHistoryData.map((weekHistory) => (
                  <tr key={weekHistory.id} className="divide-x divide-gray-200">
                    <td scope="col" className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                      {weekHistory.week}
                    </td>
                    <td scope="col" className="py-4 text-center">
                      <span className='inline-flex justify-center'>
                        {!weekHistory.attendedOthers ? (
                          <XMarkIcon className='h-5 w-5 text-rose-700'/>
                        ) : (
                          <>
                          {weekHistory.onSiteOthers ? (
                            <CheckIcon className='h-5 w-5 text-teal-700'/>
                          ) : (
                            <VideoCameraIcon className='h-5 w-5 text-teal-700'/>
                          )}
                          </>
                        )}
                      </span>
                    </td>
                    <td scope="col" className="py-4 text-center">
                      <span className='inline-flex justify-center'>
                        {!weekHistory.attendedIntouch ? (
                          <XMarkIcon className='h-5 w-5 text-rose-700'/>
                        ) : (
                          <>
                          {weekHistory.onSiteIntouch ? (
                            <CheckIcon className='h-5 w-5 text-teal-700'/>
                          ) : (
                            <VideoCameraIcon className='h-5 w-5 text-teal-700'/>
                          )}
                          </>
                        )}
                      </span>
                    </td>
                    <td scope="col" className="py-4 text-center">
                      <span className='inline-flex justify-center'>
                        {weekHistory.cellMeeting ? (
                          <CheckIcon className='h-5 w-5 text-teal-700'/>
                        ) : (
                          <XMarkIcon className='h-5 w-5 text-rose-700'/>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div
            className="w-full flex flex-col justify-center items-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
          >
          <EmptyStateSimple />
        </div>
      )}
    </div>
  );
};

export default IndividualAttendanceHistory;
