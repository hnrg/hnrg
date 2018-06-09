import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as authActions from 'reducers/actions/auth-actions';

import './styles.css';

class LoginContainer extends Component {
  constructor(props, context) {
    super(props, context);

    const { fields, isFetching, isValid } = this.props.auth;

    this.state = {
      fields,
      isValid,
      isFetching,
    };
  }

  componentWillReceiveProps(props) {
    const { fields, isFetching, isValid } = props.auth;

    this.setState({
      fields,
      isValid,
      isFetching,
    });
  }

  componentDidMount() {
    const { fields, isFetching, isValid } = this.props.auth;

    this.setState({
      fields,
      isValid,
      isFetching,
    });
  }

  handleChange(e, { name, value }) {
    this.props.actions.onAuthFormFieldChange(name, value);

    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value,
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fields, isValid, isFetching } = this.props.auth;

    if (!isValid || isFetching) {
      return;
    }

    this.props.actions.login(fields);
  }

  render() {
    const { fields, isValid, isFetching } = this.state;

    return(
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
              {' '}Iniciar Sesión
            </Header>
            <Form
              size='large'
              onSubmit={this.handleSubmit.bind(this)}
            >
              <Segment stacked textAlign='left'>
                <Form.Input
                  label={fields.emailErrorMsg}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Email'
                  name='email'
                  value={fields.email}
                  error={fields.emailHasError}
                  onChange={this.handleChange.bind(this)}
                />
                <Form.Input
                  label={fields.passwordErrorMsg}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Contraseña'
                  type='password'
                  name='password'
                  value={fields.password}
                  error={fields.passwordHasError}
                  onChange={this.handleChange.bind(this)}
                />

                <Button
                  disabled={!isValid || isFetching}
                  color='blue'
                  fluid
                  size='large'
                >
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
