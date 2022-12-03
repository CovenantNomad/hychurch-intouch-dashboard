import React from "react"
import { usePagination } from "../../../hooks/usePagination"

interface PaginationProps {
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalCount: number
}

const Pagination = ({ pageSize, setPageSize, currentPage, setCurrentPage, totalCount }: PaginationProps) => {

  const totalPageCount = Math.ceil(totalCount / pageSize)
  const paginationRange = usePagination({totalPageCount, siblingCount: 2, currentPage})


  const onLimitHandler = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.currentTarget.value))
  }

  if (currentPage === 0 || paginationRange!.length < 2) {
    return null;
  }

  return (
    <div>
      {/* mobile */}
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      {/* desktop */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center">
          <span className="block">View</span>
          <select
            id="limit"
            name="limit"
            onChange={onLimitHandler}
            value={pageSize}
            className="mt-1 block py-1 px-3 mx-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
            <option value={48}>48</option>
          </select>
          <span>person per page</span>
        </div>
        <div className="">
          <button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 border-r-0"
          >
            <span className="sr-only">Previous</span>
            &lt;
          </button>
          <ul className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {paginationRange?.map((pageNumber) => {
              if (pageNumber === "DOTS") {
                return <li className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">&#8230;</li>;
              }
              if (typeof pageNumber === "number") {
                return (
                  <li
                    key={pageNumber}
                    className={`${currentPage === pageNumber ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"} relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </li>
                );
              }
            })}
          </ul>
          <button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage === totalPageCount}
            className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 border-l-0"
          >
            <span className="sr-only">Next</span>
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination