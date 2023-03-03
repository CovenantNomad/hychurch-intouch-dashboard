import React from "react";

interface SummaryButtonProps {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

const SummaryButton = ({ label, disabled, onClick }: SummaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-md border border-transparent bg-[#B0D1D4] py-3 px-4 text-base font-poppins font-medium text-white shadow-sm focus:outline-none disabled:bg-GRAY004"
    >
      {label}
    </button>
  );
};

export default SummaryButton;
