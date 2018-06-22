import React from 'react';
import { CookiesProvider } from 'react-cookie';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import App from 'containers/App';
import DashboardPage from 'containers/Dashboard';
import ProfilePage from 'containers/Profile';
import HomePage from 'containers/Home';
import NotFoundPage from 'containers/NotFound';
import ForbiddenPage from 'containers/Forbidden';

// auth pages
import LoginPage from 'containers/Auth/Login';
import LogoutPage from 'containers/Auth/Logout';

// high order components
import requireAuth from 'containers/Middleware/Auth';

const Routes = () => (
  <CookiesProvider>
    <App>
      <Switch>
        <Route path="/dashboard" component={requireAuth(DashboardPage)} />
        <Route path="/profile" component={requireAuth(ProfilePage)} />

        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/not-found" component={NotFoundPage} />
        <Route path="/forbidden" component={ForbiddenPage} />
        <Redirect to="/not-found" />
      </Switch>
    </App>
  </CookiesProvider>
);

export default Routes;
