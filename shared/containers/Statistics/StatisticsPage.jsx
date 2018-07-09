import React from 'react';
import { connect } from 'react-redux';
import {
  Segment,
} from "semantic-ui-react";

const Statistics = props => (
  <Segment>
    <h1>Bienvenido al área de trabajo del Hospital de Niños Ricardo Gutierrez</h1>
  </Segment>
);

export default connect()(Statistics);
