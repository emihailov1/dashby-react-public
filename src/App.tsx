import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { History } from 'history';

import HomeLayoutRoute from './components/layout/HomeLayout';
import DashboardLayoutRoute from './components/layout/DashboardLayout';
import { Roles } from './components/shared/roles';
import LoginPage from './components/pages/Login';
import DashboardPage from './components/pages/Dashboard';
import UsersPage from './components/pages/Users';
import UserPage from './components/pages/Users/user';
import UserCreatePage from './components/pages/Users/create';

interface IAppProps {
  history: History<any>
}

const App: React.FC<IAppProps> = (props: IAppProps) => {
  return (
  <Router history={props.history}>
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>

      <HomeLayoutRoute path="/login" component={LoginPage} history={props.history} />
      <DashboardLayoutRoute path="/dashboard"  roles={[Roles.Admin,Roles.User]} component={DashboardPage} history={props.history} />
      <DashboardLayoutRoute path="/users" exact roles={[Roles.Admin,Roles.User]} component={UsersPage} history={props.history} />
      <DashboardLayoutRoute path="/users/create" exact roles={[Roles.Admin]} component={UserCreatePage} history={props.history} />
      <DashboardLayoutRoute path="/users/:id" roles={[Roles.Admin]} component={UserPage} history={props.history} />
      

    </Switch>
  </Router>);
};

export default App; 

