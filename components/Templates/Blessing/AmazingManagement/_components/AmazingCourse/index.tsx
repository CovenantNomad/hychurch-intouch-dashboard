import AmazingCourseList from "./_components/AmazingCourseList";
import OpenAmazingCourse from "./_components/OpenAmazingCourse";

type Props = {};

const AmazingCourse = ({}: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center border-b py-2">
        <h6 className="text-lg font-medium">어메이징 과정</h6>
        <OpenAmazingCourse />
      </div>
      <AmazingCourseList />
    </div>
  );
};

export default AmazingCourse;
