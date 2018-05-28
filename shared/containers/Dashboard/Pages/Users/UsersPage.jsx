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

import Footer from 'components/Footer';
import TopMenu from 'components/TopMenu';
import UserShow from 'components/Users/Show';
import UserEdit from 'components/Users/Edit';

const panes = ({ loading, originalUser, fields, isValid, isFetching }, actions) => [
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

    const { originalUser, fields, isFetching, isValid } = this.props.users;
    console.log(this.props);
    this.state = {
      loading: true,
      originalUser,
      fields,
      isValid,
      isFetching,
    };
  }

  componentWillReceiveProps(props) {
    const { originalUser, fields, isFetching, isValid } = props.users;

    console.log(props);
    this.setState({
      loading: fields.username === '',
      originalUser,
      fields,
      isValid,
      isFetching,
    });
  }

  componentDidMount() {
    const { originalUser, fields, isFetching, isValid } = this.props.users;

    if (this.props.match.params.username && fields.username === '') {
      this.props.actions.getUser(this.props.match.params.username);
      return;
    }

    this.setState({
      loading: false,
      originalUser,
      fields,
      isValid,
      isFetching,
    });
  }

  render() {
    const { actions } = this.props;
    console.log(this.state);
    console.log(this.props);

    return (
      <div>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes(this.state, actions)} />
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
