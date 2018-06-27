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
import * as patientsActions from 'reducers/actions/patients-actions';
import * as medicalInsurancesActions from 'reducers/actions/medical-insurances-actions';
import * as documentTypesActions from 'reducers/actions/document-types-actions';
import * as apartmentTypesActions from 'reducers/actions/apartment-types-actions';
import * as heatingTypesActions from 'reducers/actions/heating-types-actions';
import * as waterTypesActions from 'reducers/actions/water-types-actions';

import { permissionsCheck } from 'helpers/permissions-check';

import Footer from 'components/Footer';
import TopMenu from 'components/TopMenu';
import PatientAdd from 'components/Patients/Add';
import PatientShow from 'components/Patients/Show';
import PatientEdit from 'components/Patients/Edit';
import PatientsList from 'components/Patients/List';


const panes = ({ loading, patients, granted, documentTypes, medicalInsurances, apartmentTypes, heatingTypes, waterTypes }, actions) => [
  {
    menuItem: { key: 'patient', icon: 'heartbeat', content: ' Ver paciente' },
    render: () => <Tab.Pane loading={loading} padded='very'>
      { granted.show ?
        <PatientShow patient={patients.originalPatient} /> :
        <Redirect to={{ pathname: '/forbidden' }} />
      }
    </Tab.Pane>
  },
  {
    menuItem: { key: 'edit', icon: 'edit', content: 'Editar paciente' },
    render: () => (
      <Tab.Pane loading={loading} padded='very'>
        { granted.updated === null || granted.update ?
          <PatientEdit
            patient={patients.originalPatient}
            error={patients.error}
            success={patients.success}
            fields={patients.fields}
            isValid={patients.isValid}
            isFetching={patients.isFetching}
            onFormFieldChange={actions.onPatientFormFieldChange}
            updatePatient={actions.updatePatient}
            documentTypes={documentTypes.documentTypes}
            medicalInsurances={medicalInsurances.medicalInsurances}
            apartmentTypes={apartmentTypes.apartmentTypes}
            heatingTypes={heatingTypes.heatingTypes}
            waterTypes={waterTypes.waterTypes} /> :
          <Redirect to={{ pathname: '/forbidden' }} />
        }
      </Tab.Pane>
    ),
  },
];


class PatientsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      loading: true,
      currentView: 'patientsList',
      granted: {
        new: null,
        update: null,
        destroy: null,
        show: null,
        index: null,
      },
      profile: this.props.profile,
      patients: {
        ...this.props.patients,
        pageNumber: 0,
        firstName: '',
        lastName: '',
        documentType: null,
        documentNumber: null,
      },
    };
  }

  componentWillReceiveProps(props) {
    const { originalProfile } = props.profile;

    this.setState({
      ...props,
      loading: props.patients.fields.documentNumber === null,
      granted: {
        new: permissionsCheck(originalProfile, ['paciente_new']),
        update: permissionsCheck(originalProfile, ['paciente_update']),
        destroy: permissionsCheck(originalProfile, ['paciente_destroy']),
        show: permissionsCheck(originalProfile, ['paciente_show']),
        index: permissionsCheck(originalProfile, ['paciente_index']),
      },
    });
  }

  componentWillMount() {
    const { originalProfile } = this.state.profile;

    if (originalProfile.username === '') {
      this.props.actions.getProfile();
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

  componentDidMount() {
    const { granted } = this.state;
    const { originalProfile } = this.props.profile;

    const {
      originalPatient,
      fields,
      isFetching,
      isValid,
      patients,
      totalCount,
      count,
    } = this.props.patients;

    if (granted.show && this.props.match.params.id && (originalPatient.id === '' || this.props.match.params.id !== originalPatient.id)) {
      this.props.actions.getPatient(this.props.match.params.id);
      return;
    }

    if (!this.props.match.params.id) {
      this.props.actions.getDocumentTypes();
      this.props.actions.getMedicalInsurances();
      this.props.actions.getApartmentTypes();
      this.props.actions.getHeatingTypes();
      this.props.actions.getWaterTypes();
    }

    if (granted.index && !this.props.match.params.id) {
      const { pageNumber, firstName, lastName, documentType, documentNumber } = this.state.patients;

      this.props.actions.getPatients(pageNumber, firstName, lastName, documentType, documentNumber);
      return;
    }

    this.setState({
      ...this.props,
      loading: false,
      patients: {
        ...this.state.patients,
        ...this.props.patients,
      },
      granted: {
        new: permissionsCheck(originalProfile, ['paciente_new']),
        update: permissionsCheck(originalProfile, ['paciente_update']),
        destroy: permissionsCheck(originalProfile, ['paciente_destroy']),
        show: permissionsCheck(originalProfile, ['paciente_show']),
        index: permissionsCheck(originalProfile, ['paciente_index']),
      },
    });

    if (granted.index !== null && !granted.index) {
      this.setState({
        currentView: 'patientCreate',
      });
    }
  }

  onSearchFieldChange(e, {name, value}) {
    const prevState = {
      ...this.state,
      patients: {
        ...this.state.patients,
        pageNumber: 0,
        [name]: value,
      },
    };
    const { pageNumber, firstName, lastName, documentType, documentNumber } = prevState.patients;

    this.props.actions.getPatients(pageNumber, firstName, lastName, documentType, documentNumber);

    this.setState({
      patients: {
        ...this.state.patients,
        pageNumber: 0,
        [name]: value,
      },
    });
  }

  onAddButtonClick() {
    this.setState({
      currentView: 'patientCreate',
    });
  }

  patientsList() {
    const { actions, match } = this.props;
    const { granted } = this.state;

    if (granted.index === null || granted.index) {
      return (
        <PatientsList
          url={match.url}
          patients={this.state.patients.patients}
          error={this.state.patients.error}
          success={this.state.patients.success}
          documentTypes={this.state.documentTypes.documentTypes}
          pageNumber={this.state.patients.pageNumber}
          totalCount={this.state.patients.totalCount}
          count={this.state.patients.count}
          granted={granted}
          onAddButtonClick={this.onAddButtonClick.bind(this)}
          deleteAction={this.props.actions.deletePatient}
          onSearchFieldChange={this.onSearchFieldChange.bind(this)} />
      );

    }
  }

  patientCreate() {
    const { originalPatient, fields, isValid, isFetching, error, success } = this.state.patients;
    const { granted } = this.state;
    const { actions } = this.props;

    return granted.new === null || granted.new ?
      <PatientAdd
        patient={originalPatient}
        error={error}
        success={success}
        fields={fields}
        isValid={isValid}
        documentTypes={this.state.documentTypes.documentTypes}
        medicalInsurances={this.state.medicalInsurances.medicalInsurances}
        isFetching={isFetching}
        onMount={actions.onPatientFormClear}
        onFormFieldChange={actions.onPatientFormFieldChange}
        addPatient={actions.addPatient} /> :
      <Redirect to={{ pathname: '/forbidden' }} />;
  }

  render() {
    const { currentView } = this.state;
    const { actions, match } = this.props;

    return (
      <div>
        {
          this.props.match.params.id ?
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
    patients: state.patients,
    documentTypes: state.documentTypes,
    medicalInsurances: state.medicalInsurances,
    apartmentTypes: state.apartmentTypes,
    heatingTypes: state.heatingTypes,
    waterTypes: state.waterTypes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...profileActions,
      ...patientsActions,
      ...medicalInsurancesActions,
      ...documentTypesActions,
      ...apartmentTypesActions,
      ...heatingTypesActions,
      ...waterTypesActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsContainer);
