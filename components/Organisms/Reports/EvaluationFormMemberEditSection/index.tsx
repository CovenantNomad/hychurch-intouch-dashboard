import React, { useState } from 'react';
import { IndividualEvaluationDataType } from '../../../../interface/EvaluationFormTypes';

type EvaluationFormMemberEditSectionProps = {
  memberList: IndividualEvaluationDataType[]
  setMemberList: React.Dispatch<React.SetStateAction<IndividualEvaluationDataType[] | null>>
  onResetHandler: () => void
}

const EvaluationFormMemberEditSection = ({ memberList, setMemberList, onResetHandler }: EvaluationFormMemberEditSectionProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (event.target.checked) {
      // 체크된 경우, 배열에 추가
      setCheckedItems([...checkedItems, value]);
    } else {
      // 체크 해제된 경우, 배열에서 제거
      setCheckedItems(checkedItems.filter(item => item !== value));
    }
  };

  const handleDelete = () => {
    const updatedMemberList = memberList.filter(member => !checkedItems.includes(member.userId));
    setMemberList(updatedMemberList);
    setCheckedItems([]); // 선택된 항목 초기화
  };

  return (
    <div className='px-4 py-6'>
      <div className='flex space-x-4 mb-4'>
        <button
          onClick={handleDelete} 
          className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
        >
          삭제하기
        </button>
        <button
          onClick={onResetHandler} 
          className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
        >
          초기화
        </button>
      </div>
      <p className='text-sm mb-4'>혹시 출력명단에서 제외 할 셀원이 있으면 체크해서 삭제하기를 눌러주세요</p>
      <div className='grid grid-cols-4 grid-rows-2 gap-4'>
        {memberList
          .sort((a, b) => (a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0))
          .map((member) => (
          <div key={member.userId} className='col-span-1 row-span-1 px-3 py-2 border' style={{ pageBreakInside: 'avoid' }}>
            <input type='checkbox' id={member.userId} onChange={handleCheckboxChange} value={member.userId}/>
            <label htmlFor={member.userId} className='ml-2'>{member.userName}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvaluationFormMemberEditSection;
