import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '@/store';
import { selectFilterText, selectSorting } from '@/features/employees/employeesSelectors';
import { setFilter } from '@/features/employees/employeesSlice';
import ModalSort from '../modal/ModalSort';
import glassIcon from '../../asset/icons/magn-glass.svg';
import glassIconActive from '../../asset/icons/magn-glass-active.svg';
import burgerMenuIcon from '../../asset/icons/sort-menu.svg';
import burgerMenuIconActive from '../../asset/icons/sort-menu-active.svg';

import './searchBar.scss';

const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpenModalSort, setIsOpenModalSort] = useState(false);

  const requestParams = Object.fromEntries([...searchParams]);

  const filterText = useSelector(selectFilterText);
  const sortType = useSelector(selectSorting);
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterText = event.target.value;

    if (newFilterText.length === 0) {
      delete requestParams.searchText;
    } else {
      requestParams.searchText = newFilterText;
    }

    dispatch(setFilter(newFilterText));
    setSearchParams(requestParams);
  };

  const clearFilter = () => {
    dispatch(setFilter(''));
  };

  const openModalSort = () => setIsOpenModalSort(true);
  const closeModalSort = () => setIsOpenModalSort(false);

  return (
    <>
      {isOpenModalSort && <ModalSort closeModalSort={closeModalSort} />}
      <div className="search-bar">
        <div className="search-bar__input">
          {filterText.length > 0 ? (
            <img src={glassIconActive} alt="magnifying glass" />
          ) : (
            <img src={glassIcon} alt="magnifying glass" />
          )}
          <input
            type="text"
            placeholder="Search by name, tag, email..."
            value={filterText}
            onChange={handleChange}
          />
          {filterText.length === 0 && (
            <>
              {sortType === 'alphabet' ? (
                <img
                  src={burgerMenuIcon}
                  alt="menu"
                  onClick={openModalSort}
                  className="search-bar__burger-menu"
                />
              ) : (
                <img
                  src={burgerMenuIconActive}
                  alt="menu"
                  onClick={openModalSort}
                  className="search-bar__burger-menu"
                />
              )}
            </>
          )}
        </div>
        {filterText.length > 0 && (
          <span className="search-bar__clear" onClick={clearFilter}>
            Cancel
          </span>
        )}
      </div>
    </>
  );
};

export default SearchBar;
