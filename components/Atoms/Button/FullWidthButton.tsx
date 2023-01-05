import React from 'react';

interface FullWidthButtonProps {
  text: string
  onClickHandler: () => void
  disabled: boolean
}

const FullWidthButton = ({ text, onClickHandler, disabled }: FullWidthButtonProps) => {
  return (
    <button 
      onClick={onClickHandler}
      disabled={disabled}
      type='button'
      className='inline-flex items-center justify-center py-3 bg-blue-600 text-white w-full '>
        {text}
    </button>
  );
};

export default FullWidthButton;
