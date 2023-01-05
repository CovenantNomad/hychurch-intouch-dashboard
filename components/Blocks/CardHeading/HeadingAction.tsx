import React from 'react';

interface HeadingActionProps {
  title: string
  btnText: string
  onClickHandler: () => void
  paddingHorizontal?: boolean
}

const HeadingAction = ({ title, btnText, paddingHorizontal, onClickHandler }: HeadingActionProps) => {
  return (
    <div className={`border-b border-gray-200 bg-white py-5 ${paddingHorizontal && 'px-4 sm:px-6'}`}>
      <div className="-mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="mt-2">
          <h3 className="text-xl font-medium leading-6 text-gray-900">{title}</h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <button
            type="button"
            onClick={onClickHandler}
            className="relative inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeadingAction;
