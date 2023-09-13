import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { terminateDallentSeason } from '../../../../firebase/Dallant/Dallant';

interface TerminateSeasonProps {}

const TerminateSeason = ({}: TerminateSeasonProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: terminatMutate } = useMutation(terminateDallentSeason, {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getTalentSetting'] });
    },
  })

  return (
    <div className='flex flex-col justify-center items-center py-12'>
      <h2 className="text-xl font-medium">시즌 중</h2>
      <div className='mt-8'>
        <button
          type="button"
          onClick={async () => await terminatMutate()}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-BLUE"
        >
          시즌종료
        </button>
        </div>
    </div>
  );
};

export default TerminateSeason;
