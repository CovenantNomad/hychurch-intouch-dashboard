import { useState } from 'react';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import SubmitListSection from '../../../Organisms/Reports/SubmitListSection';
import Spinner from '../../../Atoms/Spinner';

type CellEvaluationFormScreenProps = {}

const CellEvaluationFormScreen = ({}: CellEvaluationFormScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <BlockContainer firstBlock>
            <div>ffff</div>
          </BlockContainer>
        </>
      )}
    </>
  );
};

export default CellEvaluationFormScreen;
