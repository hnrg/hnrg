import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment-timezone';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Modal,
} from 'semantic-ui-react';

import icon from 'static/icons/icon.png';

class Show extends Component {
  constructor(props) {
    super(props);

    const { rol } = this.props;

    this.state = {
      rol,
    };
  }

  componentWillReceiveProps(props) {
    const { rol } = props;

    this.setState({
      rol,
    });
  }

  componentDidMount() {
    const { rol } = this.props;

    this.setState({
      rol,
    });
  }

  render() {
    const { rol } = this.state;

    return(
      <center>
        <Header as='h2' icon>
          {rol.name}
        </Header>
        <Divider hidden />
        <Image size='mini' src={icon} />
      </center>
    );
  }
}

export default Show;
