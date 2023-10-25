import React from 'react';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import { CommunityType } from '../../../../interface/cell';
import OrderStateListItem from '../../../Blocks/ListItems/CellDay/OrderStateListItem';

interface CellDayOrderCommunitySectionProps {
  community: CommunityType;
}

const CellDayOrderCommunitySection = ({ community: { communityName, cellList} }: CellDayOrderCommunitySectionProps) => {
  return (
    <div>
      <div>
        <p className={`text-lg font-semibold`}>{communityName}</p>
      </div>
      <div>
        {cellList ? (
          <div className='py-5'>
            <div className='space-y-3'>
              {cellList.map(cell => <OrderStateListItem key={cell.id} cellId={cell.id} cellName={cell.name} />)}
            </div>
          </div>
        ) : (
          <div className='py-5'>
            <EmptyStateSimple />
          </div>
        )}
      </div>
    </div>
  );
};

export default CellDayOrderCommunitySection;
