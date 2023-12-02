import { XCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';

type NotSubmittedAlertProps = {
  cellName: string;
}

const NotSubmittedAlert = ({ cellName }: NotSubmittedAlertProps) => {
  return (
    <div className="bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            이번주 {cellName} 예배출석이 제출되지 않았습니다.
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc space-y-1 pl-5">
              <li>출석체크를 제출해주세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotSubmittedAlert;
