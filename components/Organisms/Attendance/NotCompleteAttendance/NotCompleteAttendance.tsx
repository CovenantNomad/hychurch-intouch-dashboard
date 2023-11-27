import Image from "next/image";
// import Link from "next/link";

type NotCompleteAttendanceProps = {}

const NotCompleteAttendance = ({}: NotCompleteAttendanceProps) => {
  return (
    <div className="relative isolate min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
        alt=""
        layout="fill"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-base font-semibold leading-8 text-white">in progress</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">제출 중</h1>
        <p className="mt-4 text-base text-white/70 whitespace-pre-line sm:mt-6">{`리더들의 출석체크가 아직 제출 중에 있습니다\n [출석체크] 화면에서 제출여부를 확인 후 마감해주세요`}</p>
        {/* <div className="mt-10 flex justify-center">
          <Link href={'/reports'}>
            <span className="text-sm font-semibold leading-7 text-white cursor-pointer">&larr; 출석체크 화면으로</span>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default NotCompleteAttendance;
