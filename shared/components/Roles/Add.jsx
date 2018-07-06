import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Icon,
  Message,
} from 'semantic-ui-react';

const options = (permissions) => {
  return Array.from(permissions || []).map(permission => {
    return {
      key: permission,
      value: permission,
      text: permission,
    };
  });
};

class Add extends Component {
  constructor(props) {
    super(props);

    this.props.onMount();

    this.state = {
      isValid: this.props.isValid,
      isFetching: this.props.isFetching,
      fields: this.props.fields,
      permissions: Array.from(this.props.permissions || []).map(p => p.name),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const { fields, isValid, isFetching, permissions } = props;

    this.setState({
      fields,
      isValid,
      isFetching,
      permissions: Array.from(permissions || []).map(p => p.name),
    });
  }

  componentDidMount() {
    const { fields, isValid, isFetching, permissions } = this.props;

    this.setState({
      fields,
      isValid,
      isFetching,
      permissions: Array.from(permissions || []).map(p => p.name),
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

    this.props.addRol(
      fields.name,
      fields.permissions,
      null
    );
  }

  render() {
    const { fields, isValid, isFetching, permissions } = this.state;
    const { error, success } = this.props;

    return(
      <div>
        {success && <Message positive icon='check' content='La operación fué realizada con éxito.' />}
        {error && <Message negative icon='warning sign' content={error} />}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              label={fields.nameErrorMsg || 'Nombre'}
              name='name'
              placeholder='Nombre'
              width={16}
              onChange={this.handleChange}
              value={fields.name}
              error={fields.nameHasError} />
            <Form.Select
              label={fields.permissionsErrorMsg || 'Permisos'}
              name='permissions'
              placeholder='Permisos'
              width={16}
              multiple
              onChange={this.handleChange}
              value={fields.permissions || []}
              options={options(permissions)}
              error={fields.permissionsHasError} />
          </Form.Group>
          <Button disabled={!isValid || isFetching} color='teal' fluid size='large'>
            <Icon name='save' size='small' />
            Guardar
          </Button>
        </Form>
      </div>
    );
  }
}

export default Add;
