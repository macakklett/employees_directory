import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import fetchEmployees from './redux/gateways';
import EmployeeCard from './features/employee-card';
import Error from './features/error';
import Header from './features/header';
import EmployeesList from './features/employeesList';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <EmployeesList />
      </>
    ),
  },
  {
    path: '/employee/:id',
    element: <EmployeeCard />,
  },
  {
    path: '*',
    element: <Error type="general" />,
  },
]);

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  return (
    <div className="page">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
