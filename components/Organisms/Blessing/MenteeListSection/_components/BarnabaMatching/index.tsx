import {LinkIcon} from "@heroicons/react/24/outline";
import {Button, Select, SelectItem} from "@tremor/react";
import {useState} from "react";
import {useQuery} from "react-query";
import {
  fetchAvailableMentees,
  fetchBarnabaWithoutActiveMentorship,
  saveMenteeProfile,
} from "../../../../../../firebase/Barnabas/barnabas";
import {useBarnabaMatching} from "../../../../../../hooks/barnabas/useBarnabaMatching";
import {TMatchingStatus} from "../../../../../../interface/barnabas";
import {MemberWithTransferOut} from "../../../../../../interface/user";
import {getDateString} from "../../../../../../utils/dateUtils";
import {calculateAge} from "../../../../../../utils/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../ui/Dialog";

type Props = {
  members: MemberWithTransferOut[];
};

const BarnabaMatching = ({members}: Props) => {
  const [selectedBarnaba, setSelectedBarnaba] = useState<string | null>(""); // 초기값을 빈 문자열로 설정
  const [selectedBarnabaData, setSelectedBarnabaData] = useState<any | null>(
    null
  ); // 선택된 바나바 전체 데이터
  const [selectedMentee, setSelectedMentee] = useState<string | null>("");
  const [selectedMenteeData, setSelectedMenteeData] =
    useState<MemberWithTransferOut | null>(null); // 선택된 멘티 전체 데이터
  const [weeks, setWeeks] = useState<string>(""); // 몇주 과정 입력 상태
  const [error, setError] = useState<string | null>(null);

  const {mutate, isLoading: isSubmitLoading} = useBarnabaMatching();

  const {
    isLoading,
    isFetching,
    data: barnabaMember,
  } = useQuery(
    ["fetchBarnabaWithoutActiveMentorship"],
    () => fetchBarnabaWithoutActiveMentorship(),
    {
      staleTime: 0,
      cacheTime: 30 * 60 * 1000,
    }
  );

  const {
    isLoading: isMenteeLoading,
    isFetching: isMenteeFetching,
    data: menteeMember,
  } = useQuery(
    ["fetchAvailableMentees"],
    () => fetchAvailableMentees(members),
    {
      staleTime: 0,
      cacheTime: 30 * 60 * 1000,
      enabled: !!members && members.length > 0,
    }
  );

  const handleBarnabaChange = (value: string) => {
    const barnaba = barnabaMember?.find((b: any) => b.id === value);
    setSelectedBarnaba(value);
    setSelectedBarnabaData(barnaba || null);
  };

  const handleMenteeChange = (value: string) => {
    const mentee = menteeMember?.find((m: any) => m.id === value);
    setSelectedMentee(value);
    setSelectedMenteeData(mentee || null);
  };

  const handleWeeksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeeks(e.target.value);
  };

  const handleSubmit = async (
    weeks: string | number,
    selectedMentee: string | null,
    selectedBarnaba: string | null
  ) => {
    setError(null); // 기존 오류 초기화

    if (!weeks || parseInt(weeks as string, 10) <= 0) {
      setError("진행 기간을 올바르게 입력해주세요.");
      return;
    }

    if (!selectedMentee || !selectedBarnaba || !selectedMenteeData) {
      setError("멘티와 바나바를 선택해주세요.");
      return;
    }

    try {
      // 매칭 실행
      mutate({
        barnabaId: selectedBarnaba,
        menteeId: selectedMentee,
        barnabaName: selectedBarnabaData.name,
        menteeName: selectedMenteeData.name,
        status: TMatchingStatus.PROGRESS,
        matchingDate: getDateString(new Date()),
        completedMeetingCount: "0",
        scheduledMeetingCount: weeks.toString(),
        description: "",
      });

      // 멘티 프로필 Firestore에 저장
      await saveMenteeProfile(selectedMenteeData);

      // 🔹 선택된 값 초기화
      setSelectedBarnaba(null);
      setSelectedBarnabaData(null);
      setSelectedMentee(null);
      setSelectedMenteeData(null);
      setWeeks("");
    } catch (error) {
      console.error("매칭 또는 멘티 프로필 저장 실패:", error);
      setError("매칭 또는 멘티 프로필 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <button className="px-4 py-2 bg-black text-white text-sm rounded-md shadow hover:bg-gray-800 focus:outline-none transition">
              바나바 매칭
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg overflow-visible">
            <DialogHeader>
              <DialogTitle>바나바 매칭</DialogTitle>
              <DialogDescription className="text-sm">
                바나바와 멘티를 매칭해주세요.
              </DialogDescription>
              <div className="mt-6">
                <div className="relative flex justify-center items-center space-x-2 bg-gray-50 p-6 rounded-lg shadow-md mx-auto">
                  {/* Left Card */}
                  <div className="bg-white rounded-lg shadow p-4 w-1/2">
                    {selectedMenteeData ? (
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 flex flex-col justify-center items-center bg-gray-50 rounded-full overflow-hidden ">
                          <p className="mt-1 font-bold text-gray-800">
                            {selectedMenteeData.name}
                          </p>
                          <p className="mt-1 font-bold text-gray-800">
                            {selectedMenteeData.gender === "MAN"
                              ? "형제"
                              : "자매"}
                          </p>
                        </div>
                        <p className="mt-2 text-gray-500 text-sm">
                          {calculateAge(selectedMenteeData.birthday)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-center">멘티를 선택해주세요</p>
                    )}
                  </div>

                  {/* VS Section */}
                  <div className="absolute flex items-center justify-center left-1/2 top-1/2 transform -translate-x-[70%] -translate-y-1/2">
                    {/* 연결 선 */}
                    <span className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-bold z-10">
                      <LinkIcon className="h-4 w-4" />
                    </span>
                  </div>

                  {/* Right Card */}
                  <div className="bg-white rounded-lg shadow p-4 w-1/2">
                    {selectedBarnabaData ? (
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 flex flex-col justify-center items-center bg-gray-50 rounded-full overflow-hidden ">
                          <p className="mt-1 font-bold text-gray-800">
                            {selectedBarnabaData.name}
                          </p>
                          <p className="mt-1 font-bold text-gray-800">
                            {selectedBarnabaData.gender === "MAN"
                              ? "형제"
                              : "자매"}
                          </p>
                        </div>
                        <p className="mt-2 text-gray-500 text-sm">
                          {calculateAge(selectedBarnabaData.birthday)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-center">바나바를 선택해주세요</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6 space-x-4">
                <div className="flex-1">
                  <p className="text-gray-700 mb-2 font-medium">멘티선택</p>
                  <Select
                    value={selectedMentee || ""}
                    onValueChange={handleMenteeChange}
                    className="w-full max-w-sm"
                  >
                    {menteeMember && menteeMember.length > 0 ? (
                      menteeMember.map((mentee) => (
                        <SelectItem key={mentee.id} value={mentee.id}>
                          {mentee.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="">대기중인 멘티가 없습니다</SelectItem>
                    )}
                  </Select>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 mb-2 font-medium">바나바선택</p>
                  <Select
                    value={selectedBarnaba || ""}
                    onValueChange={handleBarnabaChange}
                    className="mt-2 w-full max-w-sm"
                  >
                    {barnabaMember && barnabaMember.length > 0 ? (
                      barnabaMember.map((barnaba: any) => (
                        <SelectItem key={barnaba.id} value={barnaba.id}>
                          {barnaba.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="">가능한 바나바가 없습니다</SelectItem>
                    )}
                  </Select>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <label className="text-gray-700 font-medium">바나바 기간</label>
                <div className="relative w-[40%]">
                  <input
                    value={weeks}
                    onChange={handleWeeksChange}
                    className="border-b border-gray-300 p-2 pr-8 w-full text-sm text-right focus:outline-none"
                    placeholder="진행 기간을 입력해주세요"
                  />
                  <span className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-500">
                    주
                  </span>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </DialogHeader>
            <DialogFooter className="mt-10">
              <DialogClose asChild>
                <Button className="mt-2 w-full sm:mt-0 sm:w-fit border border-gray-300 text-gray-700 bg-white rounded-md shadow hover:bg-gray-100 focus:outline-none hover:border-gray-300">
                  취소
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() =>
                    handleSubmit(weeks, selectedMentee, selectedBarnaba)
                  }
                  className={`w-full sm:w-fit bg-black text-white text-sm rounded-md shadow hover:bg-gray-800 focus:outline-none border-none${
                    !weeks ||
                    parseInt(weeks as string, 10) <= 0 ||
                    !selectedMentee ||
                    !selectedBarnaba
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={
                    !weeks ||
                    parseInt(weeks as string, 10) <= 0 ||
                    !selectedMentee ||
                    !selectedBarnaba ||
                    isSubmitLoading
                  }
                >
                  {isSubmitLoading ? "매칭 중..." : "매칭 제출"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default BarnabaMatching;
