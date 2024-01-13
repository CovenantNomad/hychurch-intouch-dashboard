import React, { forwardRef } from 'react';

type CellEvaluationFormPrintHeaderProps = {
  cellName: string;
}

const CellEvaluationFormPrintHeader = forwardRef<HTMLDivElement, CellEvaluationFormPrintHeaderProps>((props, ref) => {
  const { cellName } = props

  return (
    <div className='grid grid-cols-4 gap-4 py-3 print:break-before-page' ref={ref}>
      <h1 className='col-span-1 text-lg font-bold text-end border px-4 py-1'>셀이름: {cellName}</h1>
    </div>
  )
})

CellEvaluationFormPrintHeader.displayName = "CellEvaluationFormHeader";

export default CellEvaluationFormPrintHeader;
