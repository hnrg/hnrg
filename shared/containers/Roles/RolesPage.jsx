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

import * as rolesActions from 'reducers/actions/roles-actions';

import Footer from 'components/Footer';
import TopMenu from 'components/TopMenu';
import RolShow from 'components/Roles/Show';
import RolEdit from 'components/Roles/Edit';
import RolesList from 'components/Roles/List';

const panes = ({ loading, originalRol, fields, isValid, isFetching }, actions) => [
  {
    menuItem: { key: 'rol', icon: 'certificate', content: 'Ver rol' },
    render: () => (
      <Tab.Pane loading={loading} padded='very'>
        <RolShow
          rol={originalRol}
          deletePermissionAction={actions.deletePermissionAction} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: { key: 'edit', icon: 'edit', content: 'Editar rol' },
    render: () => (
      <Tab.Pane loading={loading} padded='very'>
        <RolEdit
          rol={originalRol}
          fields={fields}
          isValid={isValid}
          isFetching={isFetching}
          onFormFieldChange={actions.onRolFormFieldChange}
          updateRol={actions.updateRol} />
      </Tab.Pane>
    ),
  },
];

class RolesContainer extends Component {
  constructor(props) {
    super(props);

    const {
      originalRol,
      fields,
      isFetching,
      isValid,
      roles,
      totalCount,
      count,
    } = this.props.roles;

    this.state = {
      loading: true,
      pageNumber: 0,
      rolname: '',
      deleted: false,
      roles,
      totalCount,
      count,
      originalRol,
      fields,
      isValid,
      isFetching,
    };
  }

  componentWillReceiveProps(props) {
    const {
      originalRol,
      fields,
      isFetching,
      isValid,
      roles,
      totalCount,
      count,
    } = props.roles;

    this.setState({
      loading: fields.name === '',
      originalRol,
      fields,
      isValid,
      isFetching,
      roles,
      totalCount,
      count,
    });
  }

  componentDidMount() {
    const {
      originalRol,
      fields,
      isFetching,
      isValid,
      roles,
      totalCount,
      count,
    } = this.props.roles;

    if (this.props.match.params.name && (originalRol.name === '' || this.props.match.params.name !== originalRol.name)) {
      this.props.actions.getRol(this.props.match.params.name);
      return;
    }

    if (!this.props.match.params.name && this.state.roles === null) {
      const { pageNumber, rolname, deleted } = this.state;

      this.props.actions.getRoles(pageNumber, rolname, deleted);
      return;
    }

    this.setState({
      loading: false,
      originalRol,
      fields,
      isValid,
      isFetching,
      roles,
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
    const { pageNumber, rolname, deleted } = prevState;

    this.props.actions.getRoles(pageNumber, rolname, deleted);

    this.setState({
      pageNumber: 0,
      [name]: value,
    });
  }

  deleteAction(rolname) {
    const self = this;

    return function() {
      self.props.actions.deleteRol(rolname);
    };
  }

  deletePermissionAction(rolname, permission) {
    const self = this;

    return function() {
      self.props.actions.deleteRolPermission(rolname, permission);
    }
  }

  enableAction(rolname) {
    const self = this;

    return function() {
      self.props.actions.enableRol(rolname);
    };
  }

  render() {
    const { actions, match } = this.props;

    actions.deletePermissionAction = this.deletePermissionAction.bind(this);

    return (
      <div>
        {
          this.props.match.params.name ?
          <Tab menu={{ secondary: true, pointing: true }} panes={panes(this.state, actions)} /> :
          <RolesList
            url={match.url}
            roles={this.state.roles}
            pageNumber={this.state.pageNumber}
            totalCount={this.state.totalCount}
            count={this.state.count}
            deleteAction={this.deleteAction.bind(this)}
            enableAction={this.enableAction.bind(this)}
            onSearchFieldChange={this.onSearchFieldChange.bind(this)} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    roles: state.roles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...rolesActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RolesContainer);
