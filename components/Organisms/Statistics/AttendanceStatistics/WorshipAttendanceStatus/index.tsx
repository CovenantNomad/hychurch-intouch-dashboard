import React from 'react';
import WroshipServiceCard from '../../../../Blocks/Statistics/WorshipAttendanceSatus/WroshipServiceCard';
import { NoSymbolIcon } from '@heroicons/react/24/outline';

interface WorshipAttendanceStatusProps {
  cellId: string | null;
  cellName: string | null;
  onSelectHandler: (id: string, name: string) => void;
  onResetHandler: () => void;
}

export interface mockMemberType {
  id: string;
  name: string;
  attended: boolean;
  onSite: boolean;
  cellMeeting: boolean;
}

const mockIntouchOfflineData = [
  { id: '2', name: '남정훈', attended: true, onSite: true, cellMeeting: true},
  { id: '316', name: '박미희', attended: true, onSite: true, cellMeeting: true},
  { id: '318', name: '오연재', attended: true, onSite: false, cellMeeting: false},
  { id: '71', name: '이범석', attended: true, onSite: true, cellMeeting: false},
  { id: '246', name: '문진철', attended: true, onSite: true, cellMeeting: true},
  { id: '39', name: '이진석', attended: true, onSite: true, cellMeeting: true},
  { id: '658', name: '김정미', attended: true, onSite: true, cellMeeting: true},
  { id: '48', name: '정한나', attended: true, onSite: false, cellMeeting: false},
  { id: '455', name: '이예진A', attended: true, onSite: false, cellMeeting: false},
]

const mockOthersOfflineData = [
  { id: '70', name: '오하늘', attended: true, onSite: true, cellMeeting: false},
]

const mockMissingData = [
  { id: '41', name: '윤홍찬', attended: false, onSite: false, cellMeeting: false},
]

const WorshipAttendanceStatus = ({ cellId, cellName, onSelectHandler, onResetHandler }: WorshipAttendanceStatusProps) => {

  return (
    <div className='h-full px-6 py-10 border'>
      <div className='flex justify-between items-center'>
        <h3 className="text-lg font-semibold">{cellName ? cellName : "셀이름"}</h3>
        <button
          onClick={onResetHandler}
        >
          <span className='text-sm'>초기화</span>
        </button>
      </div>
      {cellId ? (
        <div className='mt-4'>
          <WroshipServiceCard title="인터치예배" memberList={mockIntouchOfflineData} onSelectHandler={onSelectHandler} />
          <WroshipServiceCard title="1~4부예배" memberList={mockOthersOfflineData} onSelectHandler={onSelectHandler} />
          <WroshipServiceCard title="미참석" memberList={mockMissingData} onSelectHandler={onSelectHandler} />
        </div>
      ) : (
        <div className='mt-6'>
          <div
            className="w-full flex flex-col justify-center items-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
          >
            <NoSymbolIcon className='w-8 h-8 text-gray-400'/>
            <p className="mt-4 text-sm font-semibold text-gray-900">선택된 셀 없습니다</p>
            <p className="mt-1 text-sm text-gray-500">셀을 선택하여 출석명단을 확인하세요</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorshipAttendanceStatus;
