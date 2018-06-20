import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Divider,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
import { PieChart } from 'react-chartkick'

import * as analyticsActions from 'reducers/actions/analytics-actions';

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
        <PieChart data={generalData} />

        <Divider horizontal>Datos más específicos</Divider>

        <Grid textAlign='center'>
          <Grid.Row>
            <Grid.Column style={{paddingBottom: '20px'}} computer={8} largeScreen={8} tablet={16} mobile={16}>
              <Header as='h4' content='Tienen refrigerador' />
              <PieChart data={refrigeratorData} />
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={8} largeScreen={8} tablet={16} mobile={16}>
              <Header as='h4' content='Tienen electricidad' />
              <PieChart data={electricityData} />
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={8} largeScreen={8} tablet={16} mobile={16}>
              <Header as='h4' content='Tienen mascota' />
              <PieChart data={petData} />
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={8} largeScreen={8} tablet={16} mobile={16}>
              <Header as='h4' content='Tipos de viviendas' />
              <PieChart data={apartmentType} />
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={8} largeScreen={8} tablet={16} mobile={16}>
              <Header as='h4' content='Tipos de calefacción' />
              <PieChart data={heatingType} />
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={8} largeScreen={8} tablet={16} mobile={16}>
              <Header as='h4' content='Tipos de agua' />
              <PieChart data={waterType} />
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
