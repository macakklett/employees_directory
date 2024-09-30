import React from 'react';
import Header from '../../features/filter/Header';
import EmployeesList from '@/features/employeesList';

import './index.scss';

const Main: React.FC = () => {
  return (
    <main className="main">
      <Header />
      <EmployeesList />
    </main>
  );
};

export default Main;
