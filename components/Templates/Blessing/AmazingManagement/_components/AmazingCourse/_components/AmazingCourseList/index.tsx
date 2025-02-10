import {ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import {useQuery} from "react-query";
import {getAmazingCourse} from "../../../../../../../../firebase/Barnabas/barnabas";
import {cx} from "../../../../../../../../utils/utils";
import Skeleton from "../../../../../../../Atoms/Skeleton/Skeleton";
import ClosedAmazingCourse from "./_components/ClosedAmazingCourse";
import CourseListItem from "./_components/CourseListItem";
import EditAmazingCourse from "./_components/EditAmazingCourse";

type Props = {};

const AmazingCourseList = ({}: Props) => {
  const {isLoading, data} = useQuery(
    ["getAmazingCourse"],
    () => getAmazingCourse(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <div className="mt-10">
      {isLoading ? (
        <Skeleton />
      ) : data && data.length !== 0 ? (
        <div className="grid grid-cols-2 gap-8">
          {data.map((course) => (
            <div
              key={course.cohort}
              className="py-6 pl-6 border border-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-center border-b pb-1 pr-6">
                <div>
                  <span className="inline-block mr-2 font-medium">
                    {course.cohort}기 (시작일: {course.date})
                  </span>
                  <EditAmazingCourse cohort={course.cohort} />
                </div>
                <span
                  className={cx(
                    "text-white px-3 py-1 rounded-full text-sm",
                    course.status === "open" ? "bg-teal-500" : "bg-red-500"
                  )}
                >
                  {course.status === "open" ? "진행중" : "종료"}
                </span>
              </div>
              <div className="mt-5 pr-6">
                {course.members && course.members.length !== 0 ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {course.members.map((member) => (
                        <CourseListItem
                          key={member.menteeId}
                          cohort={course.cohort}
                          member={member}
                        />
                      ))}
                    </div>

                    <div className="flex justify-end mt-8">
                      <ClosedAmazingCourse cohort={course.cohort} />
                    </div>
                  </>
                ) : (
                  <div className="h-[120px] flex justify-center items-center text-sm border rounded-lg">
                    포함된 인원이 없습니다.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-32 flex flex-col justify-center items-center space-y-1 border border-gray-200 rounded-md">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <span className="text-sm text-gray-500">
            개설 된 어메이징 기수가 없습니다.
          </span>
        </div>
      )}
    </div>
  );
};

export default AmazingCourseList;
