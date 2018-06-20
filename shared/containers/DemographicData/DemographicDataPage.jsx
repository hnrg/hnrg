import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as patientsActions from 'reducers/actions/patients-actions';
import * as apartamentTypesActions from 'reducers/actions/apartament-types-actions';
import * as heatingTypesActions from 'reducers/actions/heating-types-actions';
import * as waterTypesActions from 'reducers/actions/water-types-actions';

import Footer from 'components/Footer';
import TopMenu from 'components/TopMenu';
//import DemographicDataAdd from 'components/DemographicData/Add';
//import DemographicDataEdit from 'components/DemographicData/Edit';
import DemographicDataList from 'components/DemographicData/List';


class DemographicDataContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      loading: true,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...props,
      loading: props.patients.fields.id === '',
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

    if (!this.props.match.params.id) {
      this.props.actions.getApartamentTypes();
      this.props.actions.getHeatingTypes();
      this.props.actions.getWaterTypes();
    }

    if (!this.props.match.params.id && this.state.patients.patients === null) {
      const { pageNumber } = this.state.patients;

      this.props.actions.getPatients(
          pageNumber,
          undefined,
          undefined,
          undefined,
          undefined,
          true,
      );
      return;
    }

    this.setState({
      ...this.state,
      loading: false,
    });
  }

  render() {
    const { actions, match } = this.props;

    console.log(this.state);
    return (
      <DemographicDataList
        url={match.url}
        patients={this.state.patients.patients}
        pageNumber={this.state.patients.pageNumber}
        totalCount={this.state.patients.totalCount}
        count={this.state.patients.count} />
    );
  }
}

function mapStateToProps(state) {
  return {
    patients: state.patients,
    apartamentTypes: state.apartamentTypes,
    heatingTypes: state.heatingTypes,
    waterTypes: state.waterTypes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...patientsActions,
      ...apartamentTypesActions,
      ...heatingTypesActions,
      ...waterTypesActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DemographicDataContainer);
