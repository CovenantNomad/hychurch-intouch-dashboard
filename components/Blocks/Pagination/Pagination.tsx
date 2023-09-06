import React from "react"
import { usePagination } from "../../../hooks/usePagination"
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'

interface PaginationProps {
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalCount: number
}

const Pagination = ({ pageSize, setPageSize, currentPage, setCurrentPage, totalCount }: PaginationProps) => {

  const paginationRange = usePagination({ pageSize, totalCount, siblingCount: 2, currentPage })

  // const onLimitHandler = (e: React.SyntheticEvent<HTMLSelectElement>) => {
  //   setPageSize(Number(e.currentTarget.value))
  // }

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          className="inline-flex items-center border-t-2 border-transparent pr-1 mt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:hidden"
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex md:gap-x-4">
        {paginationRange?.map((page, index) => {
          if (page === "...") {
            return (
              <button
                key={index}
                type="button"
                disabled
                className="inline-flex items-center justify-center w-8 h-8 mt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                {page}
              </button>
            )
          } else {
            return (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentPage(Number(page))}
                className={`inline-flex items-center justify-center w-8 h-8 mt-4 text-sm font-medium text-gray-500 ${currentPage === page && 'bg-gray-200 text-gray-700 rounded-full'} hover:border-gray-300 hover:text-gray-700`}
              >
                {page}
              </button>
            )
          }
        })}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          disabled={currentPage === Math.ceil(totalCount / pageSize)}
          onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(totalCount / pageSize)))}
          className="inline-flex items-center border-t-2 border-transparent pl-1 mt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:hidden"
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}

export default Pagination