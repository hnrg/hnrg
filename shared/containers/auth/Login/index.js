import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './login.css';
import * as actions from '../../../actions';

class LoginContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: "admin@hnrg.com",
      password: "admin",
      error: null
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    var { email, password } = this.state;
    var { history, loginUser } = this.props
    loginUser({email, password});
    history.push('/dashboard');
  }

  handleChange(property) {
    return
      event => {
      this.setState({
        [property]: event.target.value,
        error: null
      });
    }
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
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange}
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
