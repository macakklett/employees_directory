import React from 'react';
import { Link } from 'react-router-dom';

import './pageNotFound.scss';

const PageNotFound: React.FC = () => {
  return (
    <div className="page__content">
      <h1>😢</h1>
      <Link to="/">Go home</Link>
    </div>
  );
};

export default PageNotFound;
