import React from "react";

interface FullWidthButtonProps {
  text: string;
  onClickHandler: () => void;
  disabled: boolean;
  bgColor?: string;
  textColor?: string;
}

const FullWidthButton = ({
  text,
  onClickHandler,
  disabled,
  bgColor = "bg-BLUE",
  textColor = "text-white",
}: FullWidthButtonProps) => {
  return (
    <button
      onClick={onClickHandler}
      disabled={disabled}
      type="button"
      className={`inline-flex items-center justify-center py-3 ${bgColor} ${textColor} w-full`}
    >
      {text}
    </button>
  );
};

export default FullWidthButton;
