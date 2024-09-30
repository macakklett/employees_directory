import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '@/redux/store';
import fetchEmployees from '@/common/gateway';
import { selectAllEmployees, selectStatus } from '@/redux/employeesSelectors';
import { compareEmployees } from '@/utils/utils';
import { Employee, StatusOfProcessing, SortingEmployees, RequestParams } from '@/types/employee';
import EmployeeItem from '@/features/employeesList/components/employee-item/EmployeeItem';
import Error from '@/features/error';
import ListItemSkeleton from '@/features/employeesList/components/list-item-skeleton/ListItemSkeleton';
import ListSortedByBirthday from './components/birthday-list/ListSortedByBirthday';

import './index.scss';

const EmployeesList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const requestParams: RequestParams = Object.fromEntries([...searchParams]);
  const sortType: SortingEmployees = requestParams.sortBy || 'name';

  const allEmployees: Employee[] = useSelector(selectAllEmployees);
  const statusOfProcessing: StatusOfProcessing = useSelector(selectStatus);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (allEmployees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch]);

  const filteredEmployeeList: Employee[] = useMemo(() => {
    const { positionQuery, searchText, sortBy } = requestParams;

    const filteredData = allEmployees.filter(
      ({ position, name, tag, email }) =>
        (!positionQuery ||
          positionQuery === 'all' ||
          position.toLocaleLowerCase() === positionQuery.toLocaleLowerCase()) &&
        (!searchText ||
          [name, tag, email].some(field =>
            field?.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
          )),
    );

    return sortBy ? filteredData.sort(compareEmployees(sortBy)) : filteredData;
  }, [searchParams, allEmployees]);

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
      {filteredEmployeeList.length > 0 ? (
        sortType === 'birthDate' ? (
          <ListSortedByBirthday employees={filteredEmployeeList} />
        ) : (
          filteredEmployeeList.map(employee => <EmployeeItem key={employee.id} {...employee} />)
        )
      ) : (
        <div className="empty-list">
          <img
            src="/assets/images/magnifying-glass.png"
            alt="magnifying glass"
            className="empty-list__image"
          />
          <div className="empty-list__explain">We didn't find anyone</div>
          <div className="empty-list__recommendation">Try to adjust your request</div>
        </div>
      )}
    </div>
  );
};

export default EmployeesList;
