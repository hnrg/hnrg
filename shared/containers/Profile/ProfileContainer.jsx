import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Segment,
  Tab
} from 'semantic-ui-react';

import * as authActions from 'reducers/actions/auth-actions';
import * as globalActions from 'reducers/actions/global-actions';
import * as profileActions from 'reducers/actions/profile-actions';

import Footer from 'components/Footer';
import User from 'components/User';

const panes = ({ loading, connectedUser }) => [
  {
    menuItem: { key: 'user', icon: 'user', content: 'Ver perfil' },
    render: () => <Tab.Pane loading={loading} padded='very'><User user={connectedUser} /></Tab.Pane>
  },
  {
    menuItem: 'Editar perfil',
    render: () => <Tab.Pane loading={loading}>Tab 2 Content</Tab.Pane>
  },
];

class ProfileContainer extends Component {
  constructor(props) {
    super(props);

    const { originalProfile } = this.props.profile;

    this.state = {
      loading: true,
      connectedUser: originalProfile,
    };
  }

  componentWillReceiveProps(props) {
    const { originalProfile } = props.profile;

    this.setState({
      loading: _.isEqual(originalProfile, this.state.currentUser),
      connectedUser: originalProfile,
    });
  }

  componentDidMount() {
    const { originalProfile } = this.props.profile;

    if (!_.isEqual(originalProfile, this.state.currentUser)) {
      this.props.actions.getProfile(this.props.global.currentUser);
      return;
    }

    this.setState({
      loading: false,
      connectedUser: originalProfile,
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Container>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes(this.state)} />
        </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
