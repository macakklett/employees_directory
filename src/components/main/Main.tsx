import React from 'react';
import Header from '../header/Header';
import EmployeesList from '@/pages/employeesList/EmployeesList';

import './main.scss';

const Main: React.FC = () => {
  return (
    <main className="main">
      <Header />
      <EmployeesList />
    </main>
  );
};

export default Main;
