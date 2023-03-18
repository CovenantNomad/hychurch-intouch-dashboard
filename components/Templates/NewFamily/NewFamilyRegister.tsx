import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import { useRegisterNewUserMutation } from "../../../graphql/generated";
import { SpecialCellIdType } from "../../../interface/cell";
import { RegisterForm } from "../../../interface/register";
import BlockContainer from "../../Atoms/Container/BlockContainer";

interface NewFamilyRegisterProps {}

const NewFamilyRegister = ({}: NewFamilyRegisterProps) => {
  const today = dayjs();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RegisterForm>();
  const { mutateAsync, isLoading, isError, isSuccess } =
    useRegisterNewUserMutation(graphlqlRequestClient, {
      onSuccess: (data) => {
        toast.success("새가족 등록하였습니다");
        queryClient.invalidateQueries({
          queryKey: [
            "findNewFamilyCell",
            { id: Number(SpecialCellIdType.NewFamily) },
          ],
        });
        reset();
      },
      onError: (error) => {
        // error?.graphQLErrors?.[0]?.extensions?.code || ErrorCode.UNKNOWN_ERROR;
        console.log(error);
      },
    });

  const onSubmitHandler = ({
    name,
    gender,
    birthdayYear,
    birthdayMonth,
    birthdayDay,
    phone,
    address,
    description,
    registrationYear,
    registrationMonth,
    registrationDay,
  }: RegisterForm) => {
    const birthday = `${birthdayYear}-${birthdayMonth}-${birthdayDay}`;
    const registrationDate = `${registrationYear}-${registrationMonth}-${registrationDay}`;
    mutateAsync({
      input: {
        name,
        gender,
        phone,
        birthday,
        address,
        description,
        registrationDate,
      },
    });
  };

  useEffect(() => {
    setValue("registrationYear", today.get("year").toString());
    setValue(
      "registrationMonth",
      (today.get("month") + 1).toString().padStart(2, "0")
    );
    setValue("registrationDay", today.get("date").toString().padStart(2, "0"));
  }, []);

  return (
    <>
      <BlockContainer firstBlock>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                새가족 등록카드
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                새가족 등록카드에 작성된 내용을 입력해 주세요.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 py-6 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        이름*
                      </label>
                      <input
                        type="text"
                        placeholder="이름을 입력해주세요"
                        {...register("name", {
                          required: "이름을 입력해주세요",
                          minLength: {
                            value: 2,
                            message:
                              "이름을 제대로 입력하였는지 확인해 주세요 (최소길이오류)",
                          },
                          maxLength: {
                            value: 5,
                            message:
                              "이름을 제대로 입력하였는지 확인해 주세요 (최대길이오류)",
                          },
                          pattern: {
                            value: /^[가-힣a-zA-Z]+$/g,
                            message: "글자만 입력해주세요",
                          },
                          setValueAs: (v) => v.replace(/\s/g, ""),
                        })}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:border-navy-blue sm:text-sm"
                      />
                      {errors.name && (
                        <p className="mt-1 px-3 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                      >
                        성별*
                      </label>
                      <select
                        id="gender"
                        {...register("gender", {
                          required: "성별을 선택해주세요",
                        })}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-navy-blue sm:text-sm"
                      >
                        <option value={""}>성별을 선택해주세요</option>
                        <option value={"MAN"}>남자</option>
                        <option value={"WOMAN"}>여자</option>
                      </select>
                      {errors.gender && (
                        <p className="mt-1 px-3 text-sm text-red-600">
                          {errors.gender.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 -mb-6">
                      <span className="block text-sm font-medium text-gray-700">
                        생년월일*
                      </span>
                    </div>

                    <div className="col-span-2">
                      <div className="relative flex items-center w-full">
                        <label htmlFor="year" className="sr-only">
                          년
                        </label>
                        <input
                          id="year"
                          type="text"
                          placeholder="YYYY"
                          {...register("birthdayYear", {
                            minLength: {
                              value: 4,
                              message: "4자리로 입력해주세요 (YYYY)",
                            },
                            maxLength: {
                              value: 4,
                              message: "4자리로 입력해주세요 (YYYY)",
                            },
                          })}
                          className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:border-navy-blue sm:w-[90%] sm:text-sm"
                        />
                        <span className="absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm">
                          년
                        </span>
                      </div>
                      {errors.birthdayYear && (
                        <p className="mt-1 px-3 text-sm text-red-600">
                          {errors.birthdayYear.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <div className="relative flex items-center w-full">
                        <label htmlFor="month" className="sr-only">
                          월
                        </label>
                        <input
                          id="month"
                          type="text"
                          placeholder="MM"
                          {...register("birthdayMonth", {
                            setValueAs: (v: string) => v.padStart(2, "0"),
                            minLength: {
                              value: 2,
                              message: "2자리로 입력해주세요 (MM)",
                            },
                            maxLength: {
                              value: 2,
                              message: "4자리로 입력해주세요 (MM)",
                            },
                          })}
                          className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:border-navy-blue sm:w-[90%] sm:text-sm"
                        />
                        <span className="absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm">
                          월
                        </span>
                      </div>
                      {errors.birthdayMonth && (
                        <p className="mt-1 px-3 text-sm text-red-600">
                          {errors.birthdayMonth.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <div className="relative flex items-center w-full">
                        <label htmlFor="day" className="sr-only">
                          일
                        </label>
                        <input
                          id="day"
                          type="text"
                          placeholder="DD"
                          {...register("birthdayDay", {
                            setValueAs: (v: string) => v.padStart(2, "0"),
                            minLength: {
                              value: 2,
                              message: "2자리로 입력해주세요 (MM)",
                            },
                            maxLength: {
                              value: 2,
                              message: "4자리로 입력해주세요 (MM)",
                            },
                          })}
                          className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:border-navy-blue sm:w-[90%] sm:text-sm"
                        />
                        <span className="absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm">
                          일
                        </span>
                      </div>
                      {errors.birthdayDay && (
                        <p className="mt-1 px-3 text-sm text-red-600">
                          {errors.birthdayDay.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        전화번호*
                      </label>
                      <input
                        id="phone"
                        type="text"
                        placeholder="숫자만 입력해주세요"
                        {...register("phone", {
                          required: "핸드폰번호를 입력해주세요",
                          setValueAs: (v) => v.replace(/[-.,_+]|\s/g, ""),
                          minLength: {
                            value: 9,
                            message: "최소 9자리 이상 입력해주세요",
                          },
                          maxLength: {
                            value: 11,
                            message: "핸드폰번호는 최대 11자리입니다",
                          },
                        })}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:border-navy-blue sm:text-sm"
                      />
                      {errors.phone && (
                        <p className="mt-1 px-3 text-sm text-red-600">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        주소
                      </label>
                      <input
                        id="address"
                        type="text"
                        placeholder="주소를 입력해주세요"
                        {...register("address")}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:border-navy-blue sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        비고
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          rows={3}
                          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:border-navy-blue sm:text-sm"
                          placeholder="인도자, 방문계기 등 추가적으로 입력할 사항을 기입해주세요"
                          defaultValue={""}
                          {...register("description")}
                        />
                      </div>
                    </div>

                    <div className="col-span-6 -mb-6">
                      <span className="block text-sm font-medium text-gray-700">
                        등록일*
                      </span>
                    </div>

                    <div className="col-span-2">
                      <div className="relative flex items-center w-full">
                        <label htmlFor="year" className="sr-only">
                          년
                        </label>
                        <input
                          id="year"
                          type="text"
                          placeholder="YYYY"
                          {...register("registrationYear", {
                            minLength: {
                              value: 4,
                              message: "4자리로 입력해주세요 (YYYY)",
                            },
                            maxLength: {
                              value: 4,
                              message: "4자리로 입력해주세요 (YYYY)",
                            },
                          })}
                          className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:border-navy-blue sm:w-[90%] sm:text-sm"
                        />
                        <span className="absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm">
                          년
                        </span>
                      </div>
                      {errors.registrationYear && (
                        <p className="mt-1 px-3 text-sm text-red-600">
                          {errors.registrationYear.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <div className="relative flex items-center w-full">
                        <label htmlFor="month" className="sr-only">
                          월
                        </label>
                        <input
                          id="month"
                          type="text"
                          placeholder="MM"
                          {...register("registrationMonth", {
                            setValueAs: (v: string) => v.padStart(2, "0"),
                            minLength: {
                              value: 2,
                              message: "2자리로 입력해주세요 (MM)",
                            },
                            maxLength: {
                              value: 2,
                              message: "4자리로 입력해주세요 (MM)",
                            },
                          })}
                          className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:border-navy-blue sm:w-[90%] sm:text-sm"
                        />
                        <span className="absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm">
                          월
                        </span>
                      </div>
                      {errors.registrationMonth && (
                        <p className="mt-1 px-3 text-sm text-red-600">
                          {errors.registrationMonth.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <div className="relative flex items-center w-full">
                        <label htmlFor="day" className="sr-only">
                          일
                        </label>
                        <input
                          id="day"
                          type="text"
                          placeholder="DD"
                          {...register("registrationDay", {
                            setValueAs: (v: string) => v.padStart(2, "0"),
                            minLength: {
                              value: 2,
                              message: "2자리로 입력해주세요 (MM)",
                            },
                            maxLength: {
                              value: 2,
                              message: "4자리로 입력해주세요 (MM)",
                            },
                          })}
                          className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:border-navy-blue sm:w-[90%] sm:text-sm"
                        />
                        <span className="absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm">
                          일
                        </span>
                      </div>
                      {errors.registrationDay && (
                        <p className="mt-1 px-3 text-sm text-red-600">
                          {errors.registrationDay.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-white text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-BLUE"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </BlockContainer>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "red",
              color: "#222",
            },
          },
        }}
      />
    </>
  );
};

export default NewFamilyRegister;
