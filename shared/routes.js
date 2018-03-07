import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import Feed from './containers/Feed';

const Routes = () => (
  <Switch>
    <Route exact path = "/" component = {Feed} />
  </Switch>
);

export default Routes;
