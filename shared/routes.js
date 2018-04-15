import React from 'react';
import { CookiesProvider } from 'react-cookie';
import {
  Switch,
  Route,
  IndexRoute,
  Redirect,
} from 'react-router-dom';

// import 'semantic-ui-css/semantic.min.css';

import App from './containers/App';
import HomePage from './containers/Home';
import NotFoundPage from './containers/NotFound';

// auth pages
// import LoginPage from './containers/Auth/Login';
import LogoutPage from './containers/Auth/Logout';

//high order components
import RequireAuth from './components/Middleware/Auth';

const Routes = () => (
  <CookiesProvider>
    <App>
      <Switch>
        <Route path="/dashboard" component={RequireAuth(/* DashboardPage */ HomePage)} />

        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/login" /* component={LoginPage} */ />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/not-found" component={NotFoundPage} />
        <Redirect to="/not-found"/>
      </Switch>
    </App>
  </CookiesProvider>
);

export default Routes;
