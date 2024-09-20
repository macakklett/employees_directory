import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '@/store';
import {
  fetchEmployees,
  setSorting,
  setFilterPosition,
  setFilter,
} from '@/features/employees/employeesSlice';
import { selectFilteredEmployees, selectStatus } from '@/features/employees/employeesSelectors';
import { Employee, StatusOfProcessing, SortingEmployees, FilterPosition } from '@/types/employee';
import EmployeeItem from '@/components/employee-item/EmployeeItem';
import Error from '@/components/error/Error';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import glass from '../../asset/images/magnifying-glass.png';

import './employeesList.scss';

const EmployeesList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const employeeList: Employee[] = useSelector(selectFilteredEmployees);
  const statusOfProcessing: StatusOfProcessing = useSelector(selectStatus);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (employeeList.length === 0) {
      dispatch(fetchEmployees());
    }

    const currentSortBy = (searchParams.get('sortBy') as SortingEmployees) || 'alphabet';
    const currentPosition = (searchParams.get('position') as FilterPosition) || 'all';
    const currentSearchText = searchParams.get('searchText') || '';

    dispatch(setSorting(currentSortBy));
    dispatch(setFilterPosition(currentPosition));
    dispatch(setFilter(currentSearchText));

    setSearchParams({
      sortBy: currentSortBy,
      position: currentPosition,
      searchText: currentSearchText,
    });
  }, [searchParams, dispatch]);

  if (statusOfProcessing === 'error') {
    return <Error />;
  }

  return (
    <div className="employee-list">
      {statusOfProcessing === 'loading' ? (
        Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="employee-list__item employee">
            <Skeleton circle={true} height={50} width={50} className="employee-skeleton" />
            <div className="employee-skeleton__info">
              <Skeleton height={20} width={100} className="employee-skeleton__line" />
              <Skeleton height={15} width={80} className="employee-skeleton__line" />
            </div>
          </div>
        ))
      ) : employeeList.length > 0 ? (
        employeeList.map(employee => <EmployeeItem key={employee.id} {...employee} />)
      ) : (
        <div className="empty-list">
          <img src={glass} alt="magnifying glass" />
          <div className="empty-list__explain">We didn't find anyone</div>
          <div className="empty-list__recommendation">Try to adjust your request</div>
        </div>
      )}
    </div>
  );
};

export default EmployeesList;
