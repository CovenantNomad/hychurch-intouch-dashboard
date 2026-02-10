import {useMemo} from "react";
import {useQuery} from "react-query";
import {getIntegratedCommunities} from "../../../../firebase/CMS/CommunityCMS";
import {getEvalutationActivation} from "../../../../firebase/EvaluationForm/evaluationFromSetting";
import {sortCommunityNames} from "../../../../utils/utils";
import BlockCardContainer from "../../../Atoms/Container/BlockCardContainer";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import Spinner from "../../../Atoms/Spinner";
import EvaluationCommunitySection from "../../../Organisms/Reports/EvaluationCommunitySection";
import EvaluationFormHeader from "../../../Organisms/Reports/EvaluationFormHeader";

type CellEvaluationFormScreenProps = {};

const CellEvaluationFormScreen = ({}: CellEvaluationFormScreenProps) => {
  const {isLoading: isSettingLoading, data: setting} = useQuery(
    "getEvalutationActivation",
    getEvalutationActivation,
  );

  const {isLoading: isCommunityLoading, data: communities} = useQuery(
    ["getIntegratedCommunities"],
    () => getIntegratedCommunities(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    },
  );

  const isLoading = isSettingLoading || isCommunityLoading;

  const orderedCommunities = useMemo(() => {
    if (!communities) return [];
    return [...communities].sort(sortCommunityNames);
  }, [communities]);

  return (
    <>
      {isLoading ? (
        <div className="h-screen bg-white pt-8">
          <Spinner />
        </div>
      ) : (
        <>
          <BlockContainer firstBlock>
            <EvaluationFormHeader setting={setting} />
          </BlockContainer>
          <>
            {setting && setting.isActive && communities ? (
              <div className="grid grid-cols-1 gap-y-2 lg:grid-cols-5 lg:gap-x-2 ">
                {(orderedCommunities ?? []).map((c) => (
                  <BlockCardContainer key={c.id}>
                    <EvaluationCommunitySection
                      seasonName={setting.seasonName}
                      communityName={c.name}
                    />
                  </BlockCardContainer>
                ))}
              </div>
            ) : (
              <BlockContainer>
                <div className="text-center">지금은 셀편성기간이 아닙니다</div>
              </BlockContainer>
            )}
          </>
        </>
      )}
    </>
  );
};

export default CellEvaluationFormScreen;
