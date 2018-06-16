import React, {Component} from 'react';
import PropTypes from 'prop-types';
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

    this.state = {
      isValid: this.props.isValid,
      isFetching: this.props.isFetching,
      fields: this.props.fields,
      error: this.props.error,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const { fields, isValid, isFetching, error } = props;

    this.setState({
      fields,
      isValid,
      isFetching,
      error,
    });
  }

  componentDidMount() {
    const { fields, isValid, isFetching, error } = this.props;

    this.setState({
      fields,
      isValid,
      isFetching,
      error,
    });
  }

  handleChange(e, {name, value}) {
    this.props.onFormFieldChange(name, value);

    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { fields } = this.state;

    this.props.addPatient(
      fields.firstName,
      fields.lastName,
      fields.address,
      fields.phone,
      fields.birthday,
      fields.sex,
      fields.documentType,
      fields.documentNumber,
      null
    );
  }

  render() {
    const { fields, isValid, isFetching, error } = this.state;

    const sexOptions = [
      { key: "m", value: "m", icon: 'man',text: "Masculino" },
      { key: "f", value: "f", icon: 'woman', text: "Femenino" },
      { key: "o", value: "o", icon: 'other gender', text: "Otro" },
    ];

    const documentTypesOptions = Array.from(this.props.documentTypes || []).map((elem) => {
      return { key: elem.name, value: elem._id, icon: 'genderless', text: elem.name };
    });

    const medicalInsurancesOptions = Array.from(this.props.medicalInsurances || []).map((elem) => {
      return { key: elem.name, value: elem._id, text: elem.name };
    });

    return(
      <Segment padded>
        {error && <Message negative>
          <Message.Header>Existen errores</Message.Header>
          <p>{error}</p>
        </Message>}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              label={fields.firstNameErrorMsg || 'Nombre'}
              name='firstName'
              placeholder='Nombre'
              required
              width={8}
              onChange={this.handleChange}
              value={fields.firstName || ''}
              error={fields.firstNameHasError} />
            <Form.Input
              label={fields.lastNameErrorMsg || 'Apellido'}
              name='lastName'
              placeholder='Apellido'
              required
              width={8}
              onChange={this.handleChange}
              value={fields.lastName || ''}
              error={fields.lastNameHasError} />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label={fields.addressErrorMsg || 'Dirección'}
              name='address'
              placeholder='Direccion'
              width={4}
              onChange={this.handleChange}
              value={fields.address || ''}
              error={fields.addressHasError} />
            <Form.Input
              label={fields.phoneErrorMsg || 'Teléfono'}
              name='phone'
              placeholder='Teléfono'
              width={4}
              onChange={this.handleChange}
              value={fields.phone || ''}
              error={fields.phoneHasError} />
            <Form.Input
              type='date'
              label={fields.birthdayErrorMsg || 'Fecha de nacimiento'}
              name='birthday'
              placeholder='Fecha de nacimiento'
              required
              width={4}
              onChange={this.handleChange}
              value={fields.birthday || ''}
              error={fields.birthdayHasError} />
            <Form.Select
              label={fields.sexErrorMsg || 'Sexo'}
              name='sex'
              placeholder='Sexo'
              width={4}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              options={documentTypesOptions}
              error={fields.documentTypeHasError} />
            <Form.Input
              label={fields.documentNumberErrorMsg || 'Número de documento'}
              name='documentNumber'
              placeholder='Número de documento'
              required
              width={6}
              onChange={this.handleChange}
              value={fields.documentNumber}
              error={fields.documentNumberHasError} />
            <Form.Select
              label={fields.medicalInsurancesErrorMsg || 'Obra social'}
              name='medicalInsurances'
              placeholder='Obra social'
              required
              width={5}
              onChange={this.handleChange}
              options={medicalInsurancesOptions}
              error={fields.medicalInsurancesHasError} />
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