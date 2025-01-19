import {useEffect} from "react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useMutation, useQuery} from "react-query";
import {getTermInfomation} from "../../../../../../firebase/CellMeeting/CellMeetingStatic";
import {insertWeeklyServiceValue} from "../../../../../../firebase/CMS/CMS";
import {TWeeklyServiceInput} from "../../../../../../interface/CMS";

type Props = {};

const ServiceWeeklyCMS = ({}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: {errors},
  } = useForm<TWeeklyServiceInput>();

  const {isLoading, isFetching, data} = useQuery(
    ["getTermInfomation"],
    () => getTermInfomation(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const selectedDate = watch("date");
  const firstOff = watch("firstOff");
  const firstOnline = watch("firstOnline");
  const secondOff = watch("secondOff");
  const secondOnline = watch("secondOnline");
  const thirdOff = watch("thirdOff");
  const fourthOff = watch("fourthOff");
  const fifthOff = watch("fifthOff");
  const thirdOnline = watch("thirdOnline");
  const fourthOnline = watch("fourthOnline");
  const fifthOnline = watch("fifthOnline");

  const mutation = useMutation(insertWeeklyServiceValue, {
    onSuccess: () => {
      toast.success("성공적으로 입력되었습니다.");
      reset();
      if (data) {
        setValue("term", data.term);
        setValue("termYear", data.termYear);
      }
    },
    onError: (error) => {
      console.error("Error inserting data:", error);
      toast.error("입력 중에 에러가 발생했습니다");
    },
  });

  const onSubmit = (data: TWeeklyServiceInput) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);

      const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 변환
      setValue("dateString", dateString);

      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
      const year = date.getFullYear().toString();
      setValue("month", month);
      setValue("year", year);
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (data) {
      setValue("term", data.term);
      setValue("termYear", data.termYear);
    }
  }, [data, setValue]);

  useEffect(() => {
    const totalOff =
      (Number(firstOff) || 0) +
      (Number(secondOff) || 0) +
      (Number(thirdOff) || 0) +
      (Number(fourthOff) || 0) +
      (Number(fifthOff) || 0);

    const totalOnline =
      (Number(firstOnline) || 0) +
      (Number(secondOnline) || 0) +
      (Number(thirdOnline) || 0) +
      (Number(fourthOnline) || 0) +
      (Number(fifthOnline) || 0);

    const total = totalOff + totalOnline;

    // Set calculated values
    setValue("totalOff", totalOff);
    setValue("totalOnline", totalOnline);
    setValue("total", total);
  }, [
    firstOff,
    secondOff,
    thirdOff,
    fourthOff,
    fifthOff,
    firstOnline,
    secondOnline,
    thirdOnline,
    fourthOnline,
    fifthOnline,
    setValue,
  ]);

  return (
    <div>
      <h1 className="mb-5 text-lg font-semibold">주간데이터 입력 사항</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-x-6 border-b py-4">
          <div className="col-span-1">
            <div className="grid grid-cols-3 gap-x-4 mb-2">
              <div></div>
              <div className="text-center">성전</div>
              <div className="text-center">온라인</div>
            </div>
            <div className="grid grid-cols-3 items-center gap-x-4 mb-5">
              <div>1부</div>
              <div>
                <input
                  type="text"
                  {...register("firstOff", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.thirdOff && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
              <div>
                <input
                  type="text"
                  {...register("firstOnline", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.thirdOnline && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
            </div>
            <div className="grid grid-cols-3 items-center gap-x-4 mb-5">
              <div>2부</div>
              <div>
                <input
                  type="text"
                  {...register("secondOff", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.thirdOff && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
              <div>
                <input
                  type="text"
                  {...register("secondOnline", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.thirdOnline && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
            </div>
            <div className="grid grid-cols-3 items-center gap-x-4 mb-5">
              <div>3부</div>
              <div>
                <input
                  type="text"
                  {...register("thirdOff", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.thirdOff && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
              <div>
                <input
                  type="text"
                  {...register("thirdOnline", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.thirdOnline && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
            </div>
            <div className="grid grid-cols-3 items-center gap-x-4 mb-5">
              <div>4부</div>
              <div>
                <input
                  type="text"
                  {...register("fourthOff", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.fourthOff && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
              <div>
                <input
                  type="text"
                  {...register("fourthOnline", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.fourthOnline && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
            </div>
            <div className="grid grid-cols-3 items-center gap-x-4 mb-8">
              <div>인터치</div>
              <div>
                <input
                  type="text"
                  {...register("fifthOff", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.fifthOff && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
              <div>
                <input
                  type="text"
                  {...register("fifthOnline", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.fifthOnline && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
            </div>
            <div className="grid grid-cols-3 items-center gap-x-4 mb-3">
              <div>미편성청년</div>
              <div className="col-span-2">
                <input
                  type="text"
                  {...register("nonCellMember", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.nonCellMember && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
            </div>
            <div className="grid grid-cols-3 items-center gap-x-4 mb-3">
              <div>전체</div>
              <div>
                <input
                  type="text"
                  {...register("totalOff", {required: true})}
                  disabled
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.totalOff && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
              <div>
                <input
                  type="text"
                  {...register("totalOnline", {required: true})}
                  disabled
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.totalOnline && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
            </div>
            <div className="grid grid-cols-3 items-center gap-x-4">
              <div>총원</div>
              <div className="col-span-2">
                <input
                  type="text"
                  {...register("total", {required: true})}
                  disabled
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
              {errors.total && (
                <span className="block mt-1 text-red-600">입력해주세요</span>
              )}
            </div>
          </div>
          <div className="border-l border-r col-span-1 px-8">
            {/* date */}
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">날짜</label>
              <input
                type="datetime-local"
                {...register("date", {required: true})}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            {errors.date && <span>This field is required</span>}

            {/* dateString */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">날짜</label>
              <input
                type="text"
                {...register("dateString", {required: true})}
                disabled
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>

            {/* month */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">Month</label>
              <input
                type="text"
                {...register("month", {required: true})}
                disabled
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>

            {/* year */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">Year</label>
              <input
                type="text"
                {...register("year", {required: true})}
                disabled
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>

            {/* term */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">Term</label>
              <input
                type="text"
                {...register("term", {required: true})}
                disabled
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">TermYear</label>
              <input
                type="text"
                {...register("termYear", {required: true})}
                disabled
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
          <div className="col-span-1">
            {/* weekOfMonth */}
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">Week of Month</label>
              <input
                type="text"
                {...register("weekOfMonth", {required: true})}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            {errors.weekOfMonth && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}

            {/* weekOfYear */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">Week of Year</label>
              <input
                type="text"
                {...register("weekOfYear", {required: true})}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            {errors.weekOfYear && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}

            {/* weekOfTerm */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">Week of Term</label>
              <input
                type="text"
                {...register("weekOfTerm", {required: true})}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            {errors.weekOfTerm && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="bg-BLUE py-2 px-6 rounded-md text-white"
          >
            제출
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceWeeklyCMS;
