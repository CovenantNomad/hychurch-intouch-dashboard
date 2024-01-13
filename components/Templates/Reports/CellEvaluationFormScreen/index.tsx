import BlockContainer from '../../../Atoms/Container/BlockContainer';
import Spinner from '../../../Atoms/Spinner';
import EvaluationFormHeader from '../../../Organisms/Reports/EvaluationFormHeader';
import { useQuery } from 'react-query';
import { getEvalutationActivation } from '../../../../firebase/EvaluationForm/evaluationFromSetting';
import BlockCardContainer from '../../../Atoms/Container/BlockCardContainer';
import Skeleton from '../../../Atoms/Skeleton/Skeleton';
import EvaluationCommunitySection from '../../../Organisms/Reports/EvaluationCommunitySection';

type CellEvaluationFormScreenProps = {}

const CellEvaluationFormScreen = ({}: CellEvaluationFormScreenProps) => {
  const { isLoading, isFetching, data: setting } = useQuery('getEvalutationActivation', getEvalutationActivation)

  return (
    <>
      {isLoading || isFetching ? (
        <div className="h-screen bg-white pt-8">
          <Spinner />
        </div>
      ) : (
        <>
          <BlockContainer firstBlock>
            <EvaluationFormHeader setting={setting}/>
          </BlockContainer>
          <>
            {setting && setting.isActive ? (
             <div className="grid grid-cols-1 gap-y-2 lg:grid-cols-4 lg:gap-x-2 ">
                <BlockCardContainer>
                  <EvaluationCommunitySection seasonName={setting.seasonName} communityName='길'/>
                </BlockCardContainer>
                <BlockCardContainer>
                  <EvaluationCommunitySection seasonName={setting.seasonName} communityName='진리'/>
                </BlockCardContainer>
                <BlockCardContainer>
                  <EvaluationCommunitySection seasonName={setting.seasonName} communityName='생명'/>
                </BlockCardContainer>
                <BlockCardContainer>
                  <EvaluationCommunitySection seasonName={setting.seasonName} communityName='빛'/>
                </BlockCardContainer>
              </div>
            ) : (
              <BlockContainer>
                <div className='text-center'>지금은 셀편성기간이 아닙니다</div>
              </BlockContainer>
            )}
          </>
        </>
      )}
    </>
  );
};

export default CellEvaluationFormScreen;
