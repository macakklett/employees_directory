import React from 'react';
import EmployeesList from '@/pages/employeesList/EmployeesList';
import Header from '../header/Header';

const Main: React.FC = () => {
  return (
    <main className="main">
      <Header />
      <EmployeesList />
    </main>
  );
};

export default Main;
