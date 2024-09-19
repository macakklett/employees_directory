import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSorting } from '@/features/employees/employeesSelectors';
import { setSorting } from '@/features/employees/employeesSlice';
import { SortingEmployees } from '@/types/employee';
import { AppDispatch } from '@/store';

import './modalSort.scss';

interface ModalSortProps {
  closeModalSort: () => void;
}

const ModalSort: React.FC<ModalSortProps> = ({ closeModalSort }) => {
  const dispatch: AppDispatch = useDispatch();
  const sortType: SortingEmployees = useSelector(selectSorting);

  const [selectedOption, setSelectedOption] = useState<SortingEmployees>(sortType);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as SortingEmployees);
  };

  const handleSave = () => {
    dispatch(setSorting(selectedOption));
    closeModalSort();
  };

  return (
    <div className="modal__overlay" onClick={closeModalSort}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <i className="fas fa-chevron-left modal__content_back-icon" onClick={handleSave} />
          <div className="modal__title">Sort</div>
          <i className="fas fa-times modal__content_close-icon" onClick={handleSave} />
        </div>
        <div className="modal__options">
          <label>
            <input
              type="radio"
              name="sortOption"
              value="alphabet"
              checked={selectedOption === 'alphabet'}
              onChange={handleOptionChange}
            />
            By alphabet
          </label>
          <label>
            <input
              type="radio"
              name="sortOption"
              value="birthday"
              checked={selectedOption === 'birthday'}
              onChange={handleOptionChange}
            />
            By birthdate
          </label>
        </div>
      </div>
    </div>
  );
};

export default ModalSort;
