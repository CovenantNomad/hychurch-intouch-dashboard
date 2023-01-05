import { GraphQLError } from 'graphql-request/dist/types'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { useSetRecoilState } from 'recoil'
import graphlqlRequestClient from '../client/graphqlRequestClient'
import { INTOUCH_DASHBOARD_USER } from '../constants/constant'
import { LoginMutation, useLoginMutation } from '../graphql/generated'
import { LoginForm } from '../interface/login'
import { userState } from '../stores/authState'
import { makeErrorMessage } from '../utils/utils'


const Login: NextPage = () => {
  const router = useRouter()
  const setUser = useSetRecoilState(userState)
  const { mutate, isLoading, isError, isSuccess, data, error } = useLoginMutation(graphlqlRequestClient, {
    onSuccess: (data) => {
      const userInfo = JSON.stringify({
        isLoggedIn: true,
        username: data.login.user.name,
        userId: data.login.user.id,
        accessToken: data.login.accessToken
      })
      localStorage.setItem(INTOUCH_DASHBOARD_USER, userInfo)
      graphlqlRequestClient.setHeader("authorization", data.login.accessToken)
      setUser({
        isLoggedIn: true,
        username: data.login.user.name,
        userId: data.login.user.id,
        accessToken: data.login.accessToken
      })
      router.push("/home")
    },
    onError(errors) {
      if (error instanceof Error) {
        toast.error(`로그인에 실패했습니다.\n${makeErrorMessage(error.message)}`)
      }
    },
  })

  const { handleSubmit, register, formState: {errors}} = useForm<LoginForm>()

  const onSubmitHandler = ({ phone, password }: LoginForm) => {
    mutate({
      input: {
        phone,
        password
      }
    })
  }

  if (process.env.NODE_ENV === "production") {
    console.log('Production')
  } else {
    console.log('Dev')
  }


  return (
    <div>
      <Head>
        <title>로그인 | INTOUCH CHURCH</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='w-full h-screen flex flex-col items-center justify-center'>
        <h3 className='text-4xl font-poppins font-light'>THE ARK</h3>
        <h6 className='text-sm italic mb-8'>by intouch</h6>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          <div className="flex flex-col justify-center w-72">
            <label htmlFor="phone" className="sr-only">
              휴대폰번호
            </label>
            <input
              id="phone"
              type="text"
              placeholder='Phone Number'
              {...register("phone", {
                required: "휴대폰번호를 입력해주세요",
                setValueAs: v => v.replace(/[-.,_+]|\s/g, ""),
                minLength: {
                  value: 9,
                  message: "최소 9자리 이상 입력해주세요"
                },
                maxLength: {
                  value: 11,
                  message: "휴대폰번호는 최대 11자리입니다"
                },
              })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 outline-none appearance-none focus:border-black sm:text-sm"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div className="flex flex-col justify-center">
            <label htmlFor="password" className="sr-only">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder='Password'
              {...register("password", {
                required: "비밀번호를 입력해주세요",
              })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 outline-none appearance-none focus:border-black sm:text-sm"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-navy-blue bg-navy-blue/90"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
      <Toaster 
        toastOptions={{
          success: {
            style: {
              background: '#fff',
              color: '#222',
            },
          },
          error: {
            style: {
              background: '#fff',
              color: '#222'
            },
          },
        }}
      />
    </div>
  )
}

export default Login
