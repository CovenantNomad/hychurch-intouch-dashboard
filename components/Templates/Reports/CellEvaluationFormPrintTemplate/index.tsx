import React, { forwardRef } from 'react';
import EvaluationFormPrintCard from '../../../Organisms/Reports/EvaluationFormPrintCard';
import { IndividualEvaluationDataType } from '../../../../interface/EvaluationFormTypes';

type CellEvaluationFormPrintTemplateProps = {
  cellName: string;
  memberList: IndividualEvaluationDataType[]
}

const CellEvaluationFormPrintTemplate = forwardRef<HTMLDivElement, CellEvaluationFormPrintTemplateProps>((props, ref) => {
  const { cellName, memberList } = props

  return (
    <div ref={ref} className='h-screen m-0 p-0'>
      <div className='px-4'>
        <table className='w-full'>
          <thead>
            <tr style={{ height: '12px' }}> {/* 공백 행 추가 */}
              <td colSpan={4}></td>
            </tr>
            <tr className='flex'>
              <th scope="col" className='w-1/4 text-right px-1'>
                <span className='inline-block w-full px-4 py-1 border'>셀이름: {cellName}</span>
              </th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            <tr style={{ height: '10px' }}> {/* 공백 행 추가 */}
              <td colSpan={4}></td>
            </tr>
          </thead>
          <tbody>
            {memberList
              .sort((a, b) => {
                const rankA = a.meeting.replace('등급', '');
                const rankB = b.meeting.replace('등급', '');

                if (rankA !== rankB) {
                  return parseInt(rankA) - parseInt(rankB);
                }

                // 같은 등급 내에서 이름으로 정렬
                return a.userName.localeCompare(b.userName);
              })
              .map((member, index) => (
                // 행을 4개의 셀로 분할
                index % 4 === 0 && (
                  <tr key={member.userId} className='flex'>
                    {memberList.slice(index, index + 4).map((item) => (
                      <td key={item.userId} scope="col" className='w-1/4 align-top px-1 py-1' style={{ pageBreakInside: 'avoid' }}>
                        <EvaluationFormPrintCard member={item} />
                      </td>
                    ))}
                  </tr>
                )
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
})

CellEvaluationFormPrintTemplate.displayName = "CellEvaluationForm";


export default CellEvaluationFormPrintTemplate;
