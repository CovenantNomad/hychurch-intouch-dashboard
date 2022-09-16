import Link from "next/link"
import { RoleType } from "../../../graphql/generated"
import { MemberProps } from "../../../interface/user"


const MemberCard = ({ member }: MemberProps) => {
  const { id, name, phone, isActive, roles, gender, birthday, cell, address} = member

  const getRole = (roles: RoleType[]) => {
    if (roles.includes(RoleType.CellLeader)) {
      return "셀리더"
    } else if (roles.includes(RoleType.ViceLeader)) {
      return "부리더"
    } else {
      return "청년"
    }
  }

  return (
    <Link
      href={{
        pathname: `/members/${id}`,
        query: {userInfo: JSON.stringify(member)}
      }}
      as={`/members/${id}`}
    >
      <a className='bg-white rounded-lg shadow-lg px-4 pt-6 pb-3'>
        <div className="flex justify-end mb-4">
          <div className={`${isActive ? "border-green-600 bg-green-100" : "border-red-600 bg-red-100"} border px-2 rounded-md flex items-center`}>
            <span className={`${isActive ? "text-green-600" : "text-red-600"} text-sm`}>{isActive ? "Active": "Not Active"}</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mb-4">
          {/* <div className="w-24 h-24 bg-gray-500 rounded-full mb-2"></div> */}
          <div className="text-center">
            <h6 className="text-xl font-bold">{name} <span className="text-base">{`(${gender === 'MAN' ? "형제": "자매"})`}</span></h6>
            <span className="text-sm text-gray-500">{getRole(roles)}</span>
          </div>
        </div>
        <div className="border border-gray-300 bg-gray-100 px-2 py-3 space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">셀</p>
              <span className="tracking-wide">{cell?.name || "미편성"}</span>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">생일</p>
              <span>{birthday || "0000-00-00"}</span>
            </div>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20">
              <path d="M13.372,1.781H6.628c-0.696,0-1.265,0.569-1.265,1.265v13.91c0,0.695,0.569,1.265,1.265,1.265h6.744c0.695,0,1.265-0.569,1.265-1.265V3.045C14.637,2.35,14.067,1.781,13.372,1.781 M13.794,16.955c0,0.228-0.194,0.421-0.422,0.421H6.628c-0.228,0-0.421-0.193-0.421-0.421v-0.843h7.587V16.955z M13.794,15.269H6.207V4.731h7.587V15.269z M13.794,3.888H6.207V3.045c0-0.228,0.194-0.421,0.421-0.421h6.744c0.228,0,0.422,0.194,0.422,0.421V3.888z"></path>
            </svg>
            <span>{phone}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20">
              <path d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"></path>
            </svg>
            <span>{address || "미입력"}</span>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default MemberCard