import React from 'react';
import saucer from '../../asset/images/flying-saucer.png';
import './error.scss';

const Error: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="error">
      <img src={saucer} alt="flying saucer" className="error__image" />
      <div className="error__info">Some unexpected error...</div>
      <div className="error__fixing">Our team is fixing it now</div>
      <button onClick={handleReload} className="error__reload">
        Try again
      </button>
    </div>
  );
};

export default Error;
