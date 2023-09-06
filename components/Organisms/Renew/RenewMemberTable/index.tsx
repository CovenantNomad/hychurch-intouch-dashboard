import React, { useState } from 'react';
import { MemberWithTransferOut } from '../../../../interface/user';
import { getGender } from '../../../../utils/utils';
import dayjs from 'dayjs';
import Tooltips from '../../../Atoms/Tooltips/Tooltips';
import Link from 'next/link';

interface RenewMemberTableProps {
  memberList: MemberWithTransferOut[];
}

enum sortType {
  NAME = "name",
  AGE = "age",
}

const RenewMemberTable = ({ memberList }: RenewMemberTableProps) => {
  const [sorted, setSorted] = useState(sortType.NAME)

  return (
    <div className="mt-8 flow-root">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="pl-4 pr-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      onClick={() => setSorted(sortType.NAME)}
                    >
                      이름
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      성별
                    </th>
                    <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:block">
                      나이
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      생일
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      연락처
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 text-center text-sm font-semibold text-gray-900 sm:pr-6">
                      셀편성 상태
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {memberList.map((member) => (
                    <tr key={member.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <Link
                          href={{
                            pathname: `/renew/${member.id}`,
                            query: {
                              transferStatus: member.transferStatus,
                              toCellName: member.toCellName,
                            },
                          }}
                          as={`/renew/${member.id}`}
                        >
                          {member.name}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.gender ? getGender(member.gender) : '미입력'}</td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 md:block">{member.birthday?.split('-')[0] !== '1900' ? dayjs().get('year') - Number(member.birthday?.split('-')[0]) : '미입력'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.birthday?.split('-')[0] !== '1900' ? member.birthday : '미입력'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.phone}</td>
                      <td className="relative flex justify-center whitespace-nowrap py-4 pl-3 pr-4 text-center font-medium sm:pr-6">
                        {member.transferStatus && <Tooltips text="셀편성 중" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RenewMemberTable;
