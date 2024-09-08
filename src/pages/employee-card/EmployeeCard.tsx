import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '@/store';
import { fetchEmployeeById } from '@/features/employees/employeesSlice';
import {
  selectEmployeeById,
  selectStatus,
  selectError,
} from '@/features/employees/employeesSelectors';
import moment from 'moment';

import './employeeCard.scss';

const EmployeeCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();

  const employee = useSelector((state: RootState) => selectEmployeeById(state, id!));
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    if (!employee && id) {
      dispatch(fetchEmployeeById(id));
    }
  }, [id]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!employee) {
    return <p>Employee not found</p>;
  }

  const formattedBirthDate = moment(employee.birthDate).format('D MMMM YYYY');
  const age = moment().diff(employee.birthDate, 'years');

  return (
    <div className="employee-card__profile">
      <div className="employee-card__info">
        <Link to="/" className="back-icon">
          <i className="fas fa-chevron-left" />
        </Link>
        <img
          src={employee.avatar}
          alt={`${employee.name}'s avatar`}
          className="employee-card__avatar"
        />
        <div className="employee-card__name">
          {employee.name}
          <span className="employee-card__tag">{employee.tag}</span>
        </div>
        <div className="employee-card__position">{employee.position}</div>
      </div>
      <div className="employee-card__birthdate birthdate">
        <i className="fas fa-star star-icon" />
        <span className="birthdate__date">{formattedBirthDate}</span>
        <span className="birthdate__age">{age} years</span>
      </div>
      <div className="employee-card__phone">
        <i className="fas fa-phone phone-icon" />
        <a href={`tel:${employee.phone}`} className="phone-link">
          {employee.phone}
        </a>
      </div>
    </div>
  );
};

export default EmployeeCard;
