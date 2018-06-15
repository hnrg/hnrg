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
  Label,
  List,
  Modal,
} from 'semantic-ui-react';

import icon from 'static/icons/icon.png';

class Show extends Component {
  constructor(props) {
    super(props);

    const { patient } = this.props;

    this.state = {
      patient,
    };
  }

  componentWillReceiveProps(props) {
    const { patient } = props;

    this.setState({
      patient,
    });
  }

  componentDidMount() {
    const { patient } = this.props;

    this.setState({
      patient,
    });
  }

  render() {
    const { firstName, lastName, address, phone, sex, demographicData, medicalInsurance, documentType, documentNumber } = this.state.patient;

    const birthday = moment(this.state.patient.birthday);
    birthday.locale('es');

    return(
      <center>
        <Header as='h2' icon>
          {firstName} {lastName}
          <Header.Subheader>
            {birthday.format('LL')}
          </Header.Subheader>
        </Header>
        <Divider hidden />
        <Grid>
          <Grid.Row>
            <Grid.Column style={{paddingBottom: '20px'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
              <Header as='h4' content='Obra social'/>
              {medicalInsurance && medicalInsurance.name}
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
              <Header as='h4' content='Tipo de documento'/>
              {documentType && documentType.name}
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
              <Header as='h4' content='Número de documento'/>
              {documentNumber}
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
              <Header as='h4' content='Teléfono'/>
              {phone}
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
              <Header as='h4' content='Dirección'/>
              {address}
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
              <Header as='h4' content='Sexo'/>
              {sex}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Divider hidden />
        <Image size='mini' src={icon} />
      </center>
    );
  }
}

export default Show;
