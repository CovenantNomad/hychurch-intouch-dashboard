import {useEffect} from "react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useMutation, useQuery} from "react-query";
import {getTermInfomation} from "../../../../../../firebase/CellMeeting/CellMeetingStatic";
import {insertWeeklyCellMeetingValue} from "../../../../../../firebase/CMS/CMS";
import {TWeeklyCellMeetingInput} from "../../../../../../interface/CMS";

type Props = {};

const WeeklyCMS = ({}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: {errors},
  } = useForm<TWeeklyCellMeetingInput>();

  const selectedDate = watch("date");

  const {isLoading, isFetching, data} = useQuery(
    ["getTermInfomation"],
    () => getTermInfomation(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const mutation = useMutation(insertWeeklyCellMeetingValue, {
    onSuccess: () => {
      toast.success("성공적으로 입력되었습니다.");
      reset();
    },
    onError: (error) => {
      console.error("Error inserting data:", error);
      toast.error("입력 중에 에러가 발생했습니다");
      // 필요에 따라 여기서 오류 처리 로직을 추가합니다.
    },
  });

  const onSubmit = (data: TWeeklyCellMeetingInput) => {
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

  return (
    <div>
      <h1 className="mb-5 text-lg font-semibold">주간데이터 입력 사항</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-5 gap-x-6 border-b py-4">
          <div className="col-span-1">
            {/* total */}
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">총원</label>
              <input
                type="text"
                {...register("total", {required: true})}
                className="w-1/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
              <span className="text-lg">명</span>
            </div>
            {errors.total && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}
            {/* attendance */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">출석</label>
              <input
                type="text"
                {...register("attendance", {required: true})}
                className="w-1/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
              <span className="text-lg">명</span>
            </div>
            {errors.attendance && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}
            {/* absent */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">결석</label>
              <input
                type="text"
                {...register("absent", {required: true})}
                className="w-1/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
              <span className="text-lg">명</span>
            </div>
            {errors.absent && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}
          </div>
          <div className="border-l border-r col-span-2 px-8">
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
          </div>
          <div className="col-span-2">
            {/* term */}
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">Term</label>
              <input
                type="text"
                {...register("term", {required: true})}
                disabled
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            {/* termYear */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">TermYear</label>
              <input
                type="text"
                {...register("termYear", {required: true})}
                disabled
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            {/* weekOfMonth */}
            <div className="flex items-center mt-5">
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

export default WeeklyCMS;
