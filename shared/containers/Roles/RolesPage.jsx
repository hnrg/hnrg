import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Message,
  Segment,
  Tab
} from 'semantic-ui-react';

import * as permissionsActions from 'reducers/actions/permissions-actions';
import * as profileActions from 'reducers/actions/profile-actions';
import * as rolesActions from 'reducers/actions/roles-actions';

import { permissionsCheck } from 'helpers/permissions-check';

import Footer from 'components/Footer';
import TopMenu from 'components/TopMenu';
import RolAdd from 'components/Roles/Add';
import RolEdit from 'components/Roles/Edit';
import RolesList from 'components/Roles/List';
import RolShow from 'components/Roles/Show';

const panes = ({ loading, roles, permissions, granted }, actions) => [
  {
    menuItem: { key: 'rol', icon: 'certificate', content: 'Ver rol' },
    render: () => (
      <Tab.Pane loading={loading} padded='very'>
        { granted.show === null || granted.show ?
          <RolShow
            rol={roles.originalRol}
            permissions={permissions.permissions}
            deletePermissionAction={actions.deletePermissionAction} /> :
          <Redirect to={{ pathname: '/forbidden' }} />
        }
      </Tab.Pane>
    ),
  },
  {
    menuItem: { key: 'edit', icon: 'edit', content: 'Editar rol' },
    render: () => (
      <Tab.Pane loading={loading} padded='very'>
        { granted.update === null || granted.update ?
          <RolEdit
            rol={roles.originalRol}
            permissions={permissions.permissions}
            error={roles.error}
            success={roles.success}
            fields={roles.fields}
            isValid={roles.isValid}
            isFetching={roles.isFetching}
            onFormFieldChange={actions.onRolFormFieldChange}
            updateRol={actions.updateRol} /> :
          <Redirect to={{ pathname: '/forbidden' }} />
        }
      </Tab.Pane>
    ),
  },
];

class RolesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      pageNumber: 0,
      rolname: '',
      deleted: false,
      currentView: 'rolesList',
      granted: {
        new: null,
        update: null,
        destroy: null,
        show: null,
        index: null,
      },
    };
  }

  componentWillReceiveProps(props) {
    const { fields } = props.roles;
    const { originalProfile } = props.profile;

    this.setState({
      loading: fields.name === '',
      granted: {
        new: permissionsCheck(originalProfile, ['rol_new']),
        update: permissionsCheck(originalProfile, ['rol_update']),
        destroy: permissionsCheck(originalProfile, ['rol_destroy']),
        show: permissionsCheck(originalProfile, ['rol_show']),
        index: permissionsCheck(originalProfile, ['rol_index']),
      },
    });
  }

  componentWillMount() {
    const { originalProfile } = this.props.profile;

    if (originalProfile.username === '') {
      this.props.actions.getProfile().then(() => {
        this.fetchData();
      });

      return;
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
    this.fetchData();
  }

  fetchData() {
    const { rolname, pageNumber, deleted, granted, currentView } = this.state;
    const { roles, profile, } = this.props;
    const { permissions } = this.props.permissions;
    const { originalProfile } = profile;
    const { originalRol } = roles;

    if (permissions === null) {
      this.props.actions.getPermissions();
    }

    if (granted.index && !this.props.match.params.name && roles.roles === null) {
      this.props.actions.getRoles(pageNumber, rolname, deleted);
      return;
    }

    if (granted.show && this.props.match.params.name && (originalRol.name === '' || this.props.match.params.name !== originalRol.name)) {
      this.props.actions.getRol(this.props.match.params.name);
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

  onAddButtonClick() {
    this.setState({
      currentView: 'rolCreate',
    });
  }

  rolesList() {
    const { actions, match, roles, } = this.props;
    const { pageNumber, granted } = this.state;

    if (granted.index === null || granted.index) {
      return <RolesList
          url={match.url}
          roles={roles.roles}
          pageNumber={pageNumber}
          totalCount={roles.totalCount}
          count={roles.count}
          error={roles.error}
          success={roles.success}
          granted={granted}
          deleteAction={this.deleteAction.bind(this)}
          enableAction={this.enableAction.bind(this)}
          onAddButtonClick={this.onAddButtonClick.bind(this)}
          onSearchFieldChange={this.onSearchFieldChange.bind(this)} />;
    }

    this.setState({
      currentView: 'rolCreate',
    });
  }

  rolCreate() {
    const { granted } = this.state;
    const { permissions, roles, } = this.props;

    return granted.new === null || granted.new ?
      <RolAdd
        permissions={permissions.permissions}
        fields={roles.fields}
        isValid={roles.isValid}
        isFetching={roles.isFetching}
        error={roles.error}
        success={roles.success}
        onMount={this.props.actions.onRolFormClear}
        onFormFieldChange={this.props.actions.onRolFormFieldChange}
        addRol={this.props.actions.addRol} /> :
      <Redirect to={{ pathname: '/forbidden' }} />;
  }

  render() {
    const { currentView } = this.state;
    const { actions, match } = this.props;

    actions.deletePermissionAction = this.deletePermissionAction.bind(this);

    return (
      <div>
        {
          this.props.match.params.name ?
          <Tab menu={{ secondary: true, pointing: true }} panes={panes({...this.state, ...this.props}, actions)} /> :
          this[currentView]()
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    permissions: state.permissions,
    profile: state.profile,
    roles: state.roles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...permissionsActions,
      ...profileActions,
      ...rolesActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RolesContainer);
