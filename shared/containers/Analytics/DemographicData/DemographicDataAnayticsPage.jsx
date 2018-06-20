import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Divider,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'

import * as analyticsActions from 'reducers/actions/analytics-actions';

ReactChartkick.addAdapter(Chart)

class AnalyticsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...props,
    });
  }

  componentDidMount() {
    this.props.actions.getDemographicDataAnalytics();

    this.setState({
      ...this.props,
    });
  }

  render() {
    const { demographicDataAnalytics } = this.props.analytics;

    const { totalCount, patientsWithDemographicData } = demographicDataAnalytics;

    const {
      refrigerator,
      electricity,
      pet,
      apartmentType,
      heatingType,
      waterType,
    } = demographicDataAnalytics.data;

    const generalData = {
      "Pacientes con datos demográficos": patientsWithDemographicData,
      "Pacientes sin datos demográficos": totalCount - patientsWithDemographicData,
    };

    const refrigeratorData = {
      "Pacientes con refrigerador": refrigerator.count,
      "Pacientes sin refrigerador": refrigerator.without,
    };
    const electricityData = {
      "Pacientes con electricidad": electricity.count,
      "Pacientes sin electricidad": electricity.without,
    };

    const petData = {
      "Pacientes con mascota": pet.count,
      "Pacientes sin mascota": pet.without,
    };

    return (
      <Segment textAlign='center'>
        <Header as='h2' content='Estadísticas generales sobre datos demográficos' />
        <PieChart data={generalData} download='general-data' />

        <Divider horizontal>Datos más específicos</Divider>

        <Grid textAlign='center'>
          <Grid.Row>
            <Grid.Column style={{paddingBottom: '20px'}} computer={8} largeScreen={8} tablet={16} mobile={16}>
              <Header as='h4' content='Tienen refrigerador' />
              <PieChart data={refrigeratorData} download='refrigerator-data' />
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={8} largeScreen={8} tablet={16} mobile={16}>
              <Header as='h4' content='Tienen electricidad' />
              <PieChart data={electricityData} download='electricity-data' />
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={8} largeScreen={8} tablet={16} mobile={16}>
              <Header as='h4' content='Tienen mascota' />
              <PieChart data={petData} download='pet-data' />
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={8} largeScreen={8} tablet={16} mobile={16}>
              <Header as='h4' content='Tipos de viviendas' />
              <PieChart data={apartmentType} download='apartamentType-data' />
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={8} largeScreen={8} tablet={16} mobile={16}>
              <Header as='h4' content='Tipos de calefacción' />
              <PieChart data={heatingType} download='heatingType-data' />
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={8} largeScreen={8} tablet={16} mobile={16}>
              <Header as='h4' content='Tipos de agua' />
              <PieChart data={waterType} download='waterType-data' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    analytics: state.analytics,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...analyticsActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);
