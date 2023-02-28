import { useRouter } from "next/router";
import React from "react";
import BackIcon from "../Icons/BackIcon";

interface SectionHeaderProps {
  title: string | string[] | undefined;
  subtitle?: string;
  goBack?: boolean;
}

const SectionHeader = ({ title, subtitle, goBack }: SectionHeaderProps) => {
  const router = useRouter();
  return (
    <div className="px-2 pt-2">
      <div className="py-5 px-4 rounded-md bg-white">
        <div className="flex items-center">
          {goBack && <BackIcon onClick={router.back} />}
          <div className={`${goBack ? "ml-3" : "ml-0"}`}>
            <h5 className="text-2xl">{title}</h5>
            {subtitle && <p className="text-sm text-GRAY004">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
