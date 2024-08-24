import BlockContainer from "../../../Atoms/Container/BlockContainer";
import ServiceWeeklyCMS from "./_components/WeeklyCMS";

type Props = {};

const ServiceCMS = ({}: Props) => {
  return (
    <BlockContainer firstBlock>
      <ServiceWeeklyCMS />
    </BlockContainer>
  );
};

export default ServiceCMS;
