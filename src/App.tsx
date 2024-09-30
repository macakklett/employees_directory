import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './layouts/main';
import EmployeeCard from './features/employee-card';
import Error from './features/error';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/employee/:id" element={<EmployeeCard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
