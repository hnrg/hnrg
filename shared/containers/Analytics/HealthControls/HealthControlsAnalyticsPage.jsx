import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Button,
  Divider,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

import * as analyticsActions from 'reducers/actions/analytics-actions';
import * as patientsActions from 'reducers/actions/patients-actions';

ReactChartkick.addAdapter(Chart);

import femaleHeight from 'static/graphs/female-height.json';
import femaleWeight from 'static/graphs/female-weight.json';
import femalePpc from 'static/graphs/female-ppc.json';

import maleHeight from 'static/graphs/male-height.json';
import maleWeight from 'static/graphs/male-weight.json';
import malePpc from 'static/graphs/male-ppc.json';

const graphs = {
  female: {
    height: femaleHeight,
    weight: femaleWeight,
    ppc: femalePpc,
  },
  male: {
    height: maleHeight,
    weight: maleWeight,
    ppc: malePpc,
  },
};

class AnalyticsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: null,
    }
  }

  componentWillMount() {
    this.props.actions.getPatient(this.props.match.params.patient);
  }

  handleClick(type) {
    const self = this;

    return function() {
      const { patient } = self.props.match.params;

      self.props.actions.getHealthControlsAnalytics(patient, type);
      self.setState({
        type,
      });
    }
  }

  render() {
    const { originalPatient } = this.props.patients;
    const { type } = this.state;

    return (
      <Segment>
        <Button.Group widths='3'>
          <Button onClick={this.handleClick('weight')}>Curva de Crecimiento</Button>
          <Button onClick={this.handleClick('height')}>Curva de Talla</Button>
          <Button onClick={this.handleClick('ppc')}>Curva de PPC</Button>
        </Button.Group>
        <Divider hidden />
        {type && <LineChart
          data={this.props.analytics.healthControls ?
            _.union(graphs[originalPatient.sex == 'Masculino' ? 'male' : 'female'][type], [this.props.analytics.healthControls]):
            graphs[originalPatient.sex == 'Masculino' ? 'male' : 'female'][type]
          } />
        }
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    analytics: state.analytics,
    patients: state.patients,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...analyticsActions,
      ...patientsActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);
