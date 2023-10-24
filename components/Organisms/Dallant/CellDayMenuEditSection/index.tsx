import React, { Dispatch, useState } from 'react';
import { MenuType } from '../../../../interface/Dallants';
import Image from 'next/image';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import UpdateMenuModal from '../../../Blocks/Modals/UpdateMenuModal';
import FoodMenuButton from '../../../Blocks/Menu/CellDay/FoodMenu';
import SimpleModal from '../../../Blocks/Modals/SimpleModal';
import { useMutation, useQueryClient } from 'react-query';
import { deleteMenu } from '../../../../firebase/Dallant/CellDay';

interface CellDayMenuEditSectionProps {
  restaurantId: string
  selectedMenu: MenuType
  setSelectedMenu: Dispatch<React.SetStateAction<MenuType | null>>
}

const CellDayMenuEditSection = ({ restaurantId, selectedMenu, setSelectedMenu }: CellDayMenuEditSectionProps) => {
  const queryClient = useQueryClient();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const { mutateAsync } = useMutation(deleteMenu, {
    onSuccess() {
      queryClient.invalidateQueries(['getRestaurants'])
    },
  })

  const onBackHandler = () => {
    setSelectedMenu(null)
  }

  const onDeleteHandler = async () => {
    await mutateAsync({
      restaurantId,
      menuId: selectedMenu.menuId
    })
    setIsDeleteOpen(false)
    setSelectedMenu(null)
  }

  return (
    <div>
      <div className='flex justify-between pb-6'>
        <button onClick={onBackHandler}>
          <ArrowLeftIcon className={`h-6 w-6 text-black`} />
        </button>
        <FoodMenuButton 
          onUpdateHandler={setIsUpdateOpen}
          onDeleteHandler={setIsDeleteOpen}
        />
      </div>
      <div className=''>
        {selectedMenu.menuImageUrl && <Image src={selectedMenu.menuImageUrl} alt="음식사진" width={1080} height={660}/>}
      </div>
      <div>
        <div className='py-6'>
          <h4 className='text-xl font-semibold mb-2'>{selectedMenu.menuName}</h4>
          {selectedMenu.menuDescription && (
            <p className='text-sm text-gray-500'>{selectedMenu.menuDescription}</p>
          )}
        </div>
        <div className='h-[1px] bg-gray-300' />
        <div className='flex justify-between items-center py-8'>
          <p className='text-lg font-bold'>가격</p>
          <p className='text-lg font-bold'>{selectedMenu.menuPrice} 달란트</p>
        </div>
      </div>

      <UpdateMenuModal
        restaurantId={restaurantId} 
        menu={selectedMenu}
        open={isUpdateOpen}
        setOpen={setIsUpdateOpen}
      />
      <SimpleModal 
        title={'메뉴삭제'}
        description={'해당 메뉴를 삭제하시겠습니까?'}
        actionLabel={'삭제'}
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        actionHandler={onDeleteHandler}
      />
    </div>
  );
};

export default CellDayMenuEditSection;
