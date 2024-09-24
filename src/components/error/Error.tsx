import React from 'react';
import saucer from '../../asset/images/flying-saucer.png';
import './error.scss';
import { Link } from 'react-router-dom';

const Error: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="error">
      <img src={saucer} alt="flying saucer" className="error__image" />
      <div className="error__info">Some unexpected error...</div>
      <div className="error__fixing">Our team is fixing it now</div>
      <Link to="/" className="error__reload" replace={true}>
        Try again
      </Link>
    </div>
  );
};

export default Error;
