import { useMemo } from 'react';

// Adapted from this tutorial: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({
  totalCount,
  pageSize = 10,
  siblingCount = 1,
  currentPage,
  separator = '...',
}) => {
  const paginationRange = useMemo(() => {
    const pageCount = Math.ceil(totalCount / pageSize);
    const columnsDisplayed = siblingCount + 5;

    if (columnsDisplayed >= pageCount) return range(1, pageCount);

    const leftIndex = Math.max(currentPage - siblingCount, 1);
    const rightIndex = Math.min(currentPage + siblingCount, pageCount);

    const shouldShowLeftDots = leftIndex > 2;
    const shouldShowRightDots = rightIndex < pageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = pageCount;

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftIndex, rightIndex);
      return [
        firstPageIndex,
        separator,
        ...middleRange,
        separator,
        lastPageIndex,
      ];
    }

    if (shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, separator, pageCount];
    }

    if (shouldShowLeftDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(pageCount - rightItemCount + 1, pageCount);
      return [firstPageIndex, separator, ...rightRange];
    }
  }, [totalCount, pageSize, siblingCount, currentPage, separator]);

  return paginationRange;
};

export default usePagination;
