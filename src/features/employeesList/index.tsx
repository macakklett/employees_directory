import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { selectAllEmployees, selectStatus } from '@/redux/employeesSelectors';
import { compareEmployees, sortByYears } from './utils';
import EmployeeItem from '@/features/employeesList/components/employee-item/EmployeeItem';
import Error from '@/features/error';
import EmployeesListSceleton from '@/features/employeesList/components/list-item-skeleton/EmployeesListSceleton';
import type {
  Employee,
  StatusOfProcessing,
  SortingEmployees,
  RequestParams,
  EmployeesByYear,
} from '@/types/employee';

import './index.scss';

const EmployeesList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const requestParams: RequestParams = Object.fromEntries([...searchParams]);
  const sortType: SortingEmployees = requestParams.sortBy || 'name';

  const allEmployees: Employee[] = useSelector(selectAllEmployees);
  const statusOfProcessing: StatusOfProcessing = useSelector(selectStatus);

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

  const objYears: EmployeesByYear = useMemo(
    () => sortByYears(filteredEmployeeList),
    [filteredEmployeeList],
  );

  if (statusOfProcessing === 'error') {
    return <Error type="general" />;
  }

  if (statusOfProcessing === 'loading') {
    return <EmployeesListSceleton />;
  }

  if (!filteredEmployeeList.length) {
    return <Error type="notFound" />;
  }

  return (
    <div className="employee-list">
      {sortType === 'birthDate'
        ? Object.keys(objYears).map(year => (
            <div key={year}>
              <div className="year">{year}</div>
              {objYears[parseInt(year)].map(employee => (
                <EmployeeItem key={employee.id} {...employee} />
              ))}
            </div>
          ))
        : filteredEmployeeList.map(employee => <EmployeeItem key={employee.id} {...employee} />)}
    </div>
  );
};

export default EmployeesList;
