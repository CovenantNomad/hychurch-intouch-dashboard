type Props = {
  birthday: string | null | undefined;
};

const CalculateAgeWithStyle = ({birthday}: Props): JSX.Element => {
  if (!birthday) return <span className="text-gray-500">알 수 없음</span>;

  const birthDate = new Date(birthday);
  if (isNaN(birthDate.getTime()))
    return <span className="text-gray-500">알 수 없음</span>;

  const currentYear = new Date().getFullYear();
  const birthYear = birthDate.getFullYear();
  const age = currentYear - birthYear;

  const shortYear = String(birthYear).slice(-2); // YY 형식 추출

  // 색상 결정 (그라데이션 느낌)
  let bgColor = "bg-gray-200";
  let textColor = "text-gray-800";
  let badgeText = "";

  if (age < 24) {
    bgColor = "bg-[#e0ede2]";
    textColor = "text-[#1f2937]";
    badgeText = "1";
  } else if (age < 27) {
    bgColor = "bg-[#96ceb0]";
    textColor = "text-[#1f2937]";
    badgeText = "2";
  } else if (age == 27) {
    bgColor = "bg-[#5d9d86]";
    textColor = "text-[#1f2937]";
    badgeText = "3";
  } else if (age == 28) {
    bgColor = "bg-[#fee685]";
    textColor = "text-[#1f2937]";
    badgeText = "4";
  } else if (age == 29) {
    bgColor = "bg-[#ffd230]";
    textColor = "text-[#1f2937]";
    badgeText = "5";
  } else if (age < 32) {
    bgColor = "bg-[#fd9a00]";
    textColor = "text-[#1f2937]";
    badgeText = "6";
  } else if (age < 34) {
    bgColor = "bg-[#fdded9]";
    textColor = "text-[#1f2937]";
    badgeText = "7";
  } else {
    bgColor = "bg-[#fca5a5]";
    textColor = "text-[#1f2937]";
    badgeText = "8";
  }

  return (
    <td className={`border-gray-300 border-collapse border px-4 py-3`}>
      <div className="flex space-x-3 justify-center">
        <span className="">
          {age}세 ({shortYear}년생)
        </span>
        <span
          className={`${bgColor} ${textColor} w-6 h-6 flex justify-center items-center rounded-full text-sm`}
        >
          {badgeText}
        </span>
      </div>
    </td>
  );
};

export default CalculateAgeWithStyle;
