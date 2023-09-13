import React from 'react';
import { SearchUsersQuery } from '../../../../graphql/generated';
import Spinner from '../../../Atoms/Spinner';
import DallantSearchListItem from '../../../Blocks/ListItems/DallantSearchListItem';

interface DallantSearchResultProps {
  isLoading: boolean;
  searchResults: SearchUsersQuery | undefined;
}

const DallantSearchResult = ({ isLoading, searchResults }: DallantSearchResultProps) => {

  return (
    <div>
      {isLoading ? (
        <div className='py-8'>
          <Spinner />
        </div>
      ) : (
        <div>
          {searchResults !== undefined ? (
            <div>
              {searchResults?.findUsers.totalCount === 0 ? (
                <div className="flex justify-center py-8">
                  <p>해당 청년은 등록되어 있지 않습니다</p>
                </div>
              ) : (
                <div className="pt-8 grid grid-cols-4 gap-4">
                  {searchResults.findUsers.nodes.map((user, index) => (
                    <DallantSearchListItem
                      key={user.id}
                      member={user}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className='pb-8'><span className='sr-only'>검색어를 입력해주세요</span></div>
          )}
        </div>
      )}
    </div>
  );
};

export default DallantSearchResult;
