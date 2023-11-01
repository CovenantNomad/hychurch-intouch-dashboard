import { useEffect, useState } from "react";
import { getOrderStock, getRestaurants } from "../firebase/Dallant/CellDay";
import { useQuery } from "react-query";
import { CombinedOrderStockType } from "../interface/Dallants";

const useOrderStock = () => {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ combinedData, setCombinedData] = useState<CombinedOrderStockType[] | null>(null)
  const { isLoading: isOrderStockLoading, isFetching: isOrderStockFetching, data: orderStock } = useQuery(
    ['getOrderStock'], 
    getOrderStock, 
    {
      staleTime: 5 * 60 * 1000, 
      cacheTime: 10 * 60 * 1000 
    }
  )

  const { isLoading: isRestaurantsLoading, isFetching: isRestaurantsFetching, data: restaurants } = useQuery(
    'getRestaurants', 
    getRestaurants, 
    { 
      staleTime: 15 * 60 * 1000, 
      cacheTime: 20 * 60 * 1000 
    }
  )

  useEffect(() => {
    if (!isRestaurantsLoading && !isRestaurantsFetching && !isOrderStockLoading && !isOrderStockFetching) {

      if (restaurants && orderStock) {
        const combinedData = restaurants.map((restaurant) => {
          const restaurantOrderStock = orderStock
            .filter((item) => item.restaurantId === restaurant.restaurantId)
            .map((item) => ({
              menuId: item.menuId,
              menuName: item.menuName,
              orderUnits: item.orderUnits,
              restaurantId: item.restaurantId
            }));
        
          return {
            orderStock: restaurantOrderStock,
            restaurantId: restaurant.restaurantId,
            restaurantName: restaurant.restaurantName,
            ordered: restaurant.ordered
          };
        });
  
        setCombinedData(combinedData)

      } else {

        setCombinedData(null)
      }

      setIsLoading(false)

    } else {
      setIsLoading(true)
    }
  }, [orderStock, restaurants, isRestaurantsLoading, isRestaurantsFetching, isOrderStockLoading, isOrderStockFetching])

  return {
    restaurants,
    isRestaurantsLoading,
    isRestaurantsFetching,
    isLoading,
    combinedData,
  };
};

export default useOrderStock;