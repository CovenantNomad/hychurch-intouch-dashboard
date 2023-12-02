import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import React from 'react';

type TemporarySaveAlertProps = {}

const TemporarySaveAlert = ({}: TemporarySaveAlertProps) => {
  return (
    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            {'작성 중인 출석체크가 존재합니다.'}<br/>
            <span className="font-medium text-yellow-700 underline hover:text-yellow-600">
              {'이어서 출석체크를 작성하시고 최종제출 해주세요'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemporarySaveAlert;
