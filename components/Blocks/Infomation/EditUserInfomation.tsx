import dayjs from "dayjs";
import { GraphQLError } from "graphql";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import {
  UserGrade,
  useResetUserPasswordMutation,
  useUpdateUserMutation,
} from "../../../graphql/generated";
import { SpecialCellIdType } from "../../../interface/cell";
import { EditForm } from "../../../interface/register";
import { UpdateUserInfomationProps } from "../../../interface/user";
import { makeErrorMessage } from "../../../utils/utils";

const EditUserInfomation = ({
  id,
  name,
  gender,
  grade,
  isActive,
  birthday,
  phone,
  address,
  description,
  cell,
  registrationYear,
  registrationMonth,
  registrationDay,
  editModeHandler,
}: UpdateUserInfomationProps) => {
  const today = dayjs();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditForm>();
  const { mutate, isLoading, isError, isSuccess } = useUpdateUserMutation(
    graphlqlRequestClient,
    {
      onSuccess: (data) => {
        toast.success("정보가 수정되었습니다\n검색결과를 다시 선택해주세요");
        queryClient.invalidateQueries({
          queryKey: ["searchUsers"],
        });
        if (cell?.id === SpecialCellIdType.NewFamily) {
          queryClient.invalidateQueries({
            queryKey: ["findNewFamilyCell"],
          });
        } else if (cell?.id === SpecialCellIdType.Blessing) {
          queryClient.invalidateQueries({
            queryKey: ["findBlessingCell"],
          });
        } else if (cell?.id === SpecialCellIdType.Renew) {
          queryClient.invalidateQueries({
            queryKey: ["findRenewCell"],
          });
        } else {
          queryClient.invalidateQueries({
            queryKey: ["findCell", { id: Number(cell?.id) }],
          });
        }
        queryClient.invalidateQueries({
          queryKey: ["findUser", { id: id }],
        });
        queryClient.invalidateQueries({
          queryKey: ["searchUsers"],
        });

        if (editModeHandler) {
          editModeHandler(false);
        }
      },
      onError: (errors: GraphQLError) => {
        toast.error(
          `해당 청년 정보를 수정 중 오류가 발생하였습니다\n${makeErrorMessage(
            errors.message
          )}`
        );
      },
    }
  );

  const { mutate: resetMutate } = useResetUserPasswordMutation(
    graphlqlRequestClient,
    {
      onSuccess: (data) => {
        toast.success("비밀번호가 초기화 되었습니다");
      },
      onError: (errors: GraphQLError) => {
        toast.error(
          `비밀번호 초기화를 할 수 없습니다\n${makeErrorMessage(
            errors.message
          )}`
        );
      },
    }
  );

  const onSubmitHandler = ({
    name,
    gender,
    year,
    month,
    day,
    phone,
    address,
    description,
    grade,
    isActive,
    newRegistrationYear,
    newRegistrationMonth,
    newRegistrationDay,
  }: EditForm) => {
    const birthday = `${year}-${month}-${day}`;
    const registrationDate = `${newRegistrationYear}-${newRegistrationMonth}-${newRegistrationDay}`;
    const isActiveStatus = isActive === "포함" ? true : false;

    mutate({
      input: {
        id,
        name,
        gender,
        grade,
        isActive: isActiveStatus,
        phone,
        birthday,
        address,
        description,
        registrationDate,
      },
    });
  };

  const resetHandler = () => {
    if (id) {
      resetMutate({
        input: {
          userId: id,
        },
      });
    }
  };

  return (
    <div className="px-2 bg-white lg:px-4">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="py-5 bg-white sm:py-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                이름*
              </label>
              <input
                type="text"
                defaultValue={name}
                placeholder="이름을 입력해주세요"
                {...register("name", {
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

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                성별*
              </label>
              <select
                id="gender"
                defaultValue={gender === "MAN" ? "MAN" : "WOMAN"}
                {...register("gender")}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-navy-blue sm:text-sm"
              >
                <option value={"MAN"}>남자</option>
                <option value={"WOMAN"}>여자</option>
              </select>
              {errors.gender && (
                <p className="mt-1 px-3 text-sm text-red-600">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="grade"
                className="block text-sm font-medium text-gray-700"
              >
                활동등급*
              </label>
              <select
                id="grade"
                defaultValue={grade}
                {...register("grade")}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-navy-blue sm:text-sm"
              >
                <option value={UserGrade.A}>A</option>
                <option value={UserGrade.B}>B</option>
                <option value={UserGrade.C}>C</option>
                <option value={UserGrade.D}>D</option>
                <option value={UserGrade.E}>E</option>
                <option value={UserGrade.E}>F</option>
              </select>
              {errors.grade && (
                <p className="mt-1 px-3 text-sm text-red-600">
                  {errors.grade.message}
                </p>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="isActive"
                className="block text-sm font-medium text-gray-700"
              >
                셀보고서 포함여부*
              </label>
              <select
                id="isActive"
                defaultValue={isActive ? "포함" : "미포함"}
                {...register("isActive")}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-navy-blue sm:text-sm"
              >
                <option value={"포함"}>포함</option>
                <option value={"미포함"}>미포함</option>
              </select>
              {errors.isActive && (
                <p className="mt-1 px-3 text-sm text-red-600">
                  {errors.isActive.message}
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
                  defaultValue={birthday ? birthday.split("-")[0] : "1900"}
                  {...register("year", {
                    minLength: {
                      value: 4,
                      message: "4자리로 입력해주세요 (YYYY)",
                    },
                    maxLength: {
                      value: 4,
                      message: "4자리로 입력해주세요 (YYYY)",
                    },
                    max: {
                      value: today.get("year"),
                      message: `${today.get("year")}년을 넘을 수 없습니다`,
                    },
                  })}
                  className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:border-navy-blue sm:w-[90%] sm:text-sm"
                />
                <span className="absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm">
                  년
                </span>
              </div>
              {errors.year && (
                <p className="mt-1 px-3 text-sm text-red-600">
                  {errors.year.message}
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
                  defaultValue={birthday ? birthday.split("-")[1] : "01"}
                  {...register("month", {
                    setValueAs: (v: string) => v.padStart(2, "0"),
                    minLength: {
                      value: 2,
                      message: "2자리로 입력해주세요 (MM)",
                    },
                    maxLength: {
                      value: 2,
                      message: "4자리로 입력해주세요 (MM)",
                    },
                    min: {
                      value: 1,
                      message: "1월보다 작을 수 없습니다",
                    },
                    max: {
                      value: 12,
                      message: "12월을 넘을 수 없습니다",
                    },
                  })}
                  className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:border-navy-blue sm:w-[90%] sm:text-sm"
                />
                <span className="absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm">
                  월
                </span>
              </div>
              {errors.month && (
                <p className="mt-1 px-3 text-sm text-red-600">
                  {errors.month.message}
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
                  defaultValue={birthday ? birthday.split("-")[2] : "01"}
                  {...register("day", {
                    setValueAs: (v: string) => v.padStart(2, "0"),
                    minLength: {
                      value: 2,
                      message: "2자리로 입력해주세요 (MM)",
                    },
                    maxLength: {
                      value: 2,
                      message: "4자리로 입력해주세요 (MM)",
                    },
                    min: {
                      value: 1,
                      message: "1일보다 작을 수 없습니다",
                    },
                    max: {
                      value: 31,
                      message: "31일을 넘을 수 없습니다",
                    },
                  })}
                  className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:border-navy-blue sm:w-[90%] sm:text-sm"
                />
                <span className="absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm">
                  일
                </span>
              </div>
              {errors.day && (
                <p className="mt-1 px-3 text-sm text-red-600">
                  {errors.day.message}
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
                defaultValue={phone}
                {...register("phone", {
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
                defaultValue={address!}
                placeholder="주소"
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
                  defaultValue={description!}
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
                  defaultValue={registrationYear ? registrationYear : '2022'}
                  {...register("newRegistrationYear", {
                    minLength: {
                      value: 4,
                      message: "4자리로 입력해주세요 (YYYY)",
                    },
                    maxLength: {
                      value: 4,
                      message: "4자리로 입력해주세요 (YYYY)",
                    },
                    max: {
                      value: today.get("year"),
                      message: `${today.get("year")}년을 넘을 수 없습니다`,
                    },
                  })}
                  className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:border-navy-blue sm:w-[90%] sm:text-sm"
                />
                <span className="absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm">
                  년
                </span>
              </div>
              {errors.newRegistrationYear && (
                <p className="mt-1 px-3 text-sm text-red-600">
                  {errors.newRegistrationYear.message}
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
                  defaultValue={registrationMonth ? registrationMonth : '12'}
                  {...register("newRegistrationMonth", {
                    setValueAs: (v: string) => v.padStart(2, "0"),
                    minLength: {
                      value: 2,
                      message: "2자리로 입력해주세요 (MM)",
                    },
                    maxLength: {
                      value: 2,
                      message: "4자리로 입력해주세요 (MM)",
                    },
                    min: {
                      value: 1,
                      message: "1월보다 작을 수 없습니다",
                    },
                    max: {
                      value: 12,
                      message: "12월을 넘을 수 없습니다",
                    },
                  })}
                  className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:border-navy-blue sm:w-[90%] sm:text-sm"
                />
                <span className="absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm">
                  월
                </span>
              </div>
              {errors.newRegistrationMonth && (
                <p className="mt-1 px-3 text-sm text-red-600">
                  {errors.newRegistrationMonth.message}
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
                  defaultValue={registrationDay ? registrationDay : '31'}
                  {...register("newRegistrationDay", {
                    setValueAs: (v: string) => v.padStart(2, "0"),
                    minLength: {
                      value: 2,
                      message: "2자리로 입력해주세요 (DD)",
                    },
                    maxLength: {
                      value: 2,
                      message: "4자리로 입력해주세요 (DD)",
                    },
                    min: {
                      value: 1,
                      message: "1일보다 작을 수 없습니다",
                    },
                    max: {
                      value: 31,
                      message: "31일을 넘을 수 없습니다",
                    },
                  })}
                  className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:border-navy-blue sm:w-[90%] sm:text-sm"
                />
                <span className="absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm">
                  일
                </span>
              </div>
              {errors.newRegistrationDay && (
                <p className="mt-1 px-3 text-sm text-red-600">
                  {errors.newRegistrationDay.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between py-3 bg-white">
          <button
            type="button"
            onClick={resetHandler}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-BLUE"
          >
            비밀번호 초기화
          </button>

          <div className="space-x-4">
            <button
              type="button"
              onClick={() => editModeHandler(false)}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-RED"
            >
              취소
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-BLUE"
            >
              수정하기
            </button>
          </div>
        </div>
      </form>
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
    </div>
  );
};

export default EditUserInfomation;
