import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

const panes = user => [
  {
    menuItem: { key: 'user', icon: 'user', content: 'Ver perfil' },
    render: () => <Tab.Pane>{user.email}</Tab.Pane>
  },
  {
    menuItem: 'Editar perfil',
    render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>
  },
];

class ProfileContainer extends Component {
  constructor(props) {
    super(props);

    var { originalProfile } = this.props.profile;

    this.state = {
      connectedUser: originalProfile
    };
  }

  componentWillReceiveProps(props) {
    var { originalProfile } = this.props.profile;

    this.setState({
      connectedUser: originalProfile,
    });
  }

  componentDidMount() {
    var { originalProfile } = this.props.profile;

    if (originalProfile.username === null && originalProfile.email === null) {
      this.props.actions.getProfile(this.props.global.currentUser);
    } else {
      this.setState({
        connectedUser: originalProfile,
      });
    }
  }

  render() {
    const { connectedUser } = this.state;

    return (
      <div>
        <Container>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes(connectedUser)} />
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
