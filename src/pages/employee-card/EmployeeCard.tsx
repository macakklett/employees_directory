import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '@/store';
import { fetchEmployeeById } from '@/features/employees/employeesSlice';
import { selectEmployee, selectStatus } from '@/features/employees/employeesSelectors';
import Error from '@/components/error/Error';
import moment from 'moment';

import './employeeCard.scss';

const EmployeeCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();

  const employee = useSelector(selectEmployee);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchEmployeeById(id!));
  }, [id]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <Error />;
  }

  if (!employee) {
    return <p>Employee not found</p>;
  }

  const formattedBirthDate = moment(employee.birthDate).format('D MMMM YYYY');
  const age = moment().diff(employee.birthDate, 'years');

  return (
    <div className="employee-card__profile">
      <div className="employee-card__info info">
        <Link to="/" className="back-icon">
          <i className="fas fa-chevron-left" />
        </Link>
        <img src={employee.avatar} alt={`${employee.name}'s avatar`} className="info__avatar" />
        <div className="info__name">
          {employee.name}
          <span className="info__tag">{employee.tag}</span>
        </div>
        <div className="info__position">{employee.position}</div>
      </div>
      <div className="employee-card__data birthdate">
        <i className="fas fa-star star-icon" />
        <span className="birthdate__date">{formattedBirthDate}</span>
        <span className="birthdate__age">{age} years</span>
      </div>
      <div className="employee-card__data">
        <i className="fas fa-phone phone-icon" />
        <a href={`tel:${employee.phone}`} className="phone-link">
          {employee.phone}
        </a>
      </div>
    </div>
  );
};

export default EmployeeCard;
