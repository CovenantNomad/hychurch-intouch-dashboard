import {useRecoilState} from "recoil";
import {MemberWithTransferOut} from "../../../../../../interface/user";
import {
  selectedMonthState,
  selectedYearState,
} from "../../../../../../stores/newFamilyState";
import MonthPicker from "../../../../../Blocks/MonthPicker";
import NewFamilyCalendarViewListItem from "./_components/NewFamilyCalendarViewListItem";

type Props = {
  memberList: MemberWithTransferOut[];
};

const groupMembersByDate = (filteredMembers: MemberWithTransferOut[]) => {
  // 빈 객체로 초기화
  const groupedMembers: {[date: string]: MemberWithTransferOut[]} = {};

  filteredMembers.forEach((member) => {
    if (!member.registrationDate) return; // registrationDate가 없는 경우 제외

    const registrationDate = new Date(member.registrationDate);
    if (isNaN(registrationDate.getTime())) return; // 유효하지 않은 날짜 제외

    // 날짜를 `YYYY-MM-DD` 형식으로 변환하여 그룹 키로 사용
    const dateKey = registrationDate.toISOString().split("T")[0];

    // 해당 날짜에 멤버 추가
    if (!groupedMembers[dateKey]) {
      groupedMembers[dateKey] = [];
    }
    groupedMembers[dateKey].push(member);
  });

  return groupedMembers;
};

const NewFamilyCalendarView = ({memberList}: Props) => {
  const [selectedYear, setSelectedYear] = useRecoilState(selectedYearState);
  const [selectedMonth, setSelectedMonth] = useRecoilState(selectedMonthState);

  // 선택된 연도와 월에 맞는 멤버 필터링
  const filteredMembers = memberList.filter((member) => {
    // registrationDate가 null 또는 undefined인지 확인
    if (!member.registrationDate) return false;

    // registrationDate가 문자열인지 확인
    const registrationDate = new Date(member.registrationDate);
    if (isNaN(registrationDate.getTime())) return false; // 유효하지 않은 날짜인 경우 제외

    // 선택된 연도와 월이 일치하는지 확인
    return (
      registrationDate.getFullYear() === selectedYear &&
      registrationDate.getMonth() + 1 === selectedMonth
    );
  });

  const groupedMembers = groupMembersByDate(filteredMembers);

  return (
    <div>
      <div className="pt-6 pb-8">
        <MonthPicker
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </div>
      <NewFamilyCalendarViewListItem
        selectedMonth={selectedMonth}
        groupedMembers={groupedMembers}
      />
    </div>
  );
};

export default NewFamilyCalendarView;
