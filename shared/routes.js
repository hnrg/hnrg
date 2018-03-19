import React from 'react';
import {
  Switch,
  Route,
  IndexRoute,
} from 'react-router-dom';

import App from './containers/App';
import HomeContainer from './containers/Home';

const Routes = () => (
  <Switch>
      <Route path="/" component={App} >
          <IndexRoute component={HomeContainer} />
      </Route>
  </Switch>
);

export default Routes;
