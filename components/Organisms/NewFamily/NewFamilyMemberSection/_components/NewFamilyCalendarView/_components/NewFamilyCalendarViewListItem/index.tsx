import Link from "next/link";
import {MemberWithTransferOut} from "../../../../../../../../interface/user";
import {
  getGenderColor,
  getWeekNumber,
} from "../../../../../../../../utils/utils";
import TransferTooltip from "../../../../../../../Atoms/Tooltips/TransferTooltip";
import CalculateAgeWithStyle from "../../../CalculateAgeWithStyle/CalculateAgeWithStyle";

type Props = {
  groupedMembers: {[key: string]: MemberWithTransferOut[]};
  selectedMonth: number;
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
                  <th className="border border-gray-300 px-4 py-2 w-1/4">
                    주소
                  </th>
                  <th className="border border-gray-300 px-4 py-2 w-1/6">
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
                      <CalculateAgeWithStyle birthday={member.birthday} />
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
                        {member.transferStatus && member.toCellName && (
                          <TransferTooltip toCellName={member.toCellName} />
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
