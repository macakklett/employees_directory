import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import type { Employee, RequestParams, SortingEmployees } from '@/types/employee';

import './employeeItem.scss';

const EmployeeItem: React.FC<Employee> = props => {
  const { id, name, position, birthDate, avatar, tag } = props;

  const [searchParams] = useSearchParams();
  const requestParams: RequestParams = Object.fromEntries([...searchParams]);
  const sortingType: SortingEmployees = requestParams.sortBy || 'name';

  const formattedBirthDate = moment(birthDate).format('D MMM');

  return (
    <div className="employee-list__item employee">
      <img src={avatar} alt={`${name}'s avatar`} className="employee__avatar" />
      <div className="employee__info">
        <Link to={`/employee/${id}`}>
          <div className="employee__name">
            {name}
            <span className="employee__tag">{tag}</span>
          </div>
        </Link>

        <div className="employee__position">{position}</div>
      </div>
      {sortingType === 'birthDate' && (
        <div className="employee__birthdate">{formattedBirthDate}</div>
      )}
    </div>
  );
};

export default EmployeeItem;
