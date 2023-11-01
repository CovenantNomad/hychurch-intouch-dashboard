import React, { useEffect, useState } from 'react';
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import CellDayRestaurantDetail from '../CellDayRestaurantDetail';
import CellDayRestaurantList from '../CellDayRestaurantList';
import { useQuery } from 'react-query';
import { getRestaurants } from '../../../../firebase/Dallant/CellDay';
import { MenuType, RestaurantType } from '../../../../interface/Dallants';
import CellDayMenuEditSection from '../CellDayMenuEditSection';

interface CellDayRestaurantSectionProps {}

const CellDayRestaurantSection = ({}: CellDayRestaurantSectionProps) => {
  const [ selectedRestaurant, setSelectedRestaurant ] = useState<RestaurantType | null>(null)
  const [ selectedMenu, setSelectedMenu ] = useState<MenuType | null>(null)
  const { isLoading, isFetching, data } = useQuery(
    'getRestaurants', 
    getRestaurants, 
    { 
      staleTime: 5 * 60 * 1000, 
      cacheTime: 10 * 60 * 1000 
    }
  )

  useEffect(() => {
    if (data && selectedRestaurant) {
      const selectRestaurant = data.find(item => item.restaurantId === selectedRestaurant.restaurantId)
      if (selectRestaurant) {
        setSelectedRestaurant(selectRestaurant)

        if (selectedMenu) {
          const selectItem = selectRestaurant.menu.find(item => item.menuId === selectedMenu.menuId)
          if (selectItem) {
            setSelectedMenu(selectItem)
          }
        }
      }

      
    }
  }, [data, selectedRestaurant, selectedMenu])

  return (
    <div className='grid grid-cols-12 gap-x-2'>
      <div className='col-span-4'>
        <BlockContainer>
          <CellDayRestaurantList
            selectedRestaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
            setSelectedMenu={setSelectedMenu}
            isLoading={isLoading}
            isFetching={isFetching}
            data={data}
          />
        </BlockContainer>
      </div>
      <div className='col-span-8'>
        <BlockContainer>
          {selectedRestaurant && selectedMenu ? (
            <CellDayMenuEditSection
              restaurantId={selectedRestaurant.restaurantId} 
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          ) : (
            <CellDayRestaurantDetail 
              selectedRestaurant={selectedRestaurant}
              setSelectedMenu={setSelectedMenu}
            />
          )}
        </BlockContainer>
      </div>
    </div>
  );
};

export default CellDayRestaurantSection;
