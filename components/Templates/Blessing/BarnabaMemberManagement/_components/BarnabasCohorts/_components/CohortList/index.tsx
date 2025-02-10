import Link from "next/link";
import {TBarnabaProfile} from "../../../../../../../../interface/barnabas";
import {calculateAge} from "../../../../../../../../utils/utils";

type Props = {
  data: Record<string, TBarnabaProfile[]>;
};

const CohortList = ({data}: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      {Object.entries(data).map(([cohort, members]) => (
        <div key={cohort} className="flex items-center border rounded-md">
          <p className="w-20 text-center">
            {cohort} 기<br />
            <span className="text-sm">({members.length}명)</span>
          </p>
          <div className="w-full grid grid-cols-10">
            {members
              .slice() // 원본 배열을 복사하여 안전하게 정렬
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((member, index) => (
                <Link
                  key={member.id}
                  href={{
                    pathname: `/blessing/barnabas/${member.id}`,
                    query: {
                      id: member.id,
                      name: member.name,
                      cohort: member.cohort,
                    },
                  }}
                  as={`/blessing/barnabas/${member.id}`}
                >
                  <div
                    className={`col-span-1 py-2 text-center cursor-pointer ${
                      index < 10 && members.length > 10 && "border-b"
                    } ${
                      index === members.length - 1 &&
                      index !== 9 &&
                      index !== 19 &&
                      "border-r"
                    } border-l border-collapse ${
                      member.isActive === false && "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {member.name}
                    <br />
                    <span className="text-sm">
                      {calculateAge(member.birthday)}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CohortList;
