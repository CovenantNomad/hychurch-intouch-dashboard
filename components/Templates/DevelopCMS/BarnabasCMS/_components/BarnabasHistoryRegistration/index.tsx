import {useForm} from "react-hook-form";
import {useBarnabaMatching} from "../../../../../../hooks/barnabas/useBarnabaMatching";
import {TMatching, TMatchingStatus} from "../../../../../../interface/barnabas";

type Props = {};

const BarnabasHistoryRegistration = ({}: Props) => {
  const {register, handleSubmit} = useForm<Omit<TMatching, "id">>();

  const {mutate} = useBarnabaMatching();

  const onSubmit = (data: Omit<TMatching, "id">) => {
    mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-x-6 border-b py-4">
          <div className="col-span-1">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">바나바ID</label>
              <input
                type="text"
                {...register("barnabaId", {required: true})}
                className="px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">바나바이름</label>
              <input
                type="text"
                {...register("barnabaName", {required: true})}
                className="px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">멘티ID</label>
              <input
                type="text"
                {...register("menteeId", {required: true})}
                className="px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">멘티이름</label>
              <input
                type="text"
                {...register("menteeName", {required: true})}
                className="px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
        </div>

        {/* 2번째줄 */}
        <div className="grid grid-cols-4 gap-x-6 border-b py-4">
          <div className="col-span-1">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">매칭일</label>
              <input
                type="text"
                {...register("matchingDate", {required: true})}
                className="px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">완료일</label>
              <input
                type="text"
                {...register("completedDate")}
                className="px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">첫맛남</label>
              <input
                type="text"
                {...register("firstMeetingDate")}
                className="px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">마지막만남</label>
              <input
                type="text"
                {...register("lastMeetingDate")}
                className="px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
        </div>
        {/* 3번째줄 */}
        <div className="grid grid-cols-4 gap-x-6 border-b py-4">
          <div className="col-span-1">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">진행횟수</label>
              <input
                type="text"
                {...register("completedMeetingCount", {required: true})}
                className="px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">예정횟수</label>
              <input
                type="text"
                {...register("scheduledMeetingCount", {required: true})}
                className="px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">상태</label>
              <select
                {...register("status")}
                className="px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              >
                <option value={TMatchingStatus.PROGRESS}>진행중</option>
                <option value={TMatchingStatus.PENDING}>지연중</option>
                <option value={TMatchingStatus.FAILED}>보류</option>
                <option value={TMatchingStatus.COMPLETED}>이수</option>
              </select>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">사유</label>
              <input
                type="text"
                {...register("description")}
                className="px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="bg-BLUE py-2 px-6 rounded-md text-white cursor-pointer"
          >
            제출
          </button>
        </div>
      </form>
    </div>
  );
};

export default BarnabasHistoryRegistration;
