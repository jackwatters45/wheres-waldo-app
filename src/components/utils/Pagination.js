import React from 'react';
import usePagination from './usePagination';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import styled from 'styled-components';

// Adapted from this tutorial: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/

const PaginationContainer = styled.ul`
  display: flex;
  padding 5px 10px;
  gap: 8px;
  border-radius: 4px;
  margin-top: 10px;
  align-items: center;
  background-color: var(--card-background-color);
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
`;

const PaginationElement = styled.li`
  display: flex;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.055);
    border-radius: 4px;
  }
`;

const PageNumber = styled(PaginationElement)`
  font-size: 32px;
  padding: 0 16px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.025);
`;

const Pagination = ({ onPageChange, totalCount, currentPage }) => {
  const paginationRange = usePagination({ currentPage, totalCount });

  if (currentPage === 0 || paginationRange.length < 2) return;

  const onNext = () => {
    if (currentPage < paginationRange.length) onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const getSelected = (pageNumber) => {
    if (currentPage === pageNumber) return 'var(--empty-font-color)';
  };

  return (
    <PaginationContainer>
      <PaginationElement onClick={onPrevious}>
        <Icon path={mdiChevronLeft} size={1.2} />
      </PaginationElement>
      {paginationRange.map((pageNumber) => (
        <PageNumber
          onClick={() => onPageChange(pageNumber)}
          style={{ backgroundColor: getSelected(pageNumber) }}
        >
          {pageNumber}
        </PageNumber>
      ))}
      <PaginationElement onClick={onNext}>
        <Icon path={mdiChevronRight} size={1.2} />
      </PaginationElement>
    </PaginationContainer>
  );
};

export default Pagination;
