import { CheckCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';

type CompletedAlertProps = {
  cellName: string;
}

const CompletedAlert = ({ cellName }: CompletedAlertProps) => {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="lg:flex lg:items-center">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
              이번주 {cellName} 출석체크 제출을 완료하였습니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedAlert;
