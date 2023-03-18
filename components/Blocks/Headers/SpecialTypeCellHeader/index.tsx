import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import Button from "../../../Atoms/Button/Button";

interface SpecialTypeCellHeaderProps {
  cellId: string | undefined;
  cellName: string | undefined;
  userName: string;
  href: string;
  hasEditMode?: boolean;
  editMode?: boolean;
  setEditMode?: Dispatch<SetStateAction<boolean>>;
}

const SpecialTypeCellHeader = ({
  cellId,
  cellName,
  userName,
  href,
  hasEditMode = false,
  editMode,
  setEditMode,
}: SpecialTypeCellHeaderProps) => {
  return (
    <div className="px-2 pt-2">
      <div className="flex items-center justify-between space-x-5 py-5 px-4 rounded-md bg-white">
        <div className="flex items-center">
          {cellId ? (
            <Link href={href}>
              <a className="text-2xl font-bold text-gray-900">{cellName}</a>
            </Link>
          ) : (
            <span className="text-2xl font-bold text-gray-900">셀 미편성</span>
          )}
          <span>
            <svg className="w-6 h-6 mx-2" viewBox="0 0 20 20">
              <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
            </svg>
          </span>
          <h1 className="text-2xl font-bold text-gray-900">{userName}</h1>
        </div>
        {hasEditMode && setEditMode && (
          <Button onClick={() => setEditMode(!editMode)} outline={false}>
            {editMode ? "일반모드" : "편집모드"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SpecialTypeCellHeader;
