import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Layout from 'components/Dashboard/Layout';
import RolesPage from 'containers/Roles';
import SettingsPage from 'containers/Settings';
import StatisticsPage from 'containers/Statistics';
import UsersPage from 'containers/Users';
import PatientsPage from 'containers/Patients';
import DemographicDataPage from 'containers/DemographicData';
import DemographicDataAnalyticsPage from 'containers/Analytics/DemographicData';

import './styles.css';

import * as authActions from 'reducers/actions/auth-actions';
import * as globalActions from 'reducers/actions/global-actions';
import * as profileActions from 'reducers/actions/profile-actions';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    const { originalProfile } = this.props.profile;

    this.state = {
      connectedUser: originalProfile,
      smallMenu: false,
    };
  }

  componentWillReceiveProps(props) {
    const { originalProfile } = props.profile;

    this.setState({
      connectedUser: originalProfile,
    });
  }

  componentDidMount() {
    const { originalProfile } = this.props.profile;

    if (originalProfile.username === '') {
      this.props.actions.getProfile(this.props.global.currentUser);
      return;
    }

    this.setState({
      connectedUser: originalProfile,
    });
  }

  toggleSideMenu() {
    this.setState({
      smallMenu: !this.state.smallMenu,
    });
  }

  render() {
    const {match} = this.props;
    const activeItem = this.props.location.pathname.split('/')[2] || 'dashboard';

    return (
      <div>
        <Layout
          toggleSideMenu={this.toggleSideMenu.bind(this)}
          smallMenu={this.state.smallMenu}
          activeItem={activeItem}>
          <Switch>
            <Route exact path={`${match.path}`} component={StatisticsPage} />
            <Route path={`${match.path}/settings`} component={SettingsPage} />
            <Route path={`${match.path}/users/:username?`} component={UsersPage} />
            <Route path={`${match.path}/patients/:id?`} component={PatientsPage} />
            <Route path={`${match.path}/demographic-data/:id?`} component={DemographicDataPage} />
            <Route path={`${match.path}/analytics/demographic-data`} component={DemographicDataAnalyticsPage} />
            <Route path={`${match.path}/analytics/health-controls`} component={StatisticsPage} />
            <Route path={`${match.path}/roles/:name?`} component={RolesPage} />
          </Switch>
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
      showState: state.global.showState,
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions,
      ...profileActions,
      ...globalActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
