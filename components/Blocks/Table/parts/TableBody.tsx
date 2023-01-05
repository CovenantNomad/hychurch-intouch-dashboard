import React, { Fragment } from 'react';
import { Member } from '../../../../interface/user';
import { RoleType } from '../../../../graphql/generated';
import TableRow from './TableRow';
import TableGroupHeading from './TableGroupHeading';

interface TableBodyProps {
  members: Member[]
}

const TableBody = ({ members }: TableBodyProps) => {
  const leader = members.filter(member => member.roles.includes(RoleType.CellLeader))
  const activceMembers = members.filter(member => member.isActive && !member.roles.includes(RoleType.CellLeader)).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
  const unActiveMembers = members.filter(member => !member.isActive && !member.roles.includes(RoleType.CellLeader)).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)

  const groups = [
    {name: "셀리더", members: leader},
    {name: "활동청년", members: activceMembers},
    {name: "비활동청년", members: unActiveMembers},
  ]

  return (
    <tbody className="bg-white">
      {groups.map(group => (
        <Fragment key={group.name}>
          <TableGroupHeading name={group.name} />
          {group.members ? (
            group.members.map((member, personIdx) => (
              <TableRow key={personIdx} member={member} personIdx={personIdx} />
            ))
          ) : (
            <tr className="border-t border-gray-200">
              <th
                colSpan={6}
                scope="colgroup"
                className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
              >
                해당되는 청년이 없습니다
              </th>
            </tr>
          )}
        </Fragment>
      ))}
    </tbody>
  );
};

export default TableBody;
