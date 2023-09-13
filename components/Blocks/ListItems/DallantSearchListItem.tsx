import React, { useState } from 'react';
import { Member } from '../../../interface/user';
import { checkCommonCell, getGender } from '../../../utils/utils';
import { useMutation, useQueryClient } from 'react-query';

import SimpleModal from '../Modals/SimpleModal';
import { createRegisterOthers } from '../../../firebase/Dallant/DallantOthers';


interface DallantSearchListItemProps {
  member: Member;
}

const DallantSearchListItem = ({ member }: DallantSearchListItemProps) => {
  const queryClient = useQueryClient();
  const [ open, setOpen ] = useState<boolean>(false)
  
  const { mutateAsync } = useMutation(createRegisterOthers, {
    onSettled: () => {
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['getOthersList']})
    }
  })

  const onRegisterHandler = async () => {
    const submitData = {
      cellId: member.cell?.id || "999",
      cellName: member.cell?.name || "미편성셀",
      userId: member.id,
      userName: member.name,
      phone: member.phone,
    }

    await mutateAsync(submitData)
  }

  return (
    <div
      className="relative flex items-center justify-between space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
    >
      <div className="focus:outline-none">
        <p className="truncate text-sm text-gray-500">{member.cell?.name}</p>
        <p className="text-sm font-medium text-gray-900">{member.name} {getGender(member.gender!)}</p>
        <p className="truncate text-sm text-gray-500 mt-1">{member.phone}</p>
      </div>
      <div>
        <button
          onClick={() => setOpen(true)} 
          disabled={checkCommonCell(member.cell)}
          className={`text-sm border border-gray-500 px-2 py-1 rounded-xl ${checkCommonCell(member.cell) && 'text-gray-300 cursor-not-allowed'}`}
        >
          등록
        </button>
      </div>
      <SimpleModal 
        title="지급목록에 등록"
        description={`${member.name} 청년을 지급목록에 등록하시겠습니까?`}
        actionLabel="등록"
        open={open}
        setOpen={setOpen}
        actionHandler={() => onRegisterHandler()}
      />
    </div>
  );
};

export default DallantSearchListItem;
