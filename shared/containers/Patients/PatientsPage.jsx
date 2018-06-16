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

import * as patientsActions from 'reducers/actions/patients-actions';
import * as medicalInsurancesActions from 'reducers/actions/medical-insurances-actions';
import * as documentTypesActions from 'reducers/actions/document-types-actions';

import Footer from 'components/Footer';
import TopMenu from 'components/TopMenu';
import PatientAdd from 'components/Patients/Add';
import PatientShow from 'components/Patients/Show';
import PatientEdit from 'components/Patients/Edit';
import PatientsList from 'components/Patients/List';


const panes = ({ loading, patients, documentTypes, medicalInsurances }, actions) => [
  {
    menuItem: { key: 'patient', icon: 'heartbeat', content: ' Ver paciente' },
    render: () => <Tab.Pane loading={loading} padded='very'><PatientShow patient={patients.originalPatient} /></Tab.Pane>
  },
  {
    menuItem: { key: 'edit', icon: 'edit', content: 'Editar paciente' },
    render: () => (
      <Tab.Pane loading={loading} padded='very'>
        <PatientEdit
          patient={patients.originalPatient}
          fields={patients.fields}
          isValid={patients.isValid}
          isFetching={patients.isFetching}
          onFormFieldChange={actions.onPatientFormFieldChange}
          updatePatient={actions.updatePatient}
          documentTypes={documentTypes.documentTypes}
          medicalInsurances={medicalInsurances.medicalInsurances} />
      </Tab.Pane>
    ),
  },
];


class PatientsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      currentView: 'patientsList',
      patients: {
        ...this.props.patients,
        pageNumber: 0,
        firstName: '',
        lastName: '',
        documentType: null,
        documentNumber: null,
      },
      medicalInsurances: {
        ...this.props.medicalInsurances,
      },
      documentTypes: {
        ...this.props.documentTypes,
      },
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      loading: props.patients.fields.documentNumber === null,
      patients: {
        ...props.patients,
      },
      medicalInsurances: {
        ...props.medicalInsurances,
      },
      documentTypes: {
        ...props.documentTypes,
      },
    });
  }

  componentDidMount() {
    const {
      originalPatient,
      fields,
      isFetching,
      isValid,
      patients,
      totalCount,
      count,
    } = this.props.patients;

    if (this.props.match.params.id && (originalPatient.id === '' || this.props.match.params.id !== originalPatient.id)) {
      this.props.actions.getPatient(this.props.match.params.id);
      return;
    }

    if (!this.props.match.params.id) {
      this.props.actions.getDocumentTypes();
      this.props.actions.getMedicalInsurances();
    }

    if (!this.props.match.params.id && this.state.patients.patients === null) {
      const { pageNumber, firstName, lastName, documentType, documentNumber } = this.state.patients;

      this.props.actions.getPatients(pageNumber, firstName, lastName, documentType, documentNumber);
      return;
    }

    this.setState({
      loading: false,
      patients: {
        ...this.state.patients,
        ...this.props.patients,
      },
      medicalInsurances: {
        ...this.props.medicalInsurances,
      },
      documentTypes: {
        ...this.props.documentTypes,
      },
    });
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

  deleteAction(patientId) {
    const self = this;

    return function() {
      self.props.actions.deletePatient(patientId);
    };
  }

  patientsList() {
    const { match } = this.props;
    return (
      <PatientsList
        url={match.url}
        patients={this.state.patients.patients}
        documentTypes={this.state.documentTypes.documentTypes}
        pageNumber={this.state.patients.pageNumber}
        totalCount={this.state.patients.totalCount}
        count={this.state.patients.count}
        onAddButtonClick={this.onAddButtonClick.bind(this)}
        deleteAction={this.deleteAction.bind(this)}
        onSearchFieldChange={this.onSearchFieldChange.bind(this)} />
    );
  }

  patientCreate() {
    const { originalPatient, fields, isValid, isFetching, error } = this.state.patients;
    const { actions } = this.props;

    return (
        <PatientAdd
          patient={originalPatient}
          error={error}
          fields={fields}
          isValid={isValid}
          documentTypes={this.state.documentTypes.documentTypes}
          medicalInsurances={this.state.medicalInsurances.medicalInsurances}
          isFetching={isFetching}
          onMount={actions.onPatientFormClear}
          onFormFieldChange={actions.onPatientFormFieldChange}
          addPatient={actions.addPatient} />
    );
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
    patients: state.patients,
    documentTypes: state.documentTypes,
    medicalInsurances: state.medicalInsurances,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...patientsActions,
      ...medicalInsurancesActions,
      ...documentTypesActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsContainer);
