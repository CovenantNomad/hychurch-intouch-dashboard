import BlockContainer from '../../../Atoms/Container/BlockContainer';
import Spinner from '../../../Atoms/Spinner';
import EvaluationFormHeader from '../../../Organisms/Reports/EvaluationFormHeader';
import { useQuery } from 'react-query';
import { getEvalutationActivation } from '../../../../firebase/EvaluationForm/evaluationFrom';

type CellEvaluationFormScreenProps = {}

const CellEvaluationFormScreen = ({}: CellEvaluationFormScreenProps) => {
  const { isLoading, isFetching, data } = useQuery('getEvalutationActivation', getEvalutationActivation)

  return (
    <>
      {isLoading || isFetching ? (
        <div className="w-full h-screen flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <BlockContainer firstBlock>
            <EvaluationFormHeader setting={data}/>
          </BlockContainer>
        </>
      )}
    </>
  );
};

export default CellEvaluationFormScreen;
