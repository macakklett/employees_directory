import React from 'react';
import { Link } from 'react-router-dom';
import './pageNotFound.scss';

const PageNotFound: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="page-not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <p>Please check the URL or try again later.</p>

      <div className="page-not-found__actions">
        <Link to="/" className="btn">
          Go to Main Page
        </Link>
        <button onClick={handleReload} className="btn btn-reload">
          Reload this Page
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
