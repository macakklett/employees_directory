import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { selectSorting } from '@/features/employees/employeesSelectors';
import { useSelector } from 'react-redux';
import { Employee } from '@/types/employee';

import './employeeItem.scss';

const EmployeeItem: React.FC<Employee> = props => {
  const { id, name, position, birthDate, avatar, tag } = props;

  const sortingType = useSelector(selectSorting);
  const formattedBirthDate = moment(birthDate).format('D MMM');

  return (
    <div className="employee-list__item employee">
      <img src={avatar} alt={`${name}'s avatar`} className="employee__avatar" />
      <div className="employee__info">
        <Link to={`/item/${id}`}>
          <div className="employee__name">
            {name}
            <span className="employee__tag">{tag}</span>
          </div>
        </Link>

        <div className="employee__position">{position}</div>
      </div>
      {sortingType === 'birthday' && (
        <div className="employee__birthdate">{formattedBirthDate}</div>
      )}
    </div>
  );
};

export default EmployeeItem;
