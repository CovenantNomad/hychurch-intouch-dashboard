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
  totalCountOfMembers: number;
  countOfActiveMembers: number;
}

const CellCard = ({
  id,
  name,
  leader,
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
        <div className="px-4 py-6 bg-white rounded-lg shadow-lg">
          <Avatar
            size={AvatarSize.lg}
            name={leader.substr(-2)}
            rounded
            center
          />
          <div className="mt-4 mb-8 text-center">
            <TitleText>{name}</TitleText>
            <SubTitleText>리더 : {leader}</SubTitleText>
          </div>
          <div className="grid grid-cols-2 justify-center">
            <div className="col-span-1 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-600 flex justify-center items-center rounded-full mr-2">
                <IoMdPeople size="16" color="white" />
              </div>
              <div>
                <span className="block text-lg font-bold">
                  {totalCountOfMembers}
                </span>
                <span className="block text-sm text-gray-500 font-semibold">
                  전체인원
                </span>
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <div className="w-8 h-8 bg-teal-600 flex justify-center items-center rounded-full mr-2">
                <IoMdPeople size="16" color="white" />
              </div>
              <div>
                <span className="block text-lg font-bold">
                  {countOfActiveMembers}
                </span>
                <span className="block text-sm text-gray-500 font-semibold">
                  활동인원
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
