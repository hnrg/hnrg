import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import dateToString from 'helpers/date';
import {
  Button,
  Divider,
  Header,
  Form,
  Icon,
  Message,
} from 'semantic-ui-react';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, {name, value}) {
    const newValue = [
      'completeVaccines',
      'accordingMaturationContext',
      'commonPhysicalExamination'
    ].find(e => e == name) ? !this.props.fields[name] : value;

    this.props.onFormFieldChange(name, newValue);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { healthControl, fields } = this.props;

    this.props.updateHealthControl(
      healthControl.id,
      fields.date,
      fields.weight,
      fields.pc,
      fields.ppc,
      fields.height,
      fields.completeVaccines,
      fields.vaccinesObservations,
      fields.accordingMaturationContext,
      fields.maturationObservations,
      fields.commonPhysicalExamination,
      fields.physicalExaminationObservations,
      fields.feeding,
      fields.generalObservations,
      null
    );
  }

  render() {
    const { healthControl, fields, isValid, isFetching } = this.props;
    const { error, success } = this.props;

    return(
      <div>
        <Header as='h2' icon>
          {healthControl.patient.firstName} {healthControl.patient.lastName}
          <Header.Subheader>
            {dateToString(healthControl.date, 'LLLL')}
          </Header.Subheader>
        </Header>
        {success && <Message positive icon='check' content='La operación fué realizada con éxito.' />}
        {error && <Message negative icon='warning sign' content={error} />}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              type='date'
              label={fields.dateErrorMsg || 'Fecha de realización'}
              name='date'
              placeholder='Fecha de realización'
              required
              width={4}
              onChange={this.handleChange}
              value={moment(fields.date).format('YYYY-MM-DD')}
              error={fields.dateHasError} />
          </Form.Group>
          <Header as='h3' content='Medidas' />
          <Form.Group>
            <Form.Input
              label={fields.weightErrorMsg || 'Peso'}
              name='weight'
              placeholder='Peso'
              width={4}
              onChange={this.handleChange}
              value={fields.weight}
              error={fields.weightHasError} />
            <Form.Input
              label={fields.heightErrorMsg || 'Talla'}
              name='height'
              placeholder='Talla'
              width={4}
              onChange={this.handleChange}
              value={fields.height}
              error={fields.heightHasError} />
            <Form.Input
              label={fields.pcErrorMsg || 'Percentil cefálico'}
              name='pc'
              placeholder='Percentil cefálico'
              width={4}
              onChange={this.handleChange}
              value={fields.pc}
              error={fields.pcHasError} />
            <Form.Input
              label={fields.ppcErrorMsg || 'Perímetro percentil cefálico'}
              name='ppc'
              placeholder='Perímetro percentil cefálico'
              width={4}
              onChange={this.handleChange}
              value={fields.ppc}
              error={fields.ppcHasError} />
          </Form.Group>
          <Header as='h3' content='Chequeos realizados' />
          <Form.Group>
            <Form.Checkbox
              label={fields.completeVaccinesErrorMsg || 'Vacunas completas'}
              name='completeVaccines'
              width={5}
              onChange={this.handleChange}
              checked={fields.completeVaccines}
              value={fields.completeVaccines ? 'on' : 'off'}
              error={fields.completeVaccinesHasError} />
            <Form.Checkbox
              label={fields.accordingMaturationContextErrorMsg || 'Maduración acorde'}
              name='accordingMaturationContext'
              width={6}
              onChange={this.handleChange}
              checked={fields.accordingMaturationContext}
              value={fields.accordingMaturationContext ? 'on' : 'off'}
              error={fields.accordingMaturationContextHasError} />
            <Form.Checkbox
              label={fields.commonPhysicalExaminationErrorMsg || 'Examen físico común'}
              name='commonPhysicalExamination'
              width={5}
              onChange={this.handleChange}
              checked={fields.commonPhysicalExamination}
              value={fields.commonPhysicalExamination ? 'on' : 'off'}
              error={fields.commonPhysicalExaminationHasError} />
          </Form.Group>
          <Header as='h3' content='Observaciones' />
          <Form.Group>
            <Form.TextArea
              label={fields.vaccinesObservationsErrorMsg || 'Vacunas completas'}
              placeholder='Observaciones...'
              width={16}
              name='vaccinesObservations'
              value={fields.vaccinesObservations || ''}
              error={fields.vaccinesObservationsHasError}
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              label={fields.maturationObservationsErrorMsg || 'Maduración'}
              placeholder='Observaciones...'
              width={16}
              name='maturationObservations'
              value={fields.maturationObservations || ''}
              error={fields.maturationObservationsHasError}
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              label={fields.physicalExaminationObservationsErrorMsg || 'Examen físico común'}
              placeholder='Observaciones...'
              width={16}
              name='physicalExaminationObservations'
              value={fields.physicalExaminationObservations || ''}
              error={fields.physicalExaminationObservationsHasError}
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              label={fields.feedingErrorMsg || 'Alimentación'}
              placeholder='Observaciones...'
              width={16}
              name='feeding'
              value={fields.feeding || ''}
              error={fields.feedingHasError}
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              label={fields.generalObservationsErrorMsg || 'Generales'}
              placeholder='Observaciones...'
              width={16}
              name='generalObservations'
              value={fields.generalObservations || ''}
              error={fields.generalObservationsHasError}
              onChange={this.handleChange} />
          </Form.Group>
          <Divider hidden />
          <Button disabled={!isValid || isFetching} color='teal' fluid size='large'>
            <Icon name='save' size='small' />
            Guardar
          </Button>
        </Form>
      </div>
    );
  }
}

export default Edit;
