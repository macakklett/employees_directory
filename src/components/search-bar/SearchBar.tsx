import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '@/store';
import { selectFilterText } from '@/features/employees/employeesSelectors';
import { setFilter } from '@/features/employees/employeesSlice';
import ModalSort from '../modal/ModalSort';

import './searchBar.scss';

const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpenModalSort, setIsOpenModalSort] = useState(false);

  const filterText = useSelector(selectFilterText);
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterText = event.target.value;
    dispatch(setFilter(newFilterText));

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('searchText', newFilterText);
    setSearchParams(newSearchParams);
  };

  const clearFilter = () => {
    dispatch(setFilter(''));
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('searchText');
    setSearchParams(newSearchParams);
  };

  const openModalSort = () => setIsOpenModalSort(true);
  const closeModalSort = () => setIsOpenModalSort(false);

  return (
    <>
      {isOpenModalSort && <ModalSort closeModalSort={closeModalSort} />}
      <div className="search-bar">
        <i className="fas fa-search" />
        <input
          type="text"
          placeholder="Search by name, tag, email..."
          value={filterText}
          onChange={handleChange}
        />
        {filterText.length > 0 ? (
          <i className="fas fa-times" onClick={clearFilter} />
        ) : (
          <i className="fas fa-bars" onClick={openModalSort} />
        )}
      </div>
    </>
  );
};

export default SearchBar;
