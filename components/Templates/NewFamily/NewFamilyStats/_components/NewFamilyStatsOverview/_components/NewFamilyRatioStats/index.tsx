import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getNewFamilyRatioStats} from "../../../../../../../../firebase/NewFamilyStats/newFamilyStats";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";
import NewFamilyAgeRatioCart from "./_components/NewFamilyAgeRatioCart";
import NewFamilySexRatioChart from "./_components/NewFamilySexRatioChart";

type Props = {};

const NewFamilyRatioStats = ({}: Props) => {
  const [sexRatio, setSexRatio] = useState<{name: string; amout: number}[]>([
    {name: "형제", amout: 0},
    {name: "자매", amout: 0},
  ]);
  const [ageGroup, setAgeGroup] = useState<
    {
      date: string;
      group1: number;
      group2: number;
      group3: number;
      group4: number;
      group5: number;
    }[]
  >([{date: "2025", group1: 0, group2: 0, group3: 0, group4: 0, group5: 0}]);

  const {isLoading, isFetching, data} = useQuery(
    ["getNewFamilyRatioStats"],
    () => getNewFamilyRatioStats(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (data) {
      setSexRatio([
        {name: "형제", amout: data.male},
        {name: "자매", amout: data.female},
      ]);
      setAgeGroup([
        {
          date: data.date,
          group1: data.group1,
          group2: data.group2,
          group3: data.group3,
          group4: data.group4,
          group5: data.group5,
        },
      ]);
    }
  }, [data]);

  return (
    <div>
      <div className="border rounded-md p-4">
        {isLoading || isFetching ? (
          <div>
            <Skeleton className="w-[240px] h-[18px]" />
            <Skeleton className="w-full h-[288px] mt-5" />
          </div>
        ) : data ? (
          <div className="grid grid-cols-3 space-x-8">
            <div className="col-span-1">
              <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                새가족 성별 통계{" "}
                <span className="text-sm text-gray-600">
                  (누적, 기준: 2025년)
                </span>
              </h3>
              <NewFamilySexRatioChart data={sexRatio} />
            </div>

            <div className="col-span-2">
              <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                새가족 연령별 통계{" "}
                <span className="text-sm text-gray-600">
                  (누적, 기준: 2025년)
                </span>
              </h3>
              <NewFamilyAgeRatioCart data={ageGroup} />
            </div>
          </div>
        ) : (
          <div className="h-[360px] flex flex-col justify-center items-center">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <span className="block text-sm text-gray-600 mt-1">
              새가족등록 통계를 조회하지 못했습니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewFamilyRatioStats;
