import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ModalSort from '../modal';
import type { RequestParams } from '@/types/employee';

import './index.scss';

const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpenModalSort, setIsOpenModalSort] = useState(false);

  const requestParams: RequestParams = Object.fromEntries([...searchParams]);
  const filterText = requestParams.searchText || '';
  const sortType = requestParams.sortBy;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterText = event.target.value;

    if (newFilterText.length === 0) {
      delete requestParams.searchText;
    } else {
      requestParams.searchText = newFilterText;
    }

    setSearchParams(requestParams);
  };

  const clearFilter = () => {
    delete requestParams.searchText;
    setSearchParams(requestParams);
  };

  const openModalSort = () => setIsOpenModalSort(true);
  const closeModalSort = () => setIsOpenModalSort(false);

  return (
    <>
      {isOpenModalSort && <ModalSort closeModalSort={closeModalSort} />}
      <div className="search-bar">
        <div className="search-bar__input">
          {filterText.length > 0 ? (
            <img src="/assets/icons/magn-glass-active.svg" alt="magnifying glass" />
          ) : (
            <img src="/assets/icons/magn-glass.svg" alt="magnifying glass" />
          )}
          <input
            type="text"
            placeholder="Search by name, tag, email..."
            value={filterText}
            onChange={handleChange}
          />
          {filterText.length === 0 && (
            <>
              {sortType === 'birthDate' ? (
                <img
                  src="/assets/icons/sort-menu-active.svg"
                  alt="menu"
                  onClick={openModalSort}
                  className="search-bar__burger-menu"
                />
              ) : (
                <img
                  src="/assets/icons/sort-menu.svg"
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
