import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../../../actions';
import './login.css';

class LoginContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      email: "",
      password: "",
      error: null
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    var { email, password } = this.state;
    var { history, login } = this.props
    login({email, password});
    history.push('/dashboard');
  }



  handleEmailChange(event, data) {
    this.setState({
      email: data.value,
      error: ""
    });
  }

  handlePasswordChange(event, data) {
    this.setState({
      password: data.value,
      error: ""
    });
  }

  render() {
    return(
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              {' '}Iniciar Sesión
            </Header>
            <Form
              size='large'
              onSubmit={this.handleSubmit}
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  onChange={this.handleEmailChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handlePasswordChange}
                />

                <Button color='teal' fluid size='large'>Login</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(null, actions)(LoginContainer);
