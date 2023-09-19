import React,  { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
//hooks
import useCellDallantDetail from '../../../../hooks/useCellDallantDetail';
//components
import BlockContainer from '../../../Atoms/Container/BlockContainer';
import CellDallantDetailHeader from '../../../Organisms/Dallant/CellDallantDetailHeader';
import CellDallantDetailTotal from '../../../Organisms/Dallant/CellDallantDetailTotal';
import PrintModal from '../../../Blocks/Modals/PrintModal';
import CellDallantDetailMembers from '../../../Organisms/Dallant/CellDallantDetailMembers';


interface CellDetailSectionProps {}

const CellDetailSection = ({}: CellDetailSectionProps) => {
  const router = useRouter()
  const [ open, setOpen ] = useState(false)
  const [ cellId, setCellId ] = useState<string>("")

  const { isLoading, cellDallant } = useCellDallantDetail(cellId)

  useEffect(() => {
    if (router.query.id) {
      if (typeof router.query.id === 'string'){
        setCellId(router.query.id)
      } else if (Array.isArray(router.query.id)) {
        setCellId(router.query.id[0])
      } else {
        setCellId("")
      }
    }
  }, [])
  
  return (
    <>
      <BlockContainer firstBlock>
        <CellDallantDetailHeader 
          isLoading={isLoading}
          cellDallant={cellDallant}
          open={open}
          setOpen={setOpen}
        />
      </BlockContainer>
      <BlockContainer>
        <CellDallantDetailTotal 
          isLoading={isLoading}
          cellDallant={cellDallant}
        />
      </BlockContainer>
      <BlockContainer>
        <CellDallantDetailMembers 
          isLoading={isLoading}
          cellDallant={cellDallant}
        />
      </BlockContainer>
      <PrintModal open={open} setOpen={setOpen} cellDallant={cellDallant}/>
    </>
  );
};

export default CellDetailSection;
