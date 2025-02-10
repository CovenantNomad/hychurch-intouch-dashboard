import BlockContainer from "../../../Atoms/Container/BlockContainer";
import BarnabasProfileBody from "./_components/BarnabasProfileBody";
import BarnabasProfileHeader from "./_components/BarnabasProfileHeader";

type Props = {
  id: string;
  name: string;
  cohort: string;
  goBackHandler: () => void;
};

const BarnabasProfile = ({id, name, cohort, goBackHandler}: Props) => {
  return (
    <div className="w-full pt-2 px-2">
      <BarnabasProfileHeader
        id={id}
        name={name}
        cohort={cohort}
        goBackHandler={goBackHandler}
      />
      <BlockContainer>
        <BarnabasProfileBody id={id} />
      </BlockContainer>
    </div>
  );
};

export default BarnabasProfile;
