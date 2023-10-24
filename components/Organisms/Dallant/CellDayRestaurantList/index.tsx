import React, { Dispatch, useState } from 'react';
import { NoSymbolIcon } from '@heroicons/react/24/outline';
import CreateRestaurantModal from '../../../Blocks/Modals/CreateRestaurantModal';
import { MenuType, RestaurantType } from '../../../../interface/Dallants';

interface CellDayRestaurantListProps {
  selectedRestaurant: RestaurantType | null;
  setSelectedRestaurant: Dispatch<React.SetStateAction<RestaurantType | null>>;
  setSelectedMenu: React.Dispatch<React.SetStateAction<MenuType | null>>;
  isLoading: boolean;
  isFetching: boolean;
  data: RestaurantType[] | null | undefined
}

const CellDayRestaurantList = ({ isLoading, isFetching, data, selectedRestaurant, setSelectedRestaurant, setSelectedMenu }: CellDayRestaurantListProps) => {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <div>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>인터치 맛집</h3>
      <div>
        {isLoading || isFetching ? (
          <div className='mt-6 space-y-4'>
            <div className="animate-pulse space-y-6 py-6 px-10 rounded-xl bg-[#F7F7F7]">
              <div className="h-1.5 w-1/3 bg-slate-200 rounded justify-items-end"></div>
              <div className="h-1.5 w-1/6 bg-slate-200 rounded"></div>
            </div>
            <div className="animate-pulse space-y-6 py-6 px-10 rounded-xl bg-[#F7F7F7]">
              <div className="h-1.5 w-1/3 bg-slate-200 rounded justify-items-end"></div>
              <div className="h-1.5 w-1/6 bg-slate-200 rounded"></div>
            </div>
          </div>
        ) : (
          <div>
            {data ? (
              <div className='mt-6 space-y-4'>
                {data.sort((a, b) => {return Number(a.ordered) - Number(b.ordered)}).map(restaurant => (
                  <div 
                    key={restaurant.restaurantId} 
                    onClick={
                      () => {
                        setSelectedRestaurant(restaurant)
                        setSelectedMenu(null)
                      }
                    }
                    className={`rounded-lg border bg-white px-6 py-5 shadow-sm cursor-pointer ${selectedRestaurant?.restaurantId === restaurant.restaurantId ? 'border-blue-500 border-2 hover:bg-blue-50' : 'border-gray-300 hover:bg-gray-50'} hover:bg-gray-50`}
                  >
                    <p className='text-base font-medium text-gray-900 mb-1'>{restaurant.restaurantName}</p>
                    <p className="truncate text-sm text-gray-500">등록된 메뉴 : {restaurant.menu.length}개</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className='mt-6'>
                <div
                  className="w-full flex flex-col justify-center items-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
                >
                  <NoSymbolIcon className='w-8 h-8 text-gray-400'/>
                  <p className="mt-4 text-sm font-semibold text-gray-900">아직 상점이 없습니다</p>
                  <p className="mt-1 text-sm text-gray-500">아래 버튼을 눌러서 상점을 생성해주세요</p>
                </div>
              </div>
            )}
            <div className='mt-8'>
              <button
                onClick={() => setIsOpen(true)}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 "
              >
                상점 생성
              </button>
            </div>
            <CreateRestaurantModal 
              open={isOpen} 
              setOpen={setIsOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CellDayRestaurantList;
