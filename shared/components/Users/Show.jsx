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

  getRoles() {
    const { user } = this.state;

    return(
      <List horizontal relaxed selection verticalAlign='middle'>
        {user.roles && user.roles.map((rol, id) => (
          <List.Item key={id}>
            <List.Content>
              <List.Header as={Link} to={`/dashboard/roles/${rol.name}`}>{rol.name} - {rol.permissions.length}</List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }

  render() {
    const { user } = this.state;

    const createdAt = moment(user.createdAt);
    createdAt.locale('es');

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
              {createdAt.format('LLLL')}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />
        <Modal
          size='tiny'
          dimmer='blurring'
          trigger={<Button circular color='blue' icon='certificate' title={`Ver roles de ${user.username}`} />}>
          <Modal.Header>Roles de {user.username}</Modal.Header>
          <Modal.Content>
            {this.getRoles()}
          </Modal.Content>
        </Modal>
        <Button circular color='blue' icon='bar chart' title='Ver pacientes de pediatras' />
        <Divider hidden />
        <Image size='mini' src={icon} />
      </center>
    );
  }
}

export default Show;
