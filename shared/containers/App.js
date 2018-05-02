import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth-actions';
import * as configurationActions from '../actions/configuration-actions';
import * as globalActions from '../actions/global-actions';

import DevTools from '../components/DevTools';

/**
 *  Save that state
 */
function mapStateToProps(state) {
  return {
    auth: {
      isFetching: state.auth.isFetching
    },
    configuration: {
      currentConfiguration: state.configuration.currentConfiguration,
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  };
}

/**
 * Bind all the actions from authActions, deviceActions and globalActions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions,
      ...configurationActions,
      ...globalActions
    }, dispatch)
  };
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.setTimeout(() => {
      this.props.actions.getSessionToken();
      this.props.actions.getConfiguration();
    },
    2500);
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {...this.props})}
        {process.env.NODE_ENV === "development" && <DevTools />}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

// Since we're using ES6 classes, have to define the TimerMixin
reactMixin(App.prototype, TimerMixin);

export default connect(mapStateToProps, mapDispatchToProps)(App);
