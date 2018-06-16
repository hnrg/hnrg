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

import * as usersActions from 'reducers/actions/users-actions';

import UserAdd from 'components/Users/Add';
import UserShow from 'components/Users/Show';
import UserEdit from 'components/Users/Edit';
import UsersList from 'components/Users/List';

const panes = ({ loading, originalUser, fields, isValid, isFetching, error }, actions) => [
  {
    menuItem: { key: 'user', icon: 'user', content: 'Ver perfil' },
    render: () => <Tab.Pane loading={loading} padded='very'><UserShow user={originalUser} /></Tab.Pane>
  },
  {
    menuItem: { key: 'edit', icon: 'edit', content: 'Editar perfil' },
    render: () => (
      <Tab.Pane loading={loading} padded='very'>
        <UserEdit
          user={originalUser}
          fields={fields}
          error={error}
          isValid={isValid}
          isFetching={isFetching}
          onFormFieldChange={actions.onUserFormFieldChange}
          updateUser={actions.updateUser} />
      </Tab.Pane>
    ),
  },
];

class UsersContainer extends Component {
  constructor(props) {
    super(props);

    const {
      originalUser,
      fields,
      error,
      isFetching,
      isValid,
      users,
      totalCount,
      count,
    } = this.props.users;

    this.state = {
      loading: true,
      currentView: 'usersList',
      pageNumber: 0,
      username: '',
      active: true,
      users,
      totalCount,
      count,
      originalUser,
      fields,
      error,
      isValid,
      isFetching,
    };
  }

  componentWillReceiveProps(props) {
    const {
      originalUser,
      fields,
      isFetching,
      isValid,
      users,
      error,
      totalCount,
      count,
    } = props.users;

    this.setState({
      loading: fields.username === '',
      originalUser,
      fields,
      isValid,
      isFetching,
      users,
      error,
      totalCount,
      count,
    });
  }

  componentDidMount() {
    const {
      originalUser,
      fields,
      isFetching,
      isValid,
      users,
      error,
      totalCount,
      count,
    } = this.props.users;

    if (this.props.match.params.username && (originalUser.username === '' || this.props.match.params.username !== originalUser.username)) {
      this.props.actions.getUser(this.props.match.params.username);
      return;
    }

    if (!this.props.match.params.username && this.state.users === null) {
      const { pageNumber, username, active } = this.state;

      this.props.actions.getUsers(pageNumber, username, active);
      return;
    }

    this.setState({
      loading: false,
      originalUser,
      fields,
      isValid,
      isFetching,
      users,
      error,
      totalCount,
      count,
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
    const { actions, match } = this.props;

    return (
      <UsersList
        url={match.url}
        users={this.state.users}
        pageNumber={this.state.pageNumber}
        totalCount={this.state.totalCount}
        count={this.state.count}
        onAddButtonClick={this.onAddButtonClick.bind(this)}
        deleteAction={this.deleteAction.bind(this)}
        enableAction={this.enableAction.bind(this)}
        onSearchFieldChange={this.onSearchFieldChange.bind(this)} />
      );
  }

  userCreate() {
    const { fields, isValid, isFetching, error } = this.state;
    const { actions } = this.props;

    return (
      <UserAdd
        error={error}
        fields={fields}
        isValid={isValid}
        isFetching={isFetching}
        onMount={actions.onUserFormClear}
        onFormFieldChange={actions.onUserFormFieldChange}
        addUser={actions.addUser} />
    );
  }

  render() {
    const { currentView } = this.state;
    const { actions, match } = this.props;

    return (
      <div>
        {
          this.props.match.params.username ?
          <Tab menu={{ secondary: true, pointing: true }} panes={panes(this.state, actions)} /> :
          this[currentView]()
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...usersActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
