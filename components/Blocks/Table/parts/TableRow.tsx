import Link from "next/link";
import React from "react";
import { Member } from "../../../../interface/user";

interface TableRowProps {
  personIdx?: number;
  member: Member;
}

const TableRow = ({ personIdx, member }: TableRowProps) => {
  return (
    <tr
      key={member.id}
      className={`${
        personIdx === 0 ? "border-gray-300" : "border-gray-200"
      } border-t`}
    >
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        <Link
          href={{
            pathname: `/cells/${member.cell?.id}/members/${member.id}`,
          }}
        >
          <span className="text-LINKTEXT cursor-pointer hover:underline">
            {member.name}
          </span>
        </Link>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {`${member.gender === "MAN" ? "형제" : "자매"}`}
      </td>
      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 md:block">
        {`${
          member.birthday
            ? new Date().getFullYear() - Number(member.birthday?.split("-")[0])
            : "00"
        }`}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {`${member.birthday ? member.birthday : "1900-00-00"}`}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {member.phone}
      </td>
    </tr>
  );
};

export default TableRow;
