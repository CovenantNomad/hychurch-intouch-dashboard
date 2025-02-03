import {TBarnabaProfile} from "../../../../../../../../interface/barnabas";
import BarnabasProgressCard from "./_components/BarnabasProgressCard/BarnabasProgressCard";

type Props = {
  data: Record<string, TBarnabaProfile[]>;
};

const BarnabasAgeList = ({data}: Props) => {
  return (
    <div>
      {Object.entries(data).map(([age, members]) => (
        <div key={age} className="mt-8">
          <p className="border-b pb-1 text-lg font-semibold">
            {age}년생{" "}
            <span className="text-sm">(활동인원: {members.length}명)</span>
          </p>
          <div className="w-full flex gap-3 mt-3">
            {members
              .slice() // 원본 배열을 복사하여 안전하게 정렬
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((member, index) => (
                <BarnabasProgressCard key={index} member={member} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarnabasAgeList;
