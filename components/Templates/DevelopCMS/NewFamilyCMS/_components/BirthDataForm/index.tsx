import {useEffect} from "react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useMutation} from "react-query";

import {insertBirthData} from "../../../../../../firebase/CMS/NewFamilyCMS";
import {TNewFamilyBirthDataInput} from "../../../../../../interface/CMS";

const BirthDataForm = () => {
  const lastYear = 2008;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: {errors},
  } = useForm<TNewFamilyBirthDataInput>({
    defaultValues: Array.from({length: 19}, (_, i) => lastYear - i).reduce(
      (acc, year) => ({...acc, [year]: 0}),
      {
        date: "",
        dateString: "",
        month: "",
        year: "",
        weekOfMonth: 0,
        weekOfYear: 0,
      },
    ),
  });

  const selectedDate = watch("date");

  const watchedYears = watch();

  // 연도별 총합 계산
  const totalSum = Object.keys(watchedYears || {})
    .filter((key) => !isNaN(Number(key))) // 연도 키 필터링
    .reduce((sum, key) => sum + (Number(watchedYears[key]) || 0), 0);

  const mutation = useMutation(insertBirthData, {
    onSuccess: () => {
      toast.success("성공적으로 입력되었습니다.");
      reset();
    },
    onError: (error) => {
      console.error("Error inserting data:", error);
      toast.error("입력 중에 에러가 발생했습니다");
    },
  });

  const onSubmit = (data: TNewFamilyBirthDataInput) => {
    // 2006년 ~ 1988년까지의 데이터를 확인하고 없는 값은 0으로 처리
    const years = Array.from({length: 19}, (_, i) => lastYear - i);
    const cleanedData = years.reduce(
      (acc, year) => {
        acc[year] = Number(data[year]) || 0; // 입력값이 없으면 0
        return acc;
      },
      {} as Record<string, number>,
    );

    // 추가적인 날짜 정보 포함
    const firebaseData = {
      ...cleanedData,
      date: new Date(data.date).toISOString(),
      dateString: data.dateString || "",
      month: data.month || "",
      year: data.year || "",
      weekOfMonth: data.weekOfMonth ? Number(data.weekOfMonth) : 0,
      weekOfYear: data.weekOfYear ? Number(data.weekOfYear) : 0,
      lastYear,
    };

    mutation.mutate(firebaseData);
  };

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);

      const dateString = date.toISOString().split("T")[0];
      setValue("dateString", dateString);

      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
      const weekOfMonth = Math.ceil(date.getDate() / 7);
      const weekOfYear = Math.ceil(
        (date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) /
          (7 * 24 * 60 * 60 * 1000),
      );

      setValue("month", month);
      setValue("year", year);
      setValue("weekOfMonth", weekOfMonth);
      setValue("weekOfYear", weekOfYear);
    }
  }, [selectedDate, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 gap-x-6 border-b py-4">
          {/* 2006년 ~ 1988년 */}
          {Array.from({length: 19}, (_, i) => lastYear - i).map((birthYear) => (
            <div key={birthYear} className="col-span-1 flex items-center mt-3">
              <label className="flex-shrink-0 w-1/5">{birthYear}년</label>
              <input
                type="number"
                {...register(`${birthYear}`)}
                className="w-2/5 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <span className="text-lg ml-2">명</span>
              {errors[birthYear] && (
                <span className="text-red-600 ml-2">입력해주세요</span>
              )}
            </div>
          ))}
          <div className="col-span-1 flex items-center mt-6">
            <label className="flex-shrink-0 w-1/5 font-bold text-lg">
              총합
            </label>
            <div className="w-4/5 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-100">
              {totalSum} 명
            </div>
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
            className="bg-BLUE py-2 px-6 rounded-md text-white"
          >
            제출
          </button>
        </div>
      </form>
    </div>
  );
};

export default BirthDataForm;
