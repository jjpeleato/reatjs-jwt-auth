import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ROUTE_HOME, ROUTE_LOGIN } from './constants/routes';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTE_HOME} component={Home} />
      <Route exact path={ROUTE_LOGIN} component={Login} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
