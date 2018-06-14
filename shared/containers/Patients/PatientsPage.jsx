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
import * as documentTypesActions from 'reducers/actions/document-types-actions';

import Footer from 'components/Footer';
import TopMenu from 'components/TopMenu';
// import PatientShow from 'components/Patients/Show';
// import PatientEdit from 'components/Patients/Edit';
import PatientsList from 'components/Patients/List';

/*
const panes = ({ loading, originalPatient, fields, isValid, isFetching }, actions) => [
  {
    menuItem: { key: 'patient', icon: 'heartbeat' Ver perfil' },
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
*/

class PatientsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      patients: {
        ...this.props.patients,
        pageNumber: 0,
        firstName: '',
        lastName: '',
        documentType: null,
        documentNumber: null,
      },
      documentTypes: {
        ...this.props.documentTypes,
      }
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      loading: props.patients.fields.documentNumber === null,
      patients: {
        ...props.patients,
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

    console.log(this.state);
  }

  render() {
    const { actions, match } = this.props;

    return (
      <div>
        {
          this.props.match.params.id ?
          <Tab menu={{ secondary: true, pointing: true }} panes={panes(this.state, actions)} /> :
          <PatientsList
            url={match.url}
            patients={this.state.patients.patients}
            documentTypes={this.state.documentTypes.documentTypes}
            pageNumber={this.state.patients.pageNumber}
            totalCount={this.state.patients.totalCount}
            count={this.state.patients.count}
            onSearchFieldChange={this.onSearchFieldChange.bind(this)} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    patients: state.patients,
    documentTypes: state.documentTypes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...patientsActions,
      ...documentTypesActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsContainer);
