import React from 'react';
import {
  Switch,
  Route,
  IndexRoute,
} from 'react-router-dom';

import App from './containers/App';
import HomeContainer from './containers/Home';

const Routes = () => (
  <App>
    <Switch>
        <Route exact path="/" component={HomeContainer} ></Route>
    </Switch>
  </App>
);

export default Routes;
