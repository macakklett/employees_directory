import React from 'react';
import SearchBar from '../search-bar/SearchBar';
import ListOfPositions from '../position-list/ListOfPositions';

import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__title">Search</div>
      <SearchBar />
      <ListOfPositions />
    </header>
  );
};

export default Header;
