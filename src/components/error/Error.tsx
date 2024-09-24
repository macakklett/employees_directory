import React from 'react';
import { Link } from 'react-router-dom';
import saucerImage from '../../asset/images/flying-saucer.png';

import './error.scss';

const Error: React.FC = () => {
  return (
    <div className="error">
      <img src={saucerImage} alt="flying saucer" className="error__image" />
      <div className="error__info">Some unexpected error...</div>
      <div className="error__fixing">Our team is fixing it now</div>
      <Link to="/" className="error__reload" replace={true}>
        Try again
      </Link>
    </div>
  );
};

export default Error;
