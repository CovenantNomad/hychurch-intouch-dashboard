import Link from "next/link"

const Redirect = () => {
  
  return (
    <div className="min-h-screen pt-16 pb-12 flex flex-col bg-white">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <h1 className="mt-2 text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl sm:tracking-tight">
              로그인하셔야 이용하실 수 있습니다
            </h1>
            <p className="mt-2 text-base text-gray-500">해당 페이지는 로그인하셔야 이용하실 수 있습니다. 로그인해주세요.</p>
            <Link href={"/"}>
              <a className="text-base font-medium text-indigo-600 hover:text-indigo-500 mt-6">
                Go back home<span aria-hidden="true"> &rarr;</span>
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Redirect