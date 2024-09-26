import React from 'react';
import { Employee, EmployeesByYear } from '@/types/employee';
import { sortByYears } from '@/utils/utils';
import EmployeeItem from '../employee-item/EmployeeItem';

import './listSortedByBirthday.scss';

interface ListSortedByBirthdayProps {
  employees: Employee[];
}

const ListSortedByBirthday: React.FC<ListSortedByBirthdayProps> = ({ employees }) => {
  const objYears: EmployeesByYear = sortByYears(employees);

  return (
    <>
      {Object.keys(objYears).map(year => {
        const yearNumber = parseInt(year);
        return (
          <div key={yearNumber}>
            <div className="year">{yearNumber}</div>
            {objYears[yearNumber].map(employee => (
              <EmployeeItem key={employee.id} {...employee} />
            ))}
          </div>
        );
      })}
    </>
  );
};

export default ListSortedByBirthday;
