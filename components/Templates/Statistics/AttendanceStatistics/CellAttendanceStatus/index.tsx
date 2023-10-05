import React, { useState } from 'react';
import WorshipAttendanceStatus from '../../../../Organisms/Statistics/AttendanceStatistics/WorshipAttendanceStatus';
import IndividualAttendanceSatus from '../../../../Organisms/Statistics/AttendanceStatistics/IndividualAttendanceSatus';
import AttendanceStatisticsHeader from '../../../../Organisms/Statistics/AttendanceStatistics/AttendanceStatisticsHeader/AttendanceStatisticsHeader';

interface CellAttendanceStatusProps {}

const CellAttendanceStatus = ({}: CellAttendanceStatusProps) => {
  const [ isOpen, SetIsOpen ] = useState(false)
  const [ selectedCellId, setSelectedCellId ] = useState<string | null>(null)
  const [ selectedCellName, setSelectedCellName ] = useState<string | null>(null)
  const [ selectedMemberId, setSelectedMemberId ] = useState<string | null>(null)
  const [ selectedMemberName, setSelectedMemberName ] = useState<string | null>(null)

  const onSelectCellHandler = (id: string, name: string) => {
    setSelectedCellId(id)
    setSelectedCellName(name)
  }

  const onResetCellHandler = () => {
    setSelectedCellId(null)
    setSelectedCellName(null)
    setSelectedMemberId(null)
    setSelectedMemberName(null)
    SetIsOpen(false)
  }

  const onSelectMemberHandler = (id: string, name: string) => {
    SetIsOpen(true)
    setSelectedMemberId(id)
    setSelectedMemberName(name)
  }

  const onResetMemberHandler = () => {
    setSelectedMemberId(null)
    setSelectedMemberName(null)
    SetIsOpen(false)
  }

  return (
    <div>
      <h2 className="text-xl font-bold">이번주 셀별 출석 명단 <span className='text-sm inline-block ml-4'>(기준일자: 2023.10.01)</span></h2>
      <AttendanceStatisticsHeader 
        onSelectHandler={onSelectCellHandler}
      />
      <div className='grid grid-cols-1 mt-6 lg:grid-cols-3 lg:mt-0'>
        <div className='col-span-1 lg:col-span-2 lg:flex-1'>
          <WorshipAttendanceStatus 
            cellId={selectedCellId}
            cellName={selectedCellName}
            onSelectHandler={onSelectMemberHandler}
            onResetHandler={onResetCellHandler}
          />
        </div>
        <div className='col-span-1 lg:flex-1'>
          <IndividualAttendanceSatus
            isOpen={isOpen} 
            memberId={selectedMemberId}
            memberName={selectedMemberName}
            onResetHandler={onResetMemberHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default CellAttendanceStatus;
