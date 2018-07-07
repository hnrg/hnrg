import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as patientsActions from 'reducers/actions/patients-actions';
import * as profileActions from 'reducers/actions/profile-actions';
import * as apartmentTypesActions from 'reducers/actions/apartment-types-actions';
import * as heatingTypesActions from 'reducers/actions/heating-types-actions';
import * as waterTypesActions from 'reducers/actions/water-types-actions';

import Footer from 'components/Footer';
import TopMenu from 'components/TopMenu';
import DemographicDataList from 'components/DemographicData/List';

import permissionsCheck from 'helpers/permissions-check';


class DemographicDataContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      loading: true,
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
    const { originalProfile } = props.profile;

    this.setState({
      ...props,
      granted: {
        new: permissionsCheck(originalProfile, ['paciente_new']),
        update: permissionsCheck(originalProfile, ['paciente_update']),
        destroy: permissionsCheck(originalProfile, ['paciente_destroy']),
        show: permissionsCheck(originalProfile, ['paciente_show']),
        index: permissionsCheck(originalProfile, ['paciente_index']),
      },
      loading: props.patients.fields.id === '',
    });
  }

  componentWillMount() {
    const { originalProfile } = this.state.profile;

    if (!this.props.match.params.id) {
      const { pageNumber } = this.state.patients;

      this.props.actions.getPatients(
          pageNumber,
          undefined,
          undefined,
          undefined,
          undefined,
          true,
      );
    }

    if (originalProfile.username === '') {
      this.props.actions.getProfile().then(() => {
        this.fetchData();
      });

      return;
    }

    this.setState({
      patients: this.props.patients,
      granted: {
        new: permissionsCheck(originalProfile, ['paciente_new']),
        update: permissionsCheck(originalProfile, ['paciente_update']),
        destroy: permissionsCheck(originalProfile, ['paciente_destroy']),
        show: permissionsCheck(originalProfile, ['paciente_show']),
        index: permissionsCheck(originalProfile, ['paciente_index']),
      },
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const {
      originalPatient,
      fields,
      isFetching,
      isValid,
      patients,
      totalCount,
      count,
    } = this.props.patients;

    const { originalProfile } = this.props.profile;

    if (!this.props.match.params.id) {
      this.props.actions.getApartmentTypes();
      this.props.actions.getHeatingTypes();
      this.props.actions.getWaterTypes();
    }

    this.setState({
      granted: {
        new: permissionsCheck(originalProfile, ['paciente_new']),
        update: permissionsCheck(originalProfile, ['paciente_update']),
        destroy: permissionsCheck(originalProfile, ['paciente_destroy']),
        show: permissionsCheck(originalProfile, ['paciente_show']),
        index: permissionsCheck(originalProfile, ['paciente_index']),
      },
    });
  }

  render() {
    const { actions, match } = this.props;
    const { granted } = this.state;

    return granted.index === null || granted.index ?
      <DemographicDataList
        url={match.url}
        patients={this.state.patients.patients}
        pageNumber={this.state.patients.pageNumber}
        totalCount={this.state.patients.totalCount}
        count={this.state.patients.count} /> :
      <Redirect to='/forbidden' />;
  }
}

function mapStateToProps(state) {
  return {
    patients: state.patients,
    profile: state.profile,
    apartmentTypes: state.apartmentTypes,
    heatingTypes: state.heatingTypes,
    waterTypes: state.waterTypes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...patientsActions,
      ...profileActions,
      ...apartmentTypesActions,
      ...heatingTypesActions,
      ...waterTypesActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DemographicDataContainer);
