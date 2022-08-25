import { useMemo } from "react"

interface UsePaginationProps {
  totalPageCount: number
  siblingCount: number
  currentPage: number
}

export const usePagination = ({ 
  totalPageCount,
  siblingCount = 2, 
  currentPage
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5
    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    const range = (start: number, end: number) => {
      let length = end - start + 1;

      return Array.from({ length }, (_, idx) => idx + start);
    };

    //case1
    if (totalPageCount <= totalPageNumbers) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    //case2
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, totalPageNumbers);

      return [...leftRange, "DOTS", totalPageCount]
    }

    //case3
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(
        totalPageCount - totalPageNumbers + 1,
        totalPageCount
      );

      return [firstPageIndex, "DOTS", ...rightRange]
    }

    //case4
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
    }


  }, [totalPageCount, siblingCount, currentPage])

  return paginationRange
}