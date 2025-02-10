import {ChevronLeftIcon} from "@heroicons/react/24/solid";
import {useQuery} from "react-query";
import {getBarnabasProfileById} from "../../../../../../firebase/Barnabas/barnabas";
import Skeleton from "../../../../../Atoms/Skeleton/Skeleton";
import BarnabasInActiveButton from "./_components/BarnabasInActiveButton";

type Props = {
  id: string;
  name: string;
  cohort: string;
  goBackHandler: () => void;
};

const BarnabasProfileHeader = ({id, name, cohort, goBackHandler}: Props) => {
  const {isLoading, isFetching, data} = useQuery(
    ["getBarnabasProfileById", id],
    () => getBarnabasProfileById(id),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
      enabled: !!id,
    }
  );
  return (
    <div className="w-full flex justify-between items-center px-4 py-5 bg-white rounded-md">
      <div className="flex items-center space-x-8">
        <div>
          <button
            onClick={goBackHandler}
            className="flex items-center px-2 py-1 rounded-md hover:bg-gray-100"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            <span>뒤로</span>
          </button>
        </div>
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">
            <span className="inline-block text-lg font-normal mr-2">
              바나바 {cohort || data ? data?.cohort : "0"}기
            </span>{" "}
            {name || data ? data?.name : "알수없음"}
          </h1>
        </div>
      </div>
      {isLoading ? (
        <Skeleton className="w-[88px] h-9" />
      ) : (
        data && (
          <BarnabasInActiveButton barnabaId={id} isActive={data.isActive} />
        )
      )}
    </div>
  );
};

export default BarnabasProfileHeader;
