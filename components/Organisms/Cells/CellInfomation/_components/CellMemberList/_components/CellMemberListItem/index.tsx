import Link from "next/link";
import {Gender} from "../../../../../../../../graphql/generated";
import {Member} from "../../../../../../../../interface/user";
import {
  calculateAge,
  formatPhoneNumber,
  getGender,
} from "../../../../../../../../utils/utils";

type Props = {
  member: Member;
};

const CellMemberListItem = ({member}: Props) => {
  return (
    <div className="flex justify-between items-center py-2 px-6 border rounded-md hover:bg-gray-50">
      <div className="text-center">
        <Link
          href={{
            pathname: `/cells/${member.cell?.id}/members/${member.id}`,
          }}
        >
          <p className="font-medium cursor-pointer">
            {member.name}{" "}
            <span className="text-sm">
              {getGender(member.gender || Gender.Man)}
            </span>
          </p>
        </Link>
      </div>
      <div className="text-center">
        <p className="">{calculateAge(member.birthday)}</p>
        <p className="text-sm">({member.birthday})</p>
      </div>
      <div className="text-center">
        <p className="">{formatPhoneNumber(member.phone)}</p>
        <p className="text-xs text-gray-600">전화번호</p>
      </div>
      <div className="text-center">
        <p className="">{member.registrationDate || "2000-01-01"}</p>
        <p className="text-xs text-gray-600">등록일</p>
      </div>
    </div>
  );
};

export default CellMemberListItem;
