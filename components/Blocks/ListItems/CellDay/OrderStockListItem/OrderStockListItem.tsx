import React from 'react';

interface OrderStockListItemProps {
  menuName: string
  orderUnits: number
}

const OrderStockListItem = ({ menuName, orderUnits }: OrderStockListItemProps) => {
  return (
    <div
      className="flex justify-between items-center py-4 px-4 border border-gray-300 rounded-md"
    >
      <span className="block font-bold">
        {menuName}
      </span>
      <div className="flex items-center gap-x-2">
        <span className="text-sm">주문수량 : </span>
        <span className="text-lg font-bold">{orderUnits}개</span>
      </div>
    </div>
  );
};

export default OrderStockListItem;
