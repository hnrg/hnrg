import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
} from 'semantic-ui-react';

import icon from 'static/icons/icon.png';

class Show extends Component {
  constructor(props) {
    super(props);

    const { user } = this.props;

    this.state = {
      user,
    };
  }

  componentWillReceiveProps(props) {
    const { user } = props;

    this.setState({
      user,
    });
  }

  componentDidMount() {
    const { user } = this.props;

    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;

    return(
      <center>
        <Header as='h2' icon>
          {user.firstName} {user.lastName}
          <Header.Subheader>
            {user.username}
          </Header.Subheader>
        </Header>
        <Divider hidden />
        <Grid>
          <Grid.Row>
            <Grid.Column style={{padding: '0 0 15px 0'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
              <Header as='h4' content='Nombre de Usuario'/>
              {user.username}
            </Grid.Column>
            <Grid.Column style={{padding: '0 0 15px 0'}} computer={6} largeScreen={6} tablet={16} mobile={16}>
              <Header as='h4' content='Email'/>
              {user.email}
            </Grid.Column>
            <Grid.Column style={{padding: '0 0 15px 0'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
              <Header as='h4' content='Fecha de Ingreso'/>
              {moment(user.createdAt).format('LLLL')}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />
        <Button circular color='blue' icon='certificate' title={`Ver roles de ${user.username}`} />
        <Button circular color='blue' icon='bar chart' title='Ver pacientes de pediatras' />
        <Divider hidden />
        <Image size='mini' src={icon} />
      </center>
    );
  }
}

export default Show;
