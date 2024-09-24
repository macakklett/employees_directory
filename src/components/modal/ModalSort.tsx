import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '@/store';
import { selectSorting } from '@/features/employees/employeesSelectors';
import { setSorting } from '@/features/employees/employeesSlice';
import { SortingEmployees } from '@/types/employee';

import './modalSort.scss';

interface ModalSortProps {
  closeModalSort: () => void;
}

const ModalSort: React.FC<ModalSortProps> = ({ closeModalSort }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestParams = Object.fromEntries([...searchParams]);

  const dispatch: AppDispatch = useDispatch();
  const sortType: SortingEmployees = useSelector(selectSorting);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = event.target.value as SortingEmployees;

    dispatch(setSorting(selectedOption));
    setSearchParams({ ...requestParams, sortBy: selectedOption });
  };

  return (
    <div className="modal__overlay" onClick={closeModalSort}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <div className="modal__title">Sort</div>
          <i className="fas fa-times modal__content_close-icon" onClick={closeModalSort} />
        </div>
        <div className="modal__options">
          <input
            type="radio"
            id="alphabet"
            name="sortOption"
            value="alphabet"
            checked={sortType === 'alphabet'}
            onChange={handleOptionChange}
          />
          <label htmlFor="alphabet" className="option__radio-button">
            By alphabet
          </label>

          <input
            type="radio"
            id="birthday"
            name="sortOption"
            value="birthday"
            checked={sortType === 'birthday'}
            onChange={handleOptionChange}
          />
          <label htmlFor="birthday" className="option__radio-button">
            By birthdate
          </label>
        </div>
      </div>
    </div>
  );
};

export default ModalSort;
