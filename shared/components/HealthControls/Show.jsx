import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment-timezone';
import { dateToString } from 'helpers/date';
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  List,
  Modal,
  TextArea,
} from 'semantic-ui-react';

import icon from 'static/icons/icon.png';

class Show extends Component {
  render() {
    const { healthControl } = this.props;

    return(
      <center>
        <Header as='h2' icon>
          Control de Salud
          <Header.Subheader>
            {dateToString(healthControl.date, 'LLLL')}
          </Header.Subheader>
        </Header>
        <Divider hidden />
        <Grid>
          <Divider horizontal>Medidas</Divider>
          <Grid.Row>
            <Grid.Column style={{margin: '0 0 5px 0', padding: '0 0 15px 0'}} computer={4} largeScreen={4} tablet={4} mobile={16}>
              <Header as='h4' content='Peso'/>
              {`${healthControl.weight} gr`}
            </Grid.Column>
            <Grid.Column style={{margin: '0 0 5px 0', padding: '0 0 15px 0'}} computer={4} largeScreen={4} tablet={4} mobile={16}>
              <Header as='h4' content='Talla'/>
              {`${healthControl.height} cm`}
            </Grid.Column>
            <Grid.Column style={{margin: '0 0 5px 0', padding: '0 0 15px 0'}} computer={4} largeScreen={4} tablet={4} mobile={16}>
              <Header as='h4' content='Percentil cefálico'/>
              {`${healthControl.pc} cm`}
            </Grid.Column>
            <Grid.Column style={{margin: '0 0 5px 0', padding: '0 0 15px 0'}} computer={4} largeScreen={4} tablet={4} mobile={16}>
              <Header as='h4' content='Perímetro Percentil cefálico'/>
              {`${healthControl.ppc} cm`}
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal>Chequeos realizados</Divider>
          <Grid.Row>
            <Grid.Column style={{margin: '0 0 5px 0', padding: '0 0 15px 0'}} computer={5} largeScreen={5} tablet={5} mobile={16}>
              <Header as='h4' content='Vacunas completas'/>
              {healthControl.completeVaccines ? 'Si' : 'No'}
            </Grid.Column>
            <Grid.Column style={{margin: '0 0 5px 0', padding: '0 0 15px 0'}} computer={6} largeScreen={6} tablet={6} mobile={16}>
            <Header as='h4' content='Maduración acorde'/>
            {healthControl.accordingMaturationContext ? 'Si' : 'No'}
            </Grid.Column>
            <Grid.Column style={{margin: '0 0 5px 0', padding: '0 0 15px 0'}} computer={5} largeScreen={5} tablet={5} mobile={16}>
            <Header as='h4' content='Examen físico común'/>
            {healthControl.commonPhysicalExamination ? 'Si' : 'No'}
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal>Observaciones</Divider>
          <Grid.Row>
            <Grid.Column style={{padding: '0 0 15px 0'}} computer={16} largeScreen={16} tablet={16} mobile={16}>
              <Header as='h4' content='Vacunas completas'/>
              <Form>
                <TextArea disabled autoHeight placeholder='Observaciones...' style={{margin: '-10px 0px 5px 0px'}} rows={2} value={healthControl.vaccinesObservations} />
              </Form>
            </Grid.Column>
            <Grid.Column style={{padding: '0 0 15px 0'}} computer={16} largeScreen={16} tablet={16} mobile={16}>
              <Header as='h4' content='Maduración'/>
              <Form>
                <TextArea disabled autoHeight placeholder='Observaciones...' style={{margin: '-10px 0px 5px 0px'}} rows={2} value={healthControl.maturationObservations} />
              </Form>
            </Grid.Column>
            <Grid.Column style={{padding: '0 0 15px 0'}} computer={16} largeScreen={16} tablet={16} mobile={16}>
              <Header as='h4' content='Examen físico común'/>
              <Form>
                <TextArea disabled autoHeight placeholder='Observaciones...' style={{margin: '-10px 0px 5px 0px'}} rows={2} value={healthControl.physicalExaminationObservations} />
              </Form>
            </Grid.Column>
            <Divider hidden />
            <Grid.Column style={{padding: '0 0 15px 0'}} computer={16} largeScreen={16} tablet={16} mobile={16}>
              <Header as='h4' content='Alimentación'/>
              <Form>
                <TextArea disabled autoHeight placeholder='Observaciones...' style={{margin: '-10px 0px 5px 0px'}} rows={2} value={healthControl.feeding} />
              </Form>
            </Grid.Column>
            <Divider vertical hidden />
            <Grid.Column style={{padding: '0 0 15px 0'}} computer={16} largeScreen={16} tablet={16} mobile={16}>
              <Header as='h4' content='Generales'/>
              <Form>
                <TextArea disabled autoHeight placeholder='Observaciones...' style={{margin: '-10px 0px 5px 0px'}} rows={2} value={healthControl.generalObservations} />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />
        <Image size='mini' src={icon} />
      </center>
    );
  }
}

export default Show;
