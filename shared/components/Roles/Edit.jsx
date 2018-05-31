import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Icon,
} from 'semantic-ui-react';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: this.props.isValid,
      isFetching: this.props.isFetching,
      originalRol: this.props.rol,
      fields: this.props.fields,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const { rol, fields, isValid, isFetching } = props;

    this.setState({
      originalRol: rol,
      fields,
      isValid,
      isFetching,
    });
  }

  componentDidMount() {
    const { rol, fields, isValid, isFetching } = this.props;

    this.setState({
      originalRol: rol,
      fields,
      isValid,
      isFetching,
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

    const { originalRol, fields } = this.state;

    this.props.updateRol(
      originalRol.name,
      fields.name,
      null
    );
  }

  render() {
    const { fields, isValid, isFetching } = this.state;

    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            label={fields.nameErrorMsg || 'Nombre'}
            name='name'
            placeholder='Nombre'
            width={8}
            onChange={this.handleChange}
            value={fields.name}
            error={fields.nameHasError} />
        </Form.Group>
        <Button disabled={!isValid || isFetching} color='teal' fluid size='large'>
          <Icon name='save' size='small' />
          Guardar
        </Button>
      </Form>
    );
  }
}

export default Edit;
