import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {term} from "../../../../../../constants/constant";
import {insertTermCellMeetingValue} from "../../../../../../firebase/CMS/CMS";
import {TTERMCellMeetingInput} from "../../../../../../interface/CMS";

type Props = {};

const TermCMS = ({}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<TTERMCellMeetingInput>();

  const mutation = useMutation(insertTermCellMeetingValue, {
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

  const onSubmit = (data: TTERMCellMeetingInput) => {
    mutation.mutate({term: term, inputValue: data});
  };

  return (
    <div>
      <h1 className="mb-5 text-lg font-semibold">반기데이터 입력 사항</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-x-6 border-b py-4">
          <div className="col-span-1">
            {/* total */}
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">총원</label>
              <input
                type="text"
                {...register("totalAvg", {required: true})}
                className="w-1/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
              <span className="text-lg">명</span>
            </div>
            {errors.totalAvg && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}
            {/* attendance */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">출석</label>
              <input
                type="text"
                {...register("attendanceAvg", {required: true})}
                className="w-1/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
              <span className="text-lg">명</span>
            </div>
            {errors.attendanceAvg && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}
            {/* absent */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">결석</label>
              <input
                type="text"
                {...register("absentAvg", {required: true})}
                className="w-1/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
              <span className="text-lg">명</span>
            </div>
            {errors.absentAvg && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">출석률</label>
              <input
                type="text"
                {...register("attendanceRateAvg", {required: true})}
                className="w-1/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
              <span className="text-lg">명</span>
            </div>
            {errors.attendanceRateAvg && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}
          </div>
          <div className="border-l col-span-1 px-8">
            {/* year */}
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">최대출석인원</label>
              <input
                type="text"
                {...register("maxAttendance")}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            {errors.maxAttendance && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}
            {/* month */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">최대출석일</label>
              <input
                type="text"
                {...register("maxAttendanceDate")}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            {errors.maxAttendanceDate && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}
            {/* year */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">최소출석인원</label>
              <input
                type="text"
                {...register("minAttendance")}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            {errors.minAttendance && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}
            {/* month */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">최소출석일</label>
              <input
                type="text"
                {...register("minAttendanceDate")}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            {errors.minAttendanceDate && (
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

export default TermCMS;
