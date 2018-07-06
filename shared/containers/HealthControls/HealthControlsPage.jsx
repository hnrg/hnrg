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
import * as healthControlsActions from 'reducers/actions/health-controls-actions';

import permissionsCheck from 'helpers/permissions-check';

import Footer from 'components/Footer';
import TopMenu from 'components/TopMenu';
import HealthControlAdd from 'components/HealthControls/Add';
import HealthControlEdit from 'components/HealthControls/Edit';
import HealthControlsList from 'components/HealthControls/List';
import HealthControlShow from 'components/HealthControls/Show';

const panes = ({ loading, healthControls, granted }, actions) => [
  {
    menuItem: { key: 'healthControl', icon: 'certificate', content: 'Ver control de salud' },
    render: () => (
      <Tab.Pane loading={loading} padded='very'>
        { granted.show === null || granted.show ?
          <HealthControlShow
            healthControl={healthControls.originalHealthControl}
            deletePermissionAction={actions.deletePermissionAction} /> :
          <Redirect to={{ pathname: '/forbidden' }} />
        }
      </Tab.Pane>
    ),
  },
  {
    menuItem: { key: 'edit', icon: 'edit', content: 'Editar control de salud' },
    render: () => (
      <Tab.Pane loading={loading} padded='very'>
        { granted.update === null || granted.update ?
          <HealthControlEdit
            healthControl={healthControls.originalHealthControl}
            error={healthControls.error}
            success={healthControls.success}
            fields={healthControls.fields}
            isValid={healthControls.isValid}
            isFetching={healthControls.isFetching}
            onFormFieldChange={actions.onHealthControlFormFieldChange}
            updateHealthControl={actions.updateHealthControl} /> :
          <Redirect to={{ pathname: '/forbidden' }} />
        }
      </Tab.Pane>
    ),
  },
];

class HealthControlsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      pageNumber: 0,
      currentView: 'healthControlsList',
      granted: {
        new: null,
        update: null,
        destroy: null,
        show: null,
        index: null,
      },
      profile: this.props.profile,
      healthControls: this.props.healthControls,
    };
  }

  componentWillReceiveProps(props) {
    const { fields } = props.healthControls;
    const { originalProfile } = props.profile;

    this.setState({
      loading: fields.name === '',
      profile: props.profile,
      healthControls: props.healthControls,
      granted: {
        new: permissionsCheck(originalProfile, ['control_salud_new']),
        update: permissionsCheck(originalProfile, ['control_salud_update']),
        destroy: permissionsCheck(originalProfile, ['control_salud_destroy']),
        show: permissionsCheck(originalProfile, ['control_salud_show']),
        index: permissionsCheck(originalProfile, ['control_salud_index']),
      },
    });
  }

  componentWillMount() {
    const { originalProfile } = this.state.profile;

    if (originalProfile.username === '') {
      this.props.actions.getProfile().then(() => {
        this.fetchData();
      });

      return;
    }

    this.setState({
      granted: {
        new: permissionsCheck(originalProfile, ['control_salud_new']),
        update: permissionsCheck(originalProfile, ['control_salud_update']),
        destroy: permissionsCheck(originalProfile, ['control_salud_destroy']),
        show: permissionsCheck(originalProfile, ['control_salud_show']),
        index: permissionsCheck(originalProfile, ['control_salud_index']),
      },
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { healthControls, profile, pageNumber, granted, currentView } = this.state;
    const { originalProfile } = profile;
    const { originalHealthControl } = healthControls;

    if (granted.index && !this.props.match.params.param && healthControls.healthControls === null) {
      this.props.actions.getHealthControls(pageNumber);
      return;
    }

    if (granted.show && (this.props.match.params.param && this.props.match.params.param !== 'patient' &&
      (originalHealthControl.name === '' || this.props.match.params.param !== originalHealthControl.name))
    ) {
      this.props.actions.getHealthControl(this.props.match.params.param);
      return;
    }

    this.setState({
      loading: false,
      profile: this.props.profile,
      healthControls: this.props.healthControls,
      granted: {
        new: permissionsCheck(originalProfile, ['control_salud_new']),
        update: permissionsCheck(originalProfile, ['control_salud_update']),
        destroy: permissionsCheck(originalProfile, ['control_salud_destroy']),
        show: permissionsCheck(originalProfile, ['control_salud_show']),
        index: permissionsCheck(originalProfile, ['control_salud_index']),
      },
    });

  }

  deleteAction(healthControl) {
    const self = this;

    return function() {
      self.props.actions.deleteHealthControl(healthControl);
    };
  }

  deletePermissionAction(healthControl, permission) {
    const self = this;

    return function() {
      self.props.actions.deleteHealthControlPermission(healthControl, permission);
    }
  }

  enableAction(healthControl) {
    const self = this;

    return function() {
      self.props.actions.enableHealthControl(healthControl);
    };
  }

  onAddButtonClick() {
    this.setState({
      currentView: 'healthControlCreate',
    });
  }

  healthControlsList() {
    const { actions, match } = this.props;
    const { pageNumber, healthControls, granted } = this.state;

    if (this.props.match.params.param !== 'patient' && (granted.index === null || granted.index)) {
      return <HealthControlsList
          url={match.url}
          healthControls={healthControls.healthControls}
          pageNumber={pageNumber}
          totalCount={healthControls.totalCount}
          count={healthControls.count}
          error={healthControls.error}
          success={healthControls.success}
          granted={granted}
          deleteAction={this.deleteAction.bind(this)}
          enableAction={this.enableAction.bind(this)} />
    }

    this.setState({
      currentView: 'healthControlCreate',
    });
  }

  healthControlCreate() {
    const { permissions, healthControls, granted } = this.state;

    if (!this.props.match.params.id) {
      return <Redirect to={{ pathname: '/not-found' }} />;
    }

    return granted.new === null || granted.new ?
      <HealthControlAdd
        patient={this.props.match.params.id}
        fields={healthControls.fields}
        isValid={healthControls.isValid}
        isFetching={healthControls.isFetching}
        error={healthControls.error}
        success={healthControls.success}
        onMount={this.props.actions.onHealthControlFormClear}
        onFormFieldChange={this.props.actions.onHealthControlFormFieldChange}
        addHealthControl={this.props.actions.addHealthControl} /> :
      <Redirect to={{ pathname: '/forbidden' }} />;
  }

  render() {
    const { currentView } = this.state;
    const { actions, match } = this.props;

    actions.deletePermissionAction = this.deletePermissionAction.bind(this);
    return (
      <div>
        {
          this.props.match.params.param && this.props.match.params.param !== 'patient' ?
          <Tab menu={{ secondary: true, pointing: true }} panes={panes(this.state, actions)} /> :
          this[currentView]()
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    healthControls: state.healthControls,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...profileActions,
      ...healthControlsActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HealthControlsContainer);
