import Link from "next/link";
import {useRecoilState} from "recoil";
import {TBarnabaProfile} from "../../../../../../../../interface/barnabas";
import {barnabasViewState} from "../../../../../../../../stores/barnabaState";
import {calculateAge, cx} from "../../../../../../../../utils/utils";

type Props = {
  data: Record<string, TBarnabaProfile[]>;
};

const CohortList = ({data}: Props) => {
  const [isViewAll, setIsViewAll] = useRecoilState(barnabasViewState);

  return (
    <>
      <div className="flex justify-end mb-2">
        <div className="h-9 grid grid-cols-2 justify-center items-center p-1 bg-zinc-100 rounded-lg outline-none">
          <button
            onClick={() => setIsViewAll(false)}
            className={cx(
              "px-4 py-1 rounded-lg text-sm",
              isViewAll
                ? "bg-transparent text-gray-500"
                : "bg-white text-[#09090B]"
            )}
          >
            활동
          </button>
          <button
            onClick={() => setIsViewAll(true)}
            className={cx(
              "px-4 py-1 rounded-lg text-sm",
              isViewAll
                ? "bg-white text-[#09090B]"
                : "bg-transparent text-gray-500"
            )}
          >
            전체
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        {Object.entries(data).map(([cohort, members]) => {
          const filteredMembers = isViewAll
            ? members
            : members.filter((member) => member.isActive);

          return (
            <div key={cohort} className="flex items-center border rounded-md">
              <p className="w-20 text-center">
                {cohort} 기<br />
                <span className="text-sm">({members.length}명)</span>
              </p>
              <div className="w-full grid grid-cols-10">
                {filteredMembers
                  .slice()
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
                          index === filteredMembers.length - 1 &&
                          index !== 9 &&
                          index !== 19 &&
                          "border-r"
                        } border-l border-collapse ${
                          member.isActive === false &&
                          "bg-zinc-100 text-gray-500"
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
          );
        })}
      </div>
    </>
  );
};

export default CohortList;
