import React, {Component} from 'react';
import {
  Button,
  Form,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';

class Add extends Component {
  constructor(props) {
    super(props);

    this.props.onMount();
  }

  handleChange(e, {name, value}) {
    this.props.onFormFieldChange(name, value);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { fields } = this.props;

    this.props.addPatient(
      fields.firstName,
      fields.lastName,
      fields.address,
      fields.phone,
      fields.birthday,
      fields.sex,
      fields.medicalInsurance,
      fields.documentType,
      fields.documentNumber,
      null
    );
  }

  render() {
    const { fields, isValid, isFetching, error, success } = this.props;

    const sexOptions = [
      { key: "m", value: "Masculino", icon: 'man',text: "Masculino" },
      { key: "f", value: "Femenino", icon: 'woman', text: "Femenino" },
      { key: "o", value: "Otro", icon: 'other gender', text: "Otro" },
    ];

    const documentTypesOptions = Array.from(this.props.documentTypes || []).map((elem) => {
      return { key: elem.name, value: elem._id, icon: 'genderless', text: elem.name };
    });

    const medicalInsurancesOptions = Array.from(this.props.medicalInsurances || []).map((elem) => {
      return { key: elem.name, value: elem._id, text: elem.name };
    });

    return(
      <Segment padded>
        {success && <Message positive icon='check' content='La operación fué realizada con éxito.' />}
        {error && <Message negative icon='warning sign' content={error} />}
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group>
            <Form.Input
              label={fields.firstNameErrorMsg || 'Nombre'}
              name='firstName'
              placeholder='Nombre'
              required
              width={8}
              onChange={this.handleChange.bind(this)}
              value={fields.firstName || ''}
              error={fields.firstNameHasError} />
            <Form.Input
              label={fields.lastNameErrorMsg || 'Apellido'}
              name='lastName'
              placeholder='Apellido'
              required
              width={8}
              onChange={this.handleChange.bind(this)}
              value={fields.lastName || ''}
              error={fields.lastNameHasError} />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label={fields.addressErrorMsg || 'Dirección'}
              name='address'
              placeholder='Direccion'
              width={4}
              onChange={this.handleChange.bind(this)}
              value={fields.address || ''}
              error={fields.addressHasError} />
            <Form.Input
              label={fields.phoneErrorMsg || 'Teléfono'}
              name='phone'
              placeholder='Teléfono'
              width={4}
              onChange={this.handleChange.bind(this)}
              value={fields.phone || ''}
              error={fields.phoneHasError} />
            <Form.Input
              type='date'
              label={fields.birthdayErrorMsg || 'Fecha de nacimiento'}
              name='birthday'
              placeholder='Fecha de nacimiento'
              required
              width={4}
              onChange={this.handleChange.bind(this)}
              value={fields.birthday || ''}
              error={fields.birthdayHasError} />
            <Form.Select
              label={fields.sexErrorMsg || 'Sexo'}
              name='sex'
              placeholder='Sexo'
              width={4}
              onChange={this.handleChange.bind(this)}
              options={sexOptions}
              error={fields.sexHasError} />
          </Form.Group>
          <Form.Group>
            <Form.Select
              label={fields.documentTypeErrorMsg || 'Tipo de documento'}
              name='documentType'
              placeholder='Tipo de documento'
              required
              width={5}
              onChange={this.handleChange.bind(this)}
              options={documentTypesOptions}
              error={fields.documentTypeHasError} />
            <Form.Input
              type='number'
              label={fields.documentNumberErrorMsg || 'Número de documento'}
              name='documentNumber'
              placeholder='Número de documento'
              required
              width={6}
              onChange={this.handleChange.bind(this)}
              value={fields.documentNumber || ''}
              error={fields.documentNumberHasError} />
            <Form.Select
              label={fields.medicalInsuranceErrorMsg || 'Obra social'}
              name='medicalInsurance'
              placeholder='Obra social'
              required
              width={5}
              onChange={this.handleChange.bind(this)}
              options={medicalInsurancesOptions}
              error={fields.medicalInsuranceHasError} />
          </Form.Group>
          <Button disabled={!isValid || isFetching} color='teal' fluid size='large'>
            <Icon name='save' size='small' />
            Guardar
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default Add;
