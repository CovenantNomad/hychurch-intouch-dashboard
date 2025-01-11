import {useEffect} from "react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {insertMonthlyCellMeetingValue} from "../../../../../../firebase/CMS/CMS";
import {TMonthlyCellMeetingInput} from "../../../../../../interface/CMS";

type Props = {};

const MonthlyCMS = ({}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {errors},
  } = useForm<TMonthlyCellMeetingInput>();

  const selectedDate = watch("date");

  const mutation = useMutation(insertMonthlyCellMeetingValue, {
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

  const onSubmit = (data: TMonthlyCellMeetingInput) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);

      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
      const year = date.getFullYear().toString();
      setValue("month", month);
      setValue("year", year);
    }
  }, [selectedDate, setValue]);

  return (
    <div>
      <h1 className="mb-5 text-lg font-semibold">월간데이터 입력 사항</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-x-6 border-b py-4">
          <div className="col-span-1">
            {/* total */}
            <div className="flex items-start">
              <label className="flex-[1]">총원*</label>
              <div className="flex-[2]">
                <div className="flex items-center">
                  <input
                    type="text"
                    {...register("totalAvg", {required: true})}
                    className="flex-grow px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                  />
                  <span className="text-lg">명</span>
                </div>
                {errors.totalAvg && (
                  <span className="block mt-1 text-red-600 text-sm">
                    필수입력 사항입니다.
                  </span>
                )}
              </div>
            </div>
            {/* attendance */}
            <div className="flex items-start mt-5">
              <label className="flex-[1]">출석*</label>
              <div className="flex-[2]">
                <div className="flex items-center">
                  <input
                    type="text"
                    {...register("attendanceAvg", {required: true})}
                    className="flex-grow px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                  />
                  <span className="text-lg">명</span>
                </div>
                {errors.attendanceAvg && (
                  <span className="block mt-1 text-red-600 text-sm">
                    필수입력 사항입니다.
                  </span>
                )}
              </div>
            </div>
            {/* absent */}
            <div className="flex items-start mt-5">
              <label className="flex-[1]">결석*</label>
              <div className="flex-[2]">
                <div className="flex items-center">
                  <input
                    type="text"
                    {...register("absentAvg", {required: true})}
                    className="flex-grow px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                  />
                  <span className="text-lg">명</span>
                </div>
                {errors.attendanceAvg && (
                  <span className="block mt-1 text-red-600 text-sm">
                    필수입력 사항입니다.
                  </span>
                )}
              </div>
            </div>
            {/* 출석률 */}
            <div className="flex items-start mt-5">
              <label className="flex-[1]">출석률*</label>
              <div className="flex-[2]">
                <div className="flex items-center">
                  <input
                    type="text"
                    {...register("attendanceRate", {required: true})}
                    className="flex-grow px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                  />
                  <span className="text-lg">%</span>
                </div>
                {errors.attendanceAvg && (
                  <span className="block mt-1 text-red-600 text-sm">
                    필수입력 사항입니다.
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="border-l col-span-1 px-8">
            {/* date */}
            <div className="flex items-start">
              <label className="w-1/3">날짜*</label>
              <div className="w-2/3">
                <input
                  type="datetime-local"
                  {...register("date", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
                <span className="block text-sm text-gray-500 mt-1">
                  매월 마지막 일로 선택해주세요
                </span>
                {errors.date && (
                  <span className="block mt-1 text-red-600">
                    날짜를 꼭 선택해주세요.
                  </span>
                )}
              </div>
            </div>

            {/* year */}
            <div className="flex items-start mt-5">
              <label className="w-1/3">Year*</label>
              <div className="w-2/3">
                <input
                  type="text"
                  disabled
                  {...register("year", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
            </div>
            {/* month */}
            <div className="flex items-start mt-5">
              <label className="w-1/3">Month*</label>
              <div className="w-2/3">
                <input
                  type="text"
                  disabled
                  {...register("month", {required: true})}
                  className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
                />
              </div>
            </div>
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

export default MonthlyCMS;
