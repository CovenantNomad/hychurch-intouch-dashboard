import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { terminateDallentSeason } from '../../../../../firebase/Dallant/Dallant';
import SimpleModal from '../../../../Blocks/Modals/SimpleModal';
import dayjs from 'dayjs';
import { getTodayString } from '../../../../../utils/dateUtils';

interface TerminateSeasonProps {}

const TerminateSeason = ({}: TerminateSeasonProps) => {
  const queryClient = useQueryClient();
  const [ open, setOpen ] = useState(false)
  const { mutateAsync: terminatMutate, isLoading } = useMutation(terminateDallentSeason, {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getTalentSetting'] });
    },
  })

  

  return (
    <div className='flex flex-col justify-center items-center py-12'>
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h2 id="sale-heading" className="text-2xl font-bold tracking-tight text-gray-900 lg:text-4xl">
          INTOUCH DALLANT SEASON
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-xl text-center text-gray-600">
          현재는 시즌이 진행 중에 있습니다.
        </p>
      </div>
      <div className='mt-12'>
        <button
          type="button"
          onClick={() => setOpen(true)}
          disabled={isLoading}
          className="w-60 rounded-md bg-black px-3.5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 disabled:bg-black/20 disabled:cursor-not-allowed"
        >
          시즌종료
        </button>
      </div>
      <SimpleModal 
        title={"시즌종료"}
        description={"이번 시즌을 종료하시겠습니까?"}
        actionLabel={"종료"}
        open={open}
        setOpen={setOpen}
        actionHandler={async () => await terminatMutate(getTodayString(dayjs()))}
      />
    </div>
  );
};

export default TerminateSeason;
