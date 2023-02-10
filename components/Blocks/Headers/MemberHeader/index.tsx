import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import ButtonGroup from "../../ButtonGroup";

interface MemberHeaderProps {
  cellId: string | undefined;
  cellName: string | undefined;
  userName: string;
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const MemberHeader = ({
  cellId,
  cellName,
  userName,
  editMode,
  setEditMode,
}: MemberHeaderProps) => {
  const buttons = [
    {
      id: 0,
      name: editMode ? "일반모드" : "편집모드",
      onClick: () => setEditMode(!editMode),
    },
    {
      id: 1,
      name: "삭제하기",
      onClick: () => console.log("삭제"),
      outline: true,
    },
  ];

  return (
    <div className="flex items-center justify-between space-x-5 py-4 px-4 md:py-7 md:px-6 lg:px-8 bg-white">
      <div className="flex items-center">
        {cellId ? (
          <Link href={`/cells/${cellId}`}>
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
      <ButtonGroup items={buttons} />
    </div>
  );
};

export default MemberHeader;
