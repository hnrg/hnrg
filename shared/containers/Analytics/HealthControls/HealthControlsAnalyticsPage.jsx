import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

ReactChartkick.addAdapter(Chart);

class AnalyticsContainer extends Component {
  handleClick(type) {
    const self = this;

    return function() {
      const { patient } = self.props.match.params;

      self.props.actions.getHealthControlsAnalytics(patient, type);
    }
  }

  render() {
    const { patient } = this.props.match.params;
    console.log(this.props.match);

    return (
      <Segment>
        <Button.Group widths='3'>
          <Button onClick={this.handleClick('height')}>Curva de Crecimiento</Button>
          <Button onClick={this.handleClick('weight')}>Curva de Talla</Button>
          <Button onClick={this.handleClick('ppc')}>Curva de PPC</Button>
        </Button.Group>
        <Divider hidden />
        {this.props.analytics.healthControls && <LineChart data={[this.props.analytics.healthControls]} />}
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
