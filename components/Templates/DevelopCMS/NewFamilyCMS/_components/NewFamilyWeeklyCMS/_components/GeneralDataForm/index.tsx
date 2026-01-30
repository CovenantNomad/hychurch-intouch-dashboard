import {useEffect} from "react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {insertNewFamilyWeeklyData} from "../../../../../../../../firebase/CMS/NewFamilyCMS";
import {TNewFamilyWeeklyInput} from "../../../../../../../../interface/CMS";
import {
  getWeekOfMonth,
  getWeekOfYear,
} from "../../../../../../../../utils/dateUtils";

const GeneralDataForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: {errors, isDirty},
  } = useForm<TNewFamilyWeeklyInput>();

  const selectedDate = watch("date");

  const mutation = useMutation(insertNewFamilyWeeklyData, {
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

  const onSubmit = (data: TNewFamilyWeeklyInput) => {
    const cleanedData = {
      total: data.total ? Number(data.total) : 0,
      male: data.male ? Number(data.male) : 0,
      female: data.female ? Number(data.female) : 0,
      group1: data.group1 ? Number(data.group1) : 0,
      group2: data.group2 ? Number(data.group2) : 0,
      group3: data.group3 ? Number(data.group3) : 0,
      group4: data.group4 ? Number(data.group4) : 0,
      group5: data.group5 ? Number(data.group5) : 0,
      group6: data.group6 ? Number(data.group6) : 0,
      group7: data.group7 ? Number(data.group7) : 0,
      group8: data.group8 ? Number(data.group8) : 0,
      date: new Date(data.date),
      dateString: data.dateString || "",
      month: data.month || "",
      year: data.year || "",
      weekOfMonth: data.weekOfMonth ? Number(data.weekOfMonth) : 0,
      weekOfYear: data.weekOfYear ? Number(data.weekOfYear) : 0,
    };

    mutation.mutate(cleanedData);
  };

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);

      const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 변환
      setValue("dateString", dateString);

      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
      const year = date.getFullYear().toString();
      const weekOfMonth = getWeekOfMonth(date);
      const weekOfYear = getWeekOfYear(date);
      setValue("month", month);
      setValue("year", year);
      setValue("weekOfMonth", weekOfMonth);
      setValue("weekOfYear", weekOfYear);
    }
  }, [selectedDate, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-x-6 border-b py-4">
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
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">형제</label>
              <input
                type="text"
                {...register("male", {required: true})}
                className="w-1/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
              <span className="text-lg">명</span>
            </div>
            {errors.male && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">자매</label>
              <input
                type="text"
                {...register("female", {required: true})}
                className="w-1/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
              <span className="text-lg">명</span>
            </div>
            {errors.female && (
              <span className="block mt-1 text-red-600">입력해주세요</span>
            )}

            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">합계</label>
              <div className="w-1/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm">
                {Number(watch("male") || 0) + Number(watch("female") || 0)}
              </div>
              <span className="text-lg">명</span>
            </div>
            {isDirty &&
              Number(watch("total")) !==
                Number(watch("male")) + Number(watch("female")) && (
                <span className="block text-right mt-1 text-red-600">
                  입력값이 총원과 같지 않습니다
                </span>
              )}
          </div>

          <div className="col-span-1 border-l border-r px-8">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">그룹1</label>
              <input
                type="text"
                {...register("group1")}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">그룹2</label>
              <input
                type="text"
                {...register("group2")}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">그룹3</label>
              <input
                type="text"
                {...register("group3")}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">그룹4</label>
              <input
                type="text"
                {...register("group4")}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
          <div className="col-span-1 px-8">
            <div className="flex items-center">
              <label className="flex-shrink-0 flex-grow">그룹5</label>
              <input
                type="text"
                {...register("group5")}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            {/* termYear */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">그룹6</label>
              <input
                type="text"
                {...register("group6")}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            {/* weekOfMonth */}
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">그룹7</label>
              <input
                type="text"
                {...register("group7")}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">그룹8</label>
              <input
                type="text"
                {...register("group8")}
                className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            <div className="flex items-center mt-5">
              <label className="flex-shrink-0 flex-grow">합계</label>
              <div className="w-2/3 px-3 py-2 mr-2 border border-gray-300 rounded-md text-sm">
                {Number(watch("group1") || 0) +
                  Number(watch("group2") || 0) +
                  Number(watch("group3") || 0) +
                  Number(watch("group4") || 0) +
                  Number(watch("group5") || 0) +
                  Number(watch("group6") || 0) +
                  Number(watch("group7") || 0) +
                  Number(watch("group8") || 0)}
              </div>
            </div>
            {isDirty &&
              Number(watch("total")) !==
                Number(watch("group1")) +
                  Number(watch("group2")) +
                  Number(watch("group3")) +
                  Number(watch("group4")) +
                  Number(watch("group5")) +
                  Number(watch("group6")) +
                  Number(watch("group7")) +
                  Number(watch("group8")) && (
                <span className="block text-right mt-1 text-red-600">
                  입력값이 총원과 같지 않습니다
                </span>
              )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-6 border-b py-4">
          <div className="col-span-1 ">
            {/* 날짜 입력 */}
            <div className="flex items-center">
              <label className="flex-shrink-0 w-1/5">날짜</label>
              <input
                type="datetime-local"
                {...register("date", {required: true})}
                className="w-4/5 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            {errors.date && (
              <span className="text-red-600 mt-2 block">
                날짜를 입력해주세요
              </span>
            )}

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
          </div>

          <div className="col-span-1 border-l border-r px-8">
            {/* month */}
            <div className="flex items-center">
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

          <div className="col-span-1 ">
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

export default GeneralDataForm;
