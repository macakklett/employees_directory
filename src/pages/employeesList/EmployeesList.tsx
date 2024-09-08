import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '@/features/employees/employeesSlice';
import { selectFilteredEmployees, selectStatus } from '@/features/employees/employeesSelectors';
import { Employee, StatusOfProcessing } from '@/types/employee';
import { AppDispatch } from '@/store';
import EmployeeItem from '@/components/employee-item/EmployeeItem';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import './employeesList.scss';

const EmployeesList: React.FC = () => {
  const employeeList: Employee[] = useSelector(selectFilteredEmployees);
  const statusOfProcessing: StatusOfProcessing = useSelector(selectStatus);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (employeeList.length === 0) {
      dispatch(fetchEmployees());
    }
  }, []);

  return (
    <div className="employee-list">
      {statusOfProcessing === 'loading'
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="employee-list__item employee">
              <Skeleton circle={true} height={50} width={50} className="employee-skeleton" />
              <div className="employee-skeleton__info">
                <Skeleton height={20} width={100} className="employee-skeleton__line" />
                <Skeleton height={15} width={80} className="employee-skeleton__line" />
              </div>
            </div>
          ))
        : employeeList.map(employee => <EmployeeItem key={employee.id} {...employee} />)}
    </div>
  );
};

export default EmployeesList;
