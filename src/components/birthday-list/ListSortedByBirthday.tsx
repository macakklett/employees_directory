import React from 'react';
import { Employee } from '@/types/employee';
import { getEmployeesByBirthday } from '@/utils/utils';
import EmployeeItem from '../employee-item/EmployeeItem';

import './listSortedByBirthday.scss';

interface ListSortedByBirthdayProps {
  employees: Employee[];
}

const ListSortedByBirthday: React.FC<ListSortedByBirthdayProps> = ({ employees }) => {
  const { thisYear, nextYear } = getEmployeesByBirthday(employees);
  const nextYearValue = new Date().getFullYear() + 1;

  return (
    <>
      {thisYear.map(employee => (
        <EmployeeItem key={employee.id} {...employee} />
      ))}
      <div className="next-year">{nextYearValue}</div>
      {nextYear.map(employee => (
        <EmployeeItem key={employee.id} {...employee} />
      ))}
    </>
  );
};

export default ListSortedByBirthday;
