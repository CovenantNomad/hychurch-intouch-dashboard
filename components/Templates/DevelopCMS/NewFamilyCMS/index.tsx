import BlockContainer from "../../../Atoms/Container/BlockContainer";
import BirthDataForm from "./_components/BirthDataForm";
import NewFamilyWeeklyCMS from "./_components/NewFamilyWeeklyCMS";
import RegionDataForm from "./_components/RegionDataForm";

type Props = {};

const NewFamilyCMS = ({}: Props) => {
  return (
    <>
      <BlockContainer firstBlock>
        <NewFamilyWeeklyCMS />
      </BlockContainer>
      <BlockContainer>
        <BirthDataForm />
      </BlockContainer>
      <BlockContainer>
        <RegionDataForm />
      </BlockContainer>
    </>
  );
};

export default NewFamilyCMS;
