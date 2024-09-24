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
import {
  selectAllEmployees,
  selectFilteredEmployees,
  selectStatus,
  selectSorting,
} from '@/features/employees/employeesSelectors';
import { Employee, StatusOfProcessing, SortingEmployees, FilterPosition } from '@/types/employee';
import EmployeeItem from '@/components/employee-item/EmployeeItem';
import Error from '@/components/error/Error';
import ListItemSkeleton from '@/components/skeleton/list-item-skeleton/ListItemSkeleton';
import ListSortedByBirthday from '@/components/birthday-list/ListSortedByBirthday';
import glassImage from '../../asset/images/magnifying-glass.png';

import './employeesList.scss';

const EmployeesList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const requestParams = Object.fromEntries([...searchParams]);

  const allEmployees: Employee[] = useSelector(selectAllEmployees);
  const employeeList: Employee[] = useSelector(selectFilteredEmployees);
  const statusOfProcessing: StatusOfProcessing = useSelector(selectStatus);
  const sortType: SortingEmployees = useSelector(selectSorting);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (allEmployees.length === 0) {
      dispatch(fetchEmployees());
    }

    dispatch(setSorting((requestParams.sortBy as SortingEmployees) || 'alphabet'));
    dispatch(setFilterPosition((requestParams.position as FilterPosition) || 'all'));
    requestParams.searchText && dispatch(setFilter(requestParams.searchText));
  }, [searchParams, employeeList.length, dispatch]);

  if (statusOfProcessing === 'error') {
    return <Error />;
  }

  if (statusOfProcessing === 'loading') {
    return (
      <>
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index}>
            <ListItemSkeleton />
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="employee-list">
      {employeeList.length > 0 ? (
        sortType === 'alphabet' ? (
          employeeList.map(employee => <EmployeeItem key={employee.id} {...employee} />)
        ) : (
          <ListSortedByBirthday employees={employeeList} />
        )
      ) : (
        <div className="empty-list">
          <img src={glassImage} alt="magnifying glass" className="empty-list__image" />
          <div className="empty-list__explain">We didn't find anyone</div>
          <div className="empty-list__recommendation">Try to adjust your request</div>
        </div>
      )}
    </div>
  );
};

export default EmployeesList;
