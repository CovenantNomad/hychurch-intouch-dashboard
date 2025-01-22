import {useFieldArray, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {useMutation} from "react-query";
import {
  gyeonggiCities,
  seoulAllDistricts,
} from "../../../../../../constants/regions";
import {saveRegionData} from "../../../../../../firebase/CMS/NewFamilyCMS";
import {TRegionDataInput} from "../../../../../../interface/CMS";

type Props = {};

const RegionDataForm = ({}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: {errors},
  } = useForm<TRegionDataInput>({
    defaultValues: {
      seoul: [
        {district: "광진구", count: 0},
        {district: "성동구", count: 0},
        {district: "중랑구", count: 0},
        {district: "동대문구", count: 0},
        {district: "노원구", count: 0},
        {district: "성북구", count: 0},
        {district: "강동구", count: 0},
        {district: "송파구", count: 0},
        {district: "강남구", count: 0},
      ],
      gyeonggi: [
        {city: "구리시", count: 0},
        {city: "하남시", count: 0},
        {city: "남양주시", count: 0},
        {city: "성남시", count: 0},
        {city: "의정부시", count: 0},
        {city: "용인시", count: 0},
        {city: "수원시", count: 0},
        {city: "광주시", count: 0},
      ],
      local: 0,
    },
  });

  // Field Array for additional entries
  const {fields: seoulFields, append: appendSeoul} = useFieldArray({
    control,
    name: "seoul",
  });

  const {fields: gyeonggiFields, append: appendGyeonggi} = useFieldArray({
    control,
    name: "gyeonggi",
  });

  const mutate = useMutation(saveRegionData, {
    onSuccess: () => {
      toast.success("데이터가 성공적으로 저장되었습니다.");
      reset();
    },
    onError: (error) => {
      console.error("Error saving data:", error);
      toast.error("데이터 저장 중 오류가 발생했습니다.");
    },
  });

  const onSubmit = (data: TRegionDataInput) => {
    mutate.mutate(data);
  };

  const watchedValues = watch();
  const totalCount =
    (watchedValues.seoul?.reduce(
      (sum, item) => sum + Number(item.count || 0),
      0
    ) || 0) +
    (watchedValues.gyeonggi?.reduce(
      (sum, item) => sum + Number(item.count || 0),
      0
    ) || 0) +
    Number(watchedValues.local || 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-bold mb-4">서울 지역 입력</h2>

      <div className="grid grid-cols-3">
        {/* 대표 구 입력 */}
        {seoulFields.map((field, index) => (
          <div key={field.id} className="col-span-1 flex items-center mb-3">
            <select
              {...register(`seoul.${index}.district`, {required: true})}
              className="w-2/5 px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              {seoulAllDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            <input
              type="number"
              {...register(`seoul.${index}.count`, {required: true})}
              className="w-2/5 ml-3 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <span className="ml-2">명</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => appendSeoul({district: "", count: 0})}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        지역 추가
      </button>

      <h2 className="text-lg font-bold mt-8 mb-4">경기도 지역 입력</h2>
      <div className="grid grid-cols-3">
        {gyeonggiFields.map((field, index) => (
          <div key={field.id} className="col-span-1 flex items-center mb-3">
            <select
              {...register(`gyeonggi.${index}.city`, {required: true})}
              className="w-2/5 px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              {gyeonggiCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <input
              type="number"
              {...register(`gyeonggi.${index}.count`, {required: true})}
              className="w-2/5 ml-3 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <span className="ml-2">명</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => appendGyeonggi({city: "", count: 0})}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        지역 추가
      </button>

      <h2 className="text-lg font-bold mt-8 mb-4">지방 (LOCAL) 입력</h2>
      <div className="grid grid-cols-3">
        <div>
          <div className="flex items-center mb-3">
            <label className="w-1/5">지방 인원</label>
            <input
              type="number"
              {...register("local", {required: true})}
              className="w-2/5 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <span className="ml-2">명</span>
            {errors.local && (
              <span className="text-red-500 ml-3">값을 입력해주세요</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center border-t py-4">
        <span className="text-lg font-semibold">총합: {totalCount} 명</span>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          제출
        </button>
      </div>
    </form>
  );
};

export default RegionDataForm;
