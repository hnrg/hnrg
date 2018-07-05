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
import TopMenu from 'components/TopMenu';
import UserShow from 'components/Users/Show';
import UserEdit from 'components/Users/Edit';

const panes = ({ loading, originalProfile, fields, isValid, isFetching, error, success, }, actions) => [
  {
    menuItem: { key: 'user', icon: 'user', content: 'Ver perfil' },
    render: () => <Tab.Pane loading={loading} padded='very'><UserShow user={originalProfile} /></Tab.Pane>
  },
  {
    menuItem: { key: 'edit', icon: 'edit', content: 'Editar perfil' },
    render: () => (
      <Tab.Pane loading={loading} padded='very'>
        <UserEdit
          user={originalProfile}
          fields={fields}
          error={error}
          success={success}
          isValid={isValid}
          isFetching={isFetching}
          onFormFieldChange={actions.onProfileFormFieldChange}
          updateUser={actions.updateProfile} />
      </Tab.Pane>
    ),
  },
];

class ProfileContainer extends Component {
  constructor(props) {
    super(props);

    const { originalProfile, fields, isFetching, isValid, error, success, } = this.props.profile;

    this.state = {
      loading: true,
      originalProfile,
      fields,
      isValid,
      isFetching,
      error,
      success,
    };
  }

  componentWillMount() {
    this.props.actions.getProfile();
  }

  componentWillReceiveProps(props) {
    const { originalProfile, fields, isFetching, isValid, error, success, } = props.profile;

    this.setState({
      loading: this.props.profile.fields.username === '',
      originalProfile,
      fields,
      isValid,
      isFetching,
      error,
      success,
    });
  }

  componentDidMount() {
    const { originalProfile, fields, isFetching, isValid, error, success, } = this.props.profile;

    if (this.props.profile.fields.username === '') {
      this.props.actions.getProfile();
      return;
    }

    this.setState({
      loading: false,
      originalProfile,
      fields,
      isValid,
      isFetching,
      error,
      success,
    });
  }

  render() {
    const { actions } = this.props;

    return (
      <div>
        <TopMenu />
        <Container style={{margin: '95px 0 0 0'}}>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes(this.state, actions)} />
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
