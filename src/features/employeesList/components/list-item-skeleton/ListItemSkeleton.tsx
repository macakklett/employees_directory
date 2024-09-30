import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import './listItemSkeleton.scss';

const ListItemSkeleton: React.FC = () => {
  return (
    <div className="list-item">
      <div className="list-item__avatar">
        <Skeleton circle width={72} height={72} />
      </div>
      <div className="list-item__data">
        <Skeleton width="60%" style={{ marginBottom: '0.5rem' }} />
        <Skeleton width="40%" />
      </div>
    </div>
  );
};

export default ListItemSkeleton;
