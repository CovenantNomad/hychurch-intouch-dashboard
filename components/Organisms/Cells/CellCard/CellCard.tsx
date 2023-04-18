import React from "react";
import Avatar, { AvatarSize } from "../../../Atoms/Avatar";
import SubTitleText from "../../../Atoms/Typography/SubTitleText";
import TitleText from "../../../Atoms/Typography/TitleText";
import { IoMdPeople } from "react-icons/io";
import Link from "next/link";
import { selectedState } from "../../../../stores/selectedState";
import { useRecoilState } from "recoil";

interface CellCardProps {
  id: string;
  name: string;
  leader: string;
  community: string;
  totalCountOfMembers: number;
  countOfActiveMembers: number;
}

const CellCard = ({
  id,
  name,
  leader,
  community,
  totalCountOfMembers,
  countOfActiveMembers,
}: CellCardProps) => {
  const [selectedStatus, setSelectedStatus] = useRecoilState(selectedState);

  return (
    <Link
      href={{
        pathname: `/cells/${id}`,
        query: { cellName: name },
      }}
      as={`/cells/${id}`}
    >
      <a
        onClick={() =>
          setSelectedStatus({
            ...selectedStatus,
            selectedCell: {
              cellId: id,
              cellName: name,
            },
          })
        }
      >
        <div className="px-4 py-6 bg-white rounded-lg border border-gray-200 shadow-lg">
          <Avatar size={AvatarSize.lg} name={community} rounded center />
          <div className="mt-4 mb-8 text-center">
            <TitleText>{name}</TitleText>
            <SubTitleText>리더 : {leader}</SubTitleText>
          </div>
          <div className="w-full grid grid-cols-1 justify-center md:grid-cols-2 gap-y-2">
            <div className="w-full col-span-1 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-600 flex justify-center items-center rounded-full">
                <IoMdPeople size="16" color="white" />
              </div>
              <div className="flex items-center ml-2 md:block md:ml-3">
                <span className="block text-lg font-bold order-2">
                  {totalCountOfMembers}
                </span>
                <span className="block text-sm text-gray-500 order-1 mr-5 md:-mt-1 md:mr-0">
                  전체<span className="hidden md:inline">인원</span>
                </span>
              </div>
            </div>
            <div className="w-full col-span-1 flex items-center justify-center">
              <div className="w-8 h-8 bg-teal-600 flex justify-center items-center rounded-full">
                <IoMdPeople size="16" color="white" />
              </div>
              <div className="flex items-center ml-2 md:block md:ml-3">
                <span className="block text-lg font-bold order-2">
                  {countOfActiveMembers}
                </span>
                <span className="block flex-grow text-sm text-gray-500 order-1 mr-5 md:-mt-1 md:mr-0">
                  활동<span className="hidden md:inline">인원</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CellCard;
