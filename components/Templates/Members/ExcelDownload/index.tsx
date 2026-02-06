import BlockContainer from "../../../Atoms/Container/BlockContainer";
import DownloadPage from "./_components/DownloadPage";

type Props = {};

const ExcelDownload = ({}: Props) => {
  return (
    <BlockContainer firstBlock>
      <DownloadPage />
    </BlockContainer>
  );
};

export default ExcelDownload;
