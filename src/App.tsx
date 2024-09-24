import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main/Main';
import EmployeeCard from './pages/employee-card/EmployeeCard';
import Error from './components/error/Error';

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
