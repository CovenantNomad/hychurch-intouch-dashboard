import React from 'react';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import useOrderStock from '../../../../hooks/useOrderStock';
import OrderStockListItem from '../../../Blocks/ListItems/CellDay/OrderStockListItem/OrderStockListItem';

interface CellDayOrderStockSectionProps {}

const CellDayOrderStockSection = ({}: CellDayOrderStockSectionProps) => {
  const { restaurants, isRestaurantsLoading, isRestaurantsFetching, isLoading, combinedData } = useOrderStock()

  console.log(combinedData)

  return (
    <div>
      {isRestaurantsLoading || isRestaurantsFetching ? (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          <div className='animate-pulse w-full h-14 bg-gray-200 rounded-md' />
          <div className='animate-pulse w-full h-14 bg-gray-200 rounded-md' />
          <div className='animate-pulse w-full h-14 bg-gray-200 rounded-md' />
          <div className='animate-pulse w-full h-14 bg-gray-200 rounded-md' />
          <div className='animate-pulse w-full h-14 bg-gray-200 rounded-md' />
        </div>
      ) : (
        <div>
          {restaurants ? (
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8'>
              {restaurants.sort((a, b) => {return Number(a.ordered) - Number(b.ordered)}).map(restaurant => (
                <div 
                  key={restaurant.restaurantId}
                  className='border px-4 py-4'
                >
                  <h5 className='text-lg font-bold'>{restaurant.restaurantName}</h5>
                  <div className='mt-4'>
                    {isLoading ? (
                      <div className='space-y-3'>
                        <div className='animate-pulse flex justify-between py-4 px-4 border border-gray-300 rounded-md'>
                          <div className='w-1/6 h-1.5 bg-gray-200 rounded-md'/>
                          <div className='w-1/4 h-1.5 bg-gray-200 rounded-md'/>
                        </div>
                        <div className='animate-pulse flex justify-between py-4 px-4 border border-gray-300 rounded-md'>
                          <div className='w-1/6 h-1.5 bg-gray-200 rounded-md'/>
                          <div className='w-1/4 h-1.5 bg-gray-200 rounded-md'/>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {combinedData ? (
                          <div>
                            {combinedData.filter(item => item.restaurantId === restaurant.restaurantId)[0].orderStock.length !== 0 ? (
                              <div className='space-y-4'>
                              {combinedData.filter(item => item.restaurantId === restaurant.restaurantId)[0].orderStock.map((order) => (
                                <OrderStockListItem key={order.menuId} menuName={order.menuName} orderUnits={order.orderUnits} />
                              ))}
                              </div>
                            ) : (
                              <EmptyStateSimple />
                            )}
                          </div>
                        ) : (
                          <div>
                            <EmptyStateSimple />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <EmptyStateSimple />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CellDayOrderStockSection;
