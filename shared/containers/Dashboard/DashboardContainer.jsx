import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Layout from 'components/Dashboard/Layout';

import styles from './styles.css';

import * as authActions from 'reducers/actions/auth-actions';
import * as globalActions from 'reducers/actions/global-actions';
import * as profileActions from 'reducers/actions/profile-actions';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        email: ''
      },
      smallMenu: false,
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

  toggleSideMenu() {
    this.setState({
      smallMenu: !this.state.smallMenu,
    });
  }

  render() {
    return (
      <div>
        <Layout toggleSideMenu={this.toggleSideMenu.bind(this)} smallMenu={this.state.smallMenu}>

        </Layout>
      </div>
    );
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
