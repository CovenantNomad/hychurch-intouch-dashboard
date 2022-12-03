import Link from 'next/link';
import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FindCellQuery } from '../../../graphql/generated';
import { SimpleUser, TabProps } from '../../../pages/organizations/[id]';
import MemberStatic from './MemberStatic';

interface CellInfomationProps {
  donutData: {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        hoverOffset: number;
    }[];
  }
  tabs: TabProps[]
  onClickHandler: (name: string) => void
  isLoading: boolean
  data: FindCellQuery | undefined
  filterMembers: SimpleUser[]
}

const CellInfomation = ({ donutData, tabs, onClickHandler, isLoading, data, filterMembers }: CellInfomationProps) => {

  // const groupByYears = data?.findCell.members.reduce((group: any, member) => {
  //   const { birthday } = member
  //   const year = birthday?.split("-")[0]
  //   if (year) {
  //     group[year] = group[year] ?? [];
  //     group[year] += 1
  //   }
  //   return group
  // }, {})
  
  // const labels = Object.keys(groupByYears)

  // const dataset = labels.map(item => groupByYears[item].length)

  // const barData = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       data: dataset,
  //       backgroundColor: 'rgb(54, 162, 235)',
  //     }
  //   ]
  // };

  return (
    <div>
      <div className='grid grid-cols-4 gap-4 mb-12'>
        <div className='col-span-1 px-2 pt-4 pb-2 shadow-sm border border-slate-200 bg-gray-100'>
          <MemberStatic tabs={tabs}/>
        </div>
        <div className='col-span-1 px-2 pt-4 pb-2 shadow-sm border border-slate-200 bg-gray-100 flex flex-col'>
          <h4 className='font-bold pb-4 tracking-wide'>성별 구성</h4>
          <div className='relative bg-white rounded-md p-4 h-full'>
            <Doughnut 
              data={donutData} 
              options={{ responsive: true, maintainAspectRatio: true }} 
            />
          </div>
        </div>
        <div className='shadow-sm col-span-2 pt-4 pb-2 px-2 border border-slate-200 bg-gray-100 flex flex-col'>
          <h4 className='font-bold pb-4 tracking-wide'>연령별 구성</h4>
          <div className='relative bg-white rounded-md h-full'>
            {/* <Bar 
              data={barData} 
              options={{ 
                responsive: true, 
                plugins: {
                  legend: {
                    display: false
                  }
                },
                layout: {
                  padding: {
                    top: 20, bottom:10, left: 20, right: 20
                  }
                } 
              }} 
            /> */}
          </div>
        </div>
      </div>

      <section className='grid grid-cols-4 gap-4 mb-12'>
        <div className='shadow-sm col-span-3 pt-4 pb-2 px-2 border border-slate-200 bg-gray-100 flex flex-col'>
          <h4 className='font-bold pb-4'>전체 출석 동향</h4>
          <div className='relative bg-white rounded-md h-full'>
            {/* <Bar data={barData} options={{ responsive: true }} /> */}
          </div>
        </div>
        <div className='shadow-sm col-span-1 pt-4 pb-2 px-2 border border-slate-200 bg-gray-100 flex flex-col'>
          <h4 className='font-bold pb-4'>셀원별 출석 동향</h4>
          <div className='relative bg-white rounded-md h-full'>
            {/* <Bar data={barData} options={{ responsive: true }} /> */}
          </div>
        </div>
      </section>

      <h2 className="text-lg font-medium text-gray-900">Cell Members</h2>
      {/* mobile */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
          defaultValue={'All'}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      {/* desktop */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => onClickHandler(tab.name)}
                disabled={isLoading || data === undefined}
                className={`${tab.current ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.name}
                <span
                  className={`${tab.current ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-900'}
                    hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block
                  `}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Index
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Gender
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      PhoneNumber
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Birthday
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                {!isLoading && filterMembers !== undefined ? (
                  <tbody className="bg-white">
                    {filterMembers.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0).map((person, personIdx) => (
                      <tr key={personIdx} className={personIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{personIdx+1}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.gender === 'MAN' ? "형제" : "자매"}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.phone}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.birthday}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link 
                            href={{
                              pathname: `/members/${person.id}`,
                              query: {userInfo: JSON.stringify(person)}
                            }}
                            as={`/members/${person.id}`}
                          >
                            <a  className="text-indigo-600 hover:text-indigo-900">
                              Edit<span className="sr-only">, {person.name}</span>
                            </a>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  // Table 밑에 <div> 못들어감 수정해야함
                  <div> 로딩중...</div>
                )
              }
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CellInfomation;
