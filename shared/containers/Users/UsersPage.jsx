import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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

import * as profileActions from 'reducers/actions/profile-actions';
import * as rolesActions from 'reducers/actions/roles-actions';
import * as usersActions from 'reducers/actions/users-actions';

import { permissionsCheck } from 'helpers/permissions-check';

import UserAdd from 'components/Users/Add';
import UserShow from 'components/Users/Show';
import UserEdit from 'components/Users/Edit';
import UsersList from 'components/Users/List';

const panes = ({ loading, users, granted, roles }, actions) => [
  {
    menuItem: { key: 'user', icon: 'user', content: 'Ver perfil' },
    render: () => <Tab.Pane loading={loading} padded='very'>
      { granted.show === null || granted.show ?
        <UserShow
          rolesEditShow={true}
          user={users.originalUser}
          roles={roles.allRoles}
          fields={users.fields}
          error={users.error}
          success={users.success}
          isValid={users.isValid}
          isFetching={users.isFetching}
          onFormFieldChange={actions.onUserFormFieldChange}
          updateUser={actions.updateUser} /> :
        <Redirect to={{ pathname: '/forbidden' }} />
      }
    </Tab.Pane>
  },
  {
    menuItem: { key: 'edit', icon: 'edit', content: 'Editar perfil' },
    render: () => (
      <Tab.Pane loading={loading} padded='very'>
        { granted.update === null || granted.update ?
          <UserEdit
            user={users.originalUser}
            fields={users.fields}
            error={users.error}
            success={users.success}
            isValid={users.isValid}
            isFetching={users.isFetching}
            onFormFieldChange={actions.onUserFormFieldChange}
            updateUser={actions.updateUser} /> :
          <Redirect to={{ pathname: '/forbidden' }} />
        }
      </Tab.Pane>
    ),
  },
];

class UsersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      currentView: 'usersList',
      pageNumber: 0,
      username: '',
      active: true,
      granted: {
        new: null,
        update: null,
        destroy: null,
        show: null,
        index: null,
      }
    };
  }

  componentWillReceiveProps(props) {
    const { users, profile } = props;
    const { originalProfile } = profile;

    this.setState({
      loading: users.fields.username === '',
      granted: {
        new: permissionsCheck(originalProfile, ['rol_new']),
        update: permissionsCheck(originalProfile, ['rol_update']),
        destroy: permissionsCheck(originalProfile, ['rol_destroy']),
        show: permissionsCheck(originalProfile, ['rol_show']),
        index: permissionsCheck(originalProfile, ['rol_index']),
      },
      users,
    });
  }

  componentWillMount() {
    const { originalProfile } = this.props.profile;
    const { allRoles } = this.props.roles;

    if (originalProfile.username === '') {
      this.props.actions.getProfile();
    }

    if (allRoles === null) {
      this.props.actions.getAllRoles();
    }

    this.setState({
      granted: {
        new: permissionsCheck(originalProfile, ['rol_new']),
        update: permissionsCheck(originalProfile, ['rol_update']),
        destroy: permissionsCheck(originalProfile, ['rol_destroy']),
        show: permissionsCheck(originalProfile, ['rol_show']),
        index: permissionsCheck(originalProfile, ['rol_index']),
      },
    });
  }

  componentDidMount() {
    const { granted } = this.state;

    const {
      originalUser,
      fields,
      isFetching,
      isValid,
      users,
      error,
      success,
      totalCount,
      count,
    } = this.props.users;

    const { originalProfile } = this.props.profile;

    if (granted.show && this.props.match.params.username && (originalUser.username === '' || this.props.match.params.username !== originalUser.username)) {
      this.props.actions.getUser(this.props.match.params.username);
      return;
    }

    if (granted.index && !this.props.match.params.username && users === null) {
      const { pageNumber, username, active } = this.state;

      this.props.actions.getUsers(pageNumber, username, active);
      return;
    }

    this.setState({
      loading: false,
      granted: {
        new: permissionsCheck(originalProfile, ['rol_new']),
        update: permissionsCheck(originalProfile, ['rol_update']),
        destroy: permissionsCheck(originalProfile, ['rol_destroy']),
        show: permissionsCheck(originalProfile, ['rol_show']),
        index: permissionsCheck(originalProfile, ['rol_index']),
      },
    });
  }

  onSearchFieldChange(e, {name, value}) {
    const prevState = {
      ...this.state,
      pageNumber: 0,
      [name]: value,
    };
    const { pageNumber, username, active } = prevState;

    this.props.actions.getUsers(pageNumber, username, active);

    this.setState({
      pageNumber: 0,
      [name]: value,
    });
  }

  onAddButtonClick() {
    this.setState({
      currentView: 'userCreate',
    });
  }

  deleteAction(username) {
    const self = this;

    return function() {
      self.props.actions.deleteUser(username);
    };
  }

  enableAction(username) {
    const self = this;

    return function() {
      self.props.actions.enableUser(username);
    };
  }

  usersList() {
    const { actions, match, users } = this.props;
    const { granted } = this.state;

    if (granted.index === null || granted.index) {
      return <UsersList
          url={match.url}
          users={users.users}
          pageNumber={users.pageNumber}
          totalCount={users.totalCount}
          count={users.count}
          error={users.error}
          success={users.success}
          granted={granted}
          onAddButtonClick={this.onAddButtonClick.bind(this)}
          deleteAction={this.deleteAction.bind(this)}
          enableAction={this.enableAction.bind(this)}
          onSearchFieldChange={this.onSearchFieldChange.bind(this)} />;
    }

    this.setState({
      currentView: 'userCreate',
    });
  }

  userCreate() {
    const { granted } = this.state;
    const { actions, users } = this.props;

    return granted.new === null || granted.new ?
      <UserAdd
        error={users.error}
        success={users.success}
        fields={users.fields}
        isValid={users.isValid}
        isFetching={users.isFetching}
        onMount={actions.onUserFormClear}
        onFormFieldChange={actions.onUserFormFieldChange}
        addUser={actions.addUser} /> :
      <Redirect to={{ pathname: '/forbidden' }} />;
  }

  render() {
    const { currentView } = this.state;
    const { actions, match } = this.props;

    return (
      <div>
        {
          this.props.match.params.username ?
          <Tab menu={{ secondary: true, pointing: true }} panes={panes({...this.state, ...this.props}, actions)} /> :
          this[currentView]()
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    roles: state.roles,
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...profileActions,
      ...usersActions,
      ...rolesActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
