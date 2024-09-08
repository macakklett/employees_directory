import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/main/Main';
import EmployeeCard from './pages/employee-card/EmployeeCard';
import PageNotFound from './pages/page-not-found/PageNotFound';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/item/:id" component={EmployeeCard} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default App;
