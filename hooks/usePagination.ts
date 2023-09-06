import { useMemo } from "react"

interface UsePaginationProps {
  pageSize: number
  totalCount: number
  siblingCount: number
  currentPage: number
}

export const DOTS = "...";

const range = (start: number, end: number) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({ 
  pageSize,
  currentPage,
  siblingCount = 2, 
  totalCount,
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumber = siblingCount + 5
    const totalPageCount = Math.ceil(totalCount / pageSize)

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;


    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (totalPageNumber >= totalPageCount) {
      return range(1, totalPageCount)
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

  }, [totalCount, siblingCount, currentPage, pageSize])

  return paginationRange
}