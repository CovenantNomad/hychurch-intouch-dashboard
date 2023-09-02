import React, { useEffect, useState } from 'react';
import { FindCellListsQuery, FindCellListsQueryVariables, useFindCellListsQuery } from '../../../../graphql/generated';
import graphlqlRequestClient from '../../../../client/graphqlRequestClient';
import { FIND_CELL_LIMIT } from '../../../../constants/constant';
import { CellType, SpecialCellIdType } from '../../../../interface/cell';
import { getFirstName } from '../../../../utils/utils';

interface ManualSubmissionSectionProps {}

interface selectedListType {
  id: string;
  name: string;
  community: string;
  isSelected: boolean;
  isSubmitted: boolean;
}

const ManualSubmissionSection = ({}: ManualSubmissionSectionProps) => {
  const [ selectedList, setSelectedList ] = useState<selectedListType[]>([])
  const { isLoading, data } = useFindCellListsQuery<
    FindCellListsQuery,
    FindCellListsQueryVariables
  >(
    graphlqlRequestClient,
    {
      limit: FIND_CELL_LIMIT,
    },
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000 * 24,
    }
  );

  useEffect(() => {
    if (data) {
      const filterList = data?.findCells.nodes
        .filter(
          (cell) =>
            !cell.id.includes(SpecialCellIdType.NewFamily) &&
            !cell.id.includes(SpecialCellIdType.Blessing) &&
            !cell.id.includes(SpecialCellIdType.Renew)
        )
        .sort((a, b) => {
          if (a.name > b.name) return 1;
          else if (b.name > a.name) return -1;
          else return 0;
        })
        .map(cell => {
          return {
            id: cell.id,
            name: cell.name,
            community: cell.community,
            isSelected: false,
            isSubmitted: false,
          }
        })
      setSelectedList(filterList)
    }
  }, [data]);

  const onSelectedHandler = (cellId: string) => {
    setSelectedList(selectedList.map(item => item.id === cellId ? {...item, isSelected: !item.isSelected} : item))
  }


  return (
    <div>
      <h6 className="text-xl font-bold pb-6">수기작성 제출 셀</h6>
      <div className='grid grid-cols-9 gap-4'>
        {selectedList.map(cell => (
          <button key={cell.id} className='flex flex-col items-center bg-red-50' disabled={cell.isSubmitted} onClick={() => onSelectedHandler(cell.id)}>
            <div className="h-8 w-8 flex justify-center items-center rounded-full bg-gray-50 ring-2 ring-white mb-2">
              {cell.isSubmitted ? (
                <div>제출</div>
              ) : (
                <div>
                  {cell.isSelected ? (
                    <div>체크</div>
                  ) : (
                    <span className="text-xs font-medium leading-none">
                      {getFirstName(cell.name)}
                    </span>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs font-medium leading-none">{cell.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManualSubmissionSection;
