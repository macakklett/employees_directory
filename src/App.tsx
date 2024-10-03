import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import fetchEmployees from './redux/gateways';
import Main from './layouts/main';
import EmployeeCard from './features/employee-card';
import Error from './features/error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
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

  return <RouterProvider router={router} />;
};

export default App;
