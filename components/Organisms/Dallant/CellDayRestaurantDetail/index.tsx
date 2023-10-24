import { NoSymbolIcon } from '@heroicons/react/24/outline';
import React, { Dispatch, useState } from 'react';
import { MenuType, RestaurantType } from '../../../../interface/Dallants';
import CreateMenuModal from '../../../Blocks/Modals/CreateMenuModal';
import Image from 'next/image';

interface CellDayRestaurantDetailProps {
  selectedRestaurant: RestaurantType | null
  setSelectedMenu: Dispatch<React.SetStateAction<MenuType | null>>
}

const CellDayRestaurantDetail = ({ selectedRestaurant, setSelectedMenu }: CellDayRestaurantDetailProps) => {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <div>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>{selectedRestaurant === null ? '메뉴판': selectedRestaurant.restaurantName+' '+'메뉴판'}</h3>
      <div>
        {selectedRestaurant === null ? (
           <div className='mt-6'>
            <div
              className="w-full flex flex-col justify-center items-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
            >
              <NoSymbolIcon className='w-8 h-8 text-gray-400'/>
              <p className="mt-4 text-sm font-semibold text-gray-900">상점을 선택해주세요</p>
              <p className="mt-1 text-sm text-gray-500">상점을 선택하고 메뉴를 생성해주세요</p>
            </div>
          </div>
        ) : (
          <div className='mt-6'>
            {selectedRestaurant.menu.length !== 0 ? (
              <div className='grid grid-cols-2 gap-6'>
                {selectedRestaurant.menu.map(item => (
                  <div 
                    key={item.menuId}
                    onClick={() => setSelectedMenu(item)}
                    className='flex justify-between items-center border px-4 py-3 gap-x-3 cursor-pointer hover:border-blue-600'
                  >
                    <div className='flex-1'>
                      <p className='text-lg font-bold'>{item.menuName}</p>
                      {item.menuDescription && <p className='text-sm text-gray-500'>{item.menuDescription}</p>}
                      <div className='mt-2'>
                        <p className='text-xl'>{item.menuPrice} 달란트</p>
                      </div>
                    </div>
                    {item.menuImageUrl && (
                      <div className=''>
                        <Image src={item.menuImageUrl} width={180} height={110} alt="이미지 사진" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="w-full flex flex-col justify-center items-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
              >
                <NoSymbolIcon className='w-8 h-8 text-gray-400'/>
                <p className="mt-4 text-sm font-semibold text-gray-900">아직 메뉴가 없습니다</p>
                <p className="mt-1 text-sm text-gray-500">아래 버튼을 눌러서 새로운 메뉴를 추가해주세요</p>
              </div>
            )}
            <div className='mt-8'>
              <button
                onClick={() => setIsOpen(true)}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 "
              >
                메뉴 추가
              </button>
            </div>
            <CreateMenuModal
              restaurantId={selectedRestaurant.restaurantId} 
              open={isOpen}
              setOpen={setIsOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CellDayRestaurantDetail;
