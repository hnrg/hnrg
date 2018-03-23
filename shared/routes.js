import React from 'react';
import {
  Switch,
  Route,
  IndexRoute,
  Redirect,
} from 'react-router-dom';

import App from './containers/App';
import HomeContainer from './containers/Home';

const Routes = () => (
  <App>
    <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route path="/home" component={HomeContainer} />
        <Redirect to="/not-found" />
    </Switch>
  </App>
);

export default Routes;
