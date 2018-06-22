import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  Divider,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'

import * as analyticsActions from 'reducers/actions/analytics-actions';

ReactChartkick.addAdapter(Chart)

class AnalyticsContainer extends Component {
  componentWillMount() {
    const { patient, type } = this.props.match.params;

    this.props.actions.getHealthControlsAnalytics(patient, type);
  }

  render() {
    return (
      <div>
        <Button.Group widths='3'>
          <Button>Curva de Crecimiento</Button>
          <Button>Curva de Talla</Button>
          <Button>Curva de PPC</Button>
        </Button.Group>
        <Divider hidden />
        <LineChart data={[this.props.analytics.healthControls]} />
      </div>
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
