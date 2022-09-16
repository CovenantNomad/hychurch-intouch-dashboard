import { Gender } from "../../../graphql/generated"
import { UserInfomationProps } from "../../../interface/user"


const UserInfomation = ({ gender, isActive, birthday, phone, address, description }: UserInfomationProps) => {
  return (
    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">성별</dt>
        <dd className="mt-1 text-sm text-gray-900">{gender === "MAN" ? "형제" : "자매"}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">활동여부</dt>
        <dd className="mt-1 text-sm text-gray-900">{isActive ? "활동" : "비활동"}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">생년월일</dt>
        <dd className="mt-1 text-sm text-gray-900">{birthday || "1900-01-01"}</dd>
      </div>
      <div className="sm:col-span-1">
        <dt className="text-sm font-medium text-gray-500">휴대폰번호</dt>
        <dd className="mt-1 text-sm text-gray-900">{phone}</dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-sm font-medium text-gray-500">주소</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {address}
        </dd>
      </div>
      <div className="sm:col-span-2">
        <dt className="text-sm font-medium text-gray-500">비고</dt>
        <dd className="mt-1 text-sm text-gray-900">
          {description}
        </dd>
      </div>
    </dl>
  )
}

export default UserInfomation