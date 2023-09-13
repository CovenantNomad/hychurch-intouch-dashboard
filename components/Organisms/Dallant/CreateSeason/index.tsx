import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { seasonNameForm } from '../../../../interface/Dallants';
import { createDallentSeason } from '../../../../firebase/Dallant/Dallant';

interface CreateSeasonProps {}

const CreateSeason = ({}: CreateSeasonProps) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<seasonNameForm>();

  const { mutateAsync } = useMutation(createDallentSeason, {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getTalentSetting'] });
    },
  })

  const onSubmitHandler = async (data: seasonNameForm) => {
    await mutateAsync(data)
  }

  return (
    <div className='max-w-lg mx-auto mt-8'>
      <div>
        <h2>현재 진행중인 시즌이 없습니다.</h2>
        <p>{`새로운 시즌이름을 입력하고 새로운 시즌을 시작해주세요.\n시즌이름은 공백없이 영문과 숫자 조합으로만 해주세요.\n예시) 2023SUMMER, 2023FALL`}</p>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <label htmlFor="name" className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              placeholder="새로운 시즌 이름을 입력해주세요"
              {...register("name", {
                required: "시즌 이름을 입력해주세요",
                minLength: {
                  value: 2,
                  message:
                    "이름을 제대로 입력하였는지 확인해 주세요 (최소길이오류)",
                },
                maxLength: {
                  value: 20,
                  message:
                    "이름은 최대 20자까지만 입력해 주세요 (최대길이오류)",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/g,
                  message: "영문, 숫자만 입력해주세요",
                },
                setValueAs: (v) => v.replace(/\s/g, ""),
              })}
              className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.name && (
              <p className="mt-1 px-3 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className='flex justify-center mt-4'>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-BLUE"
          >
            시작하기
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSeason;
