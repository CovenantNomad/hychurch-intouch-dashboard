import React, { forwardRef, useEffect, useRef, useState } from 'react';
import EvaluationFormPrintCard from '../../../Organisms/Reports/EvaluationFormPrintCard';
import { FindCellQuery, RoleType } from '../../../../graphql/generated';

type CellEvaluationFormPrintTemplateProps = {
  cell: FindCellQuery | undefined;
}

const CellEvaluationFormPrintTemplate = forwardRef<HTMLDivElement, CellEvaluationFormPrintTemplateProps>((props, ref) => {
  const { cell } = props
  const [numPages, setNumPages] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  const additionalMargin = numPages > 1 ? '40px' : '0';


  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.getBoundingClientRect().height;
      const numPages = Math.ceil(contentHeight / window.innerHeight);
      setNumPages(numPages);
    }
  }, [cell]);

  return (
    <main ref={ref} className='h-screen m-0 p-0'>
      {/* <style>
        {`
          @media print {
            .page-break {
              page-break-before: always;
              margin-top: 40px;
            }
          }
        `}
      </style> */}
      <div className='px-4' ref={contentRef}>
        <div className='grid grid-cols-4 gap-4 py-3'>
          <h1 className='col-span-1 text-lg font-bold text-end border px-4 py-1'>셀이름: {cell?.findCell.name}</h1>
        </div>
        <div className='grid grid-cols-4 grid-rows-2 gap-4'>
          {cell?.findCell.members
            .filter((member) => !member.roles.includes(RoleType.CellLeader))
            .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

            .map((member) => (
            <div key={member.id} className='col-span-1 row-span-1' style={{ pageBreakInside: 'avoid' }}>
              <EvaluationFormPrintCard userId={member.id} name={member.name} />
            </div>
          ))}
        </div>
        {/* <div className='print:break-before-page'/>
        <div className='grid grid-cols-4 gap-4 py-3'>
          <h1 className='col-span-1 text-lg font-bold text-end border px-4 py-1'>셀이름: {cell?.findCell.name}</h1>
        </div>
        <div className='grid grid-cols-4 grid-rows-2 gap-4'>
          {cell?.findCell.members
            .filter((member) => !member.roles.includes(RoleType.CellLeader))
            .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
            .slice(8)
            .map((member) => (
            <div key={member.id} className='col-span-1 row-span-1'>
              <EvaluationFormPrintCard userId={member.id} name={member.name}/>
            </div>
          ))}
        </div> */}
      </div>
    </main>
  );
})

CellEvaluationFormPrintTemplate.displayName = "CellEvaluationForm";

export default CellEvaluationFormPrintTemplate;
