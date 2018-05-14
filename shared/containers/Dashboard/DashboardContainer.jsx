import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Sidebar from '../../components/dashboard/Sidebar';

import * as authActions from '../../redux/actions/auth-actions';
import * as globalActions from '../../redux/actions/global-actions';
import * as profileActions from '../../redux/actions/profile-actions';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        email: ''
      }
    };
  }

  /**
   * ### componentWillReceiveProps
   *
   * Since the Forms are looking at the state for the values of the
   * fields, when we we need to set them
   */
  componentWillReceiveProps(props) {
    this.setState({
      user: {
        username: props.profile.originalProfile.username,
        email: props.profile.originalProfile.email
      }
    });
  }

  /**
   * ### componentDidMount
   *
   * During Hot Loading, when the component mounts due the state
   * immediately being in a "logged in" state, we need to just set the
   * form fields.  Otherwise, we need to go fetch the fields
   */
  componentDidMount() {
    if (this.props.profile.originalProfile.username === null && this.props.profile.originalProfile.email === null) {
      this.props.actions.getProfile(this.props.global.currentUser);
    } else {
      this.setState({
        user: {
          username: this.props.profile.originalProfile.username,
          email: this.props.profile.originalProfile.email
        }
      });
    }
  }

  render() {
    return (<div><Sidebar /></div>);
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    profile: state.profile,
    global: {
      currentUser: state.global.currentUser,
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions,
      ...profileActions,
      ...globalActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
