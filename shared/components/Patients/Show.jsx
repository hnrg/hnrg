import React, {Component} from 'react';
import moment from 'moment-timezone';
import {
  Divider,
  Grid,
  Header,
  Image,
  Message,
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

  showDemographicData() {
    const { demographicData } = this.state.patient;
    if (demographicData) {
      return (
        <Grid>
          <Grid.Column style={{paddingBottom: '20px'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
            <Header as='h4' content='Tiene heladera'/>
              {demographicData.refrigerator ? "Si" : "No" }
          </Grid.Column>
          <Grid.Column style={{paddingBottom: '20px'}} computer={6} largeScreen={6} tablet={16} mobile={16}>
            <Header as='h4' content='Tiene electricidad'/>
              {demographicData.electricity ? "Si" : "No" }
          </Grid.Column>
          <Grid.Column style={{paddingBottom: '20px'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
            <Header as='h4' content='Tiene mascotas'/>
              {demographicData.pet ? "Si" : "No" }
          </Grid.Column>
          <Grid.Column style={{paddingBottom: '20px'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
            <Header as='h4' content='Tipo de vivienda'/>
              {demographicData.apartmentType.name}
          </Grid.Column>
          <Grid.Column style={{paddingBottom: '20px'}} computer={6} largeScreen={6} tablet={16} mobile={16}>
            <Header as='h4' content='Tipo de calefacción'/>
              {demographicData.heatingType.name}
          </Grid.Column>
          <Grid.Column style={{paddingBottom: '20px'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
            <Header as='h4' content='Tipo de agua'/>
              {demographicData.waterType.name}
          </Grid.Column>
        </Grid>
        );
    } else {
      return ( <Message
              info
              header='El paciente no cuenta con datos demográficos.'
              content="Puede ir a la sección de 'Editar paciente' para asignarle datos." /> );
    }
  }

  render() {
    const { firstName, lastName, address, phone, sex, medicalInsurance, documentType, documentNumber } = this.state.patient;

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
              {medicalInsurance && medicalInsurance.name || '---'}
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={6} largeScreen={6} tablet={16} mobile={16}>
              <Header as='h4' content='Tipo de documento'/>
              {documentType && documentType.name}
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
              <Header as='h4' content='Número de documento'/>
              {documentNumber}
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
              <Header as='h4' content='Teléfono'/>
              {phone || "---"}
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={6} largeScreen={6} tablet={16} mobile={16}>
              <Header as='h4' content='Dirección'/>
              {address || "---"}
            </Grid.Column>
            <Grid.Column style={{paddingBottom: '20px'}} computer={5} largeScreen={5} tablet={16} mobile={16}>
              <Header as='h4' content='Sexo'/>
              {sex}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider horizontal>Datos demográficos</Divider>
        {this.showDemographicData()}
        <Divider hidden />
        <Image size='mini' src={icon} />
      </center>
    );
  }
}

export default Show;
