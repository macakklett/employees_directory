import React from 'react';
import { Link } from 'react-router-dom';
import type { ErrorType } from '@/types/employee';

import './index.scss';

interface ErrorProps {
  type: ErrorType;
}

const Error: React.FC<ErrorProps> = ({ type }) => {
  if (type === 'notFound') {
    return (
      <div className="empty-list">
        <img
          src="/assets/images/magnifying-glass.png"
          alt="magnifying glass"
          className="empty-list__image"
        />
        <div className="empty-list__explain">We didn't find anyone</div>
        <div className="empty-list__recommendation">Try to adjust your request</div>
      </div>
    );
  }

  return (
    <div className="error">
      <img src="/assets/images/flying-saucer.png" alt="flying saucer" className="error__image" />
      <div className="error__info">Some unexpected error...</div>
      <div className="error__fixing">Our team is fixing it now</div>
      <Link to="/" className="error__reload" replace={true}>
        Try again
      </Link>
    </div>
  );
};

export default Error;
