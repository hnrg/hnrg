import React from 'react';
import {
  Switch,
  Route,
  IndexRoute,
  Redirect,
} from 'react-router-dom';

import App from './containers/App';
import HomePage from './containers/Home';
import NotFoundPage from './containers/NotFound';

// auth pages
// import LoginPage from './containers/Auth/Login';
import LogoutPage from './containers/Auth/Logout';

//high order components
import RequireAuth from './components/Middleware/Auth';

const Routes = () => (
  <App>
    <Switch>
        <Route path="/dashboard" component={RequireAuth(1, /* DashboardPage*/ HomePage)} />

        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/login" /* component={LoginPage} */ />
        <Route path="/logout" component={LogoutPage} />
        <Redirect to="/not-found" component={NotFoundPage}/>
    </Switch>
  </App>
);

export default Routes;
