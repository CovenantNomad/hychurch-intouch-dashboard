import Link from "next/link";
import {useRecoilState} from "recoil";
import graphlqlRequestClient from "../../../../client/graphqlRequestClient";
import {
  FindCellQuery,
  FindCellQueryVariables,
  useFindCellQuery,
} from "../../../../graphql/generated";
import {selectedState} from "../../../../stores/selectedState";
import {processMembersByYear} from "../../../../utils/utils";
import Avatar, {AvatarSize} from "../../../Atoms/Avatar";
import Skeleton from "../../../Atoms/Skeleton/Skeleton";
import SubTitleText from "../../../Atoms/Typography/SubTitleText";
import TitleText from "../../../Atoms/Typography/TitleText";
import {SparkBarChart} from "../../../ui/SparkChart";

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

  const {isLoading, isFetching, data} = useFindCellQuery<
    FindCellQuery,
    FindCellQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: Number(id),
    },
    {
      enabled: !!Number(id),
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
    }
  );

  return (
    <Link
      href={{
        pathname: `/cells/${id}`,
        query: {cellName: name},
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar size={AvatarSize.md} name={community} rounded />
              <div className="text-center">
                <TitleText>{name}</TitleText>
                <SubTitleText>리더 : {leader}</SubTitleText>
              </div>
            </div>
            <div>
              <span className="h-12 w-12 flex justify-center items-center rounded-full text-lg bg-gray-700 text-white">
                {totalCountOfMembers}명
              </span>
            </div>
          </div>
          <div className="mt-8">
            {isLoading || isFetching ? (
              <div className="flex justify-between">
                <Skeleton className="h-[84px] w-[146px]" />
                <Skeleton className="h-[84px] w-[112px]" />
              </div>
            ) : data ? (
              <div className="flex justify-between">
                <div className="flex border divide-x rounded-lg">
                  <div className="text-center pt-2 flex flex-col bg-blue-50">
                    <p className="px-6 pb-1 border-b text-sm">형제</p>
                    <p className="flex-1 flex items-center justify-center">
                      {
                        data.findCell.members.filter(
                          (member) => member.gender === "MAN"
                        ).length
                      }
                    </p>
                  </div>
                  <div className="text-center pt-2 flex flex-col bg-rose-50">
                    <p className="px-6 pb-1 border-b text-sm">자매</p>
                    <p className="flex-1 flex items-center justify-center">
                      {
                        data.findCell.members.filter(
                          (member) => member.gender === "WOMAN"
                        ).length
                      }
                    </p>
                  </div>
                </div>
                <div>
                  <div className="w-[112px] flex justify-between mb-1">
                    {processMembersByYear(data.findCell.members).map(
                      (item, index, arr) => {
                        // 항목 개수에 따른 좌우 패딩 계산
                        const paddingLeftRight =
                          arr.length === 2
                            ? "pl-[6.5px] pr-[6.5px]"
                            : arr.length === 3
                            ? "pl-[4.6px] pr-[4.6px]"
                            : arr.length === 4
                            ? "pl-[3.75px] pr-[3.75px]"
                            : arr.length === 5
                            ? "pl-[3.2px] pr-[3.2px]"
                            : "pl-[2.83px] pr-[2.83px]"; // 기본 패딩

                        return (
                          <span
                            key={item.year}
                            className={`text-center flex-1 ${paddingLeftRight} text-xs`}
                          >
                            {item.count}
                          </span>
                        );
                      }
                    )}
                  </div>
                  <SparkBarChart
                    data={processMembersByYear(data.findCell.members)}
                    index="year"
                    categories={["count"]}
                  />
                  <div className="w-[112px] flex justify-between">
                    {processMembersByYear(data.findCell.members).map(
                      (item, index, arr) => {
                        // 항목 개수에 따른 좌우 패딩 계산
                        const paddingLeftRight =
                          arr.length === 2
                            ? "px-[6.5px]"
                            : arr.length === 3
                            ? "px-[4.6px]"
                            : arr.length === 4
                            ? "px-[3.75px] "
                            : arr.length === 5
                            ? "px-[3.2px]"
                            : "px-[2.83px] "; // 기본 패딩

                        return (
                          <span
                            key={item.year}
                            className={`text-center flex-1 ${paddingLeftRight} text-xs`}
                          >
                            {item.year.slice(-2)}
                          </span>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>데이터 조회 실패</div>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CellCard;
