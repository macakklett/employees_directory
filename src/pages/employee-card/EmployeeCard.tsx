import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AppDispatch } from '@/store';
import { fetchEmployeeById } from '@/features/employees/employeesSlice';
import { selectEmployee, selectStatus } from '@/features/employees/employeesSelectors';
import { Employee, StatusOfProcessing } from '@/types/employee';
import Error from '@/components/error/Error';
import CardSkeleton from '@/components/skeleton/employee-card-skeleton/CardSkeleton';
import moment from 'moment';

import './employeeCard.scss';

const EmployeeCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const employee: Employee | null = useSelector(selectEmployee);
  const status: StatusOfProcessing = useSelector(selectStatus);

  const hasNavigated = useRef(false);

  useEffect(() => {
    dispatch(fetchEmployeeById(id!));

    if (window.history.state && window.history.state.idx > 0) {
      hasNavigated.current = true;
    }
  }, [id]);

  if (status === 'loading') {
    return <CardSkeleton />;
  }

  if (status === 'error' || !employee) {
    return <Error />;
  }

  const formattedBirthDate = moment(employee.birthDate).format('D MMMM YYYY');
  const age = moment().diff(employee.birthDate, 'years');

  const goBack = () => {
    if (hasNavigated.current) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="employee-card__profile">
      <div className="employee-card__info info">
        <button onClick={goBack} className="back-icon">
          <i className="fas fa-chevron-left" />
        </button>
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
