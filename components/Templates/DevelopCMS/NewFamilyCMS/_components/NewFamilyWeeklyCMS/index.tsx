import GeneralDataForm from "./_components/GeneralDataForm";

type Props = {};

const NewFamilyWeeklyCMS = ({}: Props) => {
  return (
    <div>
      <h1 className="mb-5 text-lg font-semibold">주간데이터 입력 사항</h1>
      <GeneralDataForm />
    </div>
  );
};

export default NewFamilyWeeklyCMS;
