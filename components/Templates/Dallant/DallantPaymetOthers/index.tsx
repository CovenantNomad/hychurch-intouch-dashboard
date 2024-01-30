import React, { useState } from 'react';
import { CellListWithMemberType } from '../../../../interface/cell';
import { SearchUsersQuery, SearchUsersQueryVariables, useSearchUsersQuery } from '../../../../graphql/generated';
import graphlqlRequestClient from '../../../../client/graphqlRequestClient';
import MemberSearchBar from '../../../Organisms/Members/MemberSearchBar';
import DallantSearchResult from '../../../Organisms/Dallant/DallantSearchResult';
import SimpleAlerts from '../../../Atoms/Alerts/SimpleAlerts';
import OthersDallantPayment from '../../../Organisms/Dallant/OthersDallantPayment';

interface DallantPaymetOthersProps {
  cells: CellListWithMemberType[]
}

const DallantPaymetOthers = ({cells}: DallantPaymetOthersProps) => {
  const [ keyword, setKeyword] = useState<string | null>(null);
  const { isLoading, data } = useSearchUsersQuery<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >(
    graphlqlRequestClient,
    {
      keyword,
    },
    {
      enabled: !!keyword,
    }
  );

  return (
    <div>
      <SimpleAlerts 
        title={"꼭! 일반셀에 포함되지 않은 청년만 입력해주세요!"} 
        description={'[청년검색] → [달란트 지급목록 등록] → [달란트 입력] 순으로 진행해주세요'} 
      />
      <div className='py-4'/>
      <MemberSearchBar setKeyword={setKeyword} />
      <DallantSearchResult isLoading={isLoading} searchResults={data}/>
      <div className='py-4'/>
      <OthersDallantPayment />
    </div>
  );
};

export default DallantPaymetOthers;
