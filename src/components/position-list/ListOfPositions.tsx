import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterPosition } from '@/features/employees/employeesSelectors';
import { setFilterPosition } from '@/features/employees/employeesSlice';
import { FilterPosition } from '@/types/employee';

import './listOfPositions.scss';

const ListOfPositions: React.FC = () => {
  const position: FilterPosition = useSelector(selectFilterPosition);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterPosition(event.target.value as FilterPosition));
  };

  return (
    <div className="input-position">
      <input
        type="radio"
        id="all"
        value="all"
        checked={position === 'all'}
        onChange={handleChange}
      />
      <label htmlFor="all">All</label>

      <input
        type="radio"
        id="designer"
        value="designer"
        checked={position === 'designer'}
        onChange={handleChange}
      />
      <label htmlFor="designer">Designers</label>

      <input
        type="radio"
        id="analyst"
        value="analyst"
        checked={position === 'analyst'}
        onChange={handleChange}
      />
      <label htmlFor="analyst">Analysts</label>

      <input
        type="radio"
        id="manager"
        value="manager"
        checked={position === 'manager'}
        onChange={handleChange}
      />
      <label htmlFor="manager">Managers</label>

      <input
        type="radio"
        id="iOS"
        value="iOS"
        checked={position === 'iOS'}
        onChange={handleChange}
      />
      <label htmlFor="iOS">iOS</label>

      <input
        type="radio"
        id="android"
        value="android"
        checked={position === 'android'}
        onChange={handleChange}
      />
      <label htmlFor="android">Android</label>
    </div>
  );
};

export default ListOfPositions;
