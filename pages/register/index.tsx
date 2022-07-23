import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { RegisterForm } from '../../interface/register'

const Register: NextPage = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<RegisterForm>()

  const onSubmitHandler = (data: RegisterForm) => {
    console.log(data)
  }

  console.log(errors)

  return (
    <section>
      <Head>
        <title>새가족등록 | INTOUCH CHURCH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <article>
        <header className='flex mb-6 lg:mb-8'>
          <h4 className='text-2xl font-bold tracking-wide'>새가족 등록</h4>
        </header>
        
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">새가족 등록카드</h3>
              <p className="mt-1 text-sm text-gray-600">
                새가족 등록카드에 작성된 내용을 입력해 주세요.
              </p>
            </div>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        이름
                      </label>
                      <input
                        type="text"
                        placeholder='이름을 입력해주세요'
                        {...register("name", {
                          required: "이름을 입력해주세요",
                          minLength: {
                            value: 2,
                            message: "이름을 제대로 입력하였는지 확인해 주세요 (최소길이오류)"
                          },
                          maxLength: {
                            value: 5,
                            message: "이름을 제대로 입력하였는지 확인해 주세요 (최대길이오류)"
                          },
                          pattern: {
                            value: /^[가-힣a-zA-Z]+$/g,
                            message: "글자만 입력해주세요"
                          },
                          setValueAs: v => v.replace(/\s/g, ""),
                        })}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                      {errors.name && <p className="mt-1 px-3 text-sm text-red-600">{errors.name.message}</p>}
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
                        성별
                      </label>
                      <select
                        id="sex"
                        {...register("sex")}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      >
                        <option value={"male"}>남자</option>
                        <option value={"female"}>여자</option>
                      </select>
                    </div>

                    <div className="col-span-6 -mb-6">
                      <span className='block text-sm font-medium text-gray-700'>생년월일</span>
                    </div>

                    <div className="col-span-2">
                      <div className='relative flex items-center w-full'>
                        <label htmlFor="year" className="sr-only">년</label>
                        <input
                          id="year"
                          type="text"
                          placeholder='YYYY'
                          {...register("year")}
                          className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:ring-teal-500 focus:border-teal-500 sm:w-[90%] sm:text-sm"
                        />
                        <span className='absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm'>년</span>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className='relative flex items-center w-full'>
                        <label htmlFor="month" className="sr-only">월</label>
                        <input
                          id="month"
                          type="text"
                          placeholder='MM'
                          {...register("month", {
                            setValueAs: (v:string) => v.padStart(2, '0')
                          })}
                          className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:ring-teal-500 focus:border-teal-500 sm:w-[90%] sm:text-sm"
                        />
                        <span className='absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm'>월</span>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className='relative flex items-center w-full'>
                        <label htmlFor="day" className="sr-only">일</label>
                        <input
                          id="day"
                          type="text"
                          placeholder='DD'
                          {...register("day", {
                            setValueAs: (v:string) => v.padStart(2, '0')
                          })}
                          className="mt-1 block w-[80%] py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none text-right focus:ring-teal-500 focus:border-teal-500 sm:w-[90%] sm:text-sm"
                        />
                        <span className='absolute top-1/2 right-0 -mt-2 text-gray-500 text-sm'>일</span>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        전화번호
                      </label>
                      <input
                        id='phone'
                        type="text"
                        placeholder='숫자만 입력해주세요'
                        {...register("phone", {
                          required: "핸드폰번호를 입력해주세요",
                          setValueAs: v => v.replace(/[-.,_+]|\s/g, ""),
                          minLength: {
                            value: 9,
                            message: "최소 9자리 이상 입력해주세요"
                          },
                          maxLength: {
                            value: 11,
                            message: "핸드폰번호는 최대 11자리입니다"
                          },
                        })}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                      {errors.phone && <p className="mt-1 px-3 text-sm text-red-600">{errors.phone.message}</p>}
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        주소
                      </label>
                      <input
                        id='address'
                        type="text"
                        placeholder='주소를 입력해주세요'
                        {...register("address")}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        비고
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          rows={3}
                          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                          placeholder="인도자, 방문계기 등 추가적으로 입력할 사항을 기입해주세요"
                          defaultValue={''}
                          {...register("description")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-white text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </article>
    </section>
  )
}

export default Register
