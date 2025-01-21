import Link from "next/link";
import {MemberWithTransferOut} from "../../../../../../../../interface/user";
import {
  getGenderColor,
  getWeekNumber,
} from "../../../../../../../../utils/utils";

type Props = {
  groupedMembers: {[key: string]: MemberWithTransferOut[]};
  selectedMonth: number;
};

const calculateAgeWithStyle = (
  birthday: string | null | undefined
): JSX.Element => {
  if (!birthday) return <span className="text-gray-500">알 수 없음</span>;

  const birthDate = new Date(birthday);
  if (isNaN(birthDate.getTime()))
    return <span className="text-gray-500">알 수 없음</span>;

  const currentYear = new Date().getFullYear();
  const birthYear = birthDate.getFullYear();
  const age = currentYear - birthYear;

  const shortYear = String(birthYear).slice(-2); // YY 형식 추출

  // 색상 결정 (그라데이션 느낌)
  let bgColor = "bg-gray-200";
  let textColor = "text-gray-800";
  let badgeText = "";

  if (age < 24) {
    bgColor = "bg-[#e0ede2]";
    textColor = "text-[#1f2937]";
  } else if (age < 27) {
    bgColor = "bg-[#96ceb0]";
    textColor = "text-[#1f2937]";
  } else if (age < 30) {
    bgColor = "bg-[#5d9d86]";
    textColor = "text-[#1f2937]";
  } else if (age < 33) {
    bgColor = "bg-[#fdded9]";
    textColor = "text-[#1f2937]";
  } else {
    bgColor = "bg-[#fca5a5]";
    textColor = "text-[#1f2937]";
  }

  return (
    <td className={`border border-gray-300 px-4 py-3 ${bgColor} ${textColor}`}>
      <span>
        {age}세 ({shortYear}년생)
      </span>
    </td>
  );
};

const NewFamilyCalendarViewListItem = ({
  groupedMembers,
  selectedMonth,
}: Props) => {
  const sortedDates = Object.keys(groupedMembers).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime(); // 최신순
  });

  return (
    <div>
      {sortedDates.map((date) => {
        // 2. 멤버를 ㄱㄴㄷ 순으로 정렬
        const sortedMembers = groupedMembers[date].sort((a, b) => {
          return a.name.localeCompare(b.name, "ko");
        });

        return (
          <div key={date} className="mb-8">
            <h3 className="text-lg font-semibold mb-1">
              {selectedMonth}월 {getWeekNumber(date)}
            </h3>
            <table className="w-full border-collapse border border-gray-300 table-fixed">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 w-1/6">
                    이름
                  </th>
                  <th className="border border-gray-300 px-4 py-2 w-1/6">
                    나이
                  </th>
                  <th className="border border-gray-300 px-4 py-2 w-1/12">
                    성별
                  </th>
                  <th className="border border-gray-300 px-4 py-2 w-1/6">
                    전화번호
                  </th>
                  <th className="border border-gray-300 px-4 py-2 w-1/3">
                    주소
                  </th>
                  <th className="border border-gray-300 px-4 py-2 w-1/12">
                    셀편성상태
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedMembers.map((member, index) => {
                  return (
                    <tr key={index} className="text-center">
                      <Link
                        href={{
                          pathname: `/newfamily/${member.id}`,
                          query: {
                            transferStatus: member.transferStatus,
                            toCellName: member.toCellName,
                          },
                        }}
                        as={`/newfamily/${member.id}`}
                      >
                        <td className="border border-gray-300 px-4 py-3 cursor-pointer hover:bg-gray-100">
                          {member.name}
                        </td>
                      </Link>
                      {/* <td className={`border border-gray-300 px-4 py-3`}>
                        {calculateAge(member.birthday)}
                      </td> */}
                      {calculateAgeWithStyle(member.birthday)}
                      <td
                        className={`border border-gray-300 px-4 py-3 ${getGenderColor(
                          member.gender!
                        )}`}
                      >
                        {member.gender === "MAN" ? "형제" : "자매"}
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        {member.phone}
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        {member.address}
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        {member.transferStatus && (
                          <span className="text-sm py-1.5 px-2 bg-teal-800 text-white rounded-full">
                            셀편성중
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default NewFamilyCalendarViewListItem;
