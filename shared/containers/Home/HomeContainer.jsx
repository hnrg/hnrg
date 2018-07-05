import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Divider } from 'semantic-ui-react';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import ContentCard from 'components/ContentCard';

import { cards } from './cards';

import * as authActions from 'reducers/actions/auth-actions';
import * as configurationActions from 'reducers/actions/configuration-actions';
import * as globalActions from 'reducers/actions/global-actions';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: cards,
      currentConfiguration: this.props.configuration.current,
      global: this.props.global,
      isLoggedIn: false,
    };
  }

  componentWillMount() {
    this.props.actions.authenticate();
  }

  componentWillReceiveProps(props) {
    this.setState({
      currentConfiguration: props.configuration.current,
      global: props.global,
      isLoggedIn: this.props.auth.authenticated,
    });
  }

  render() {
    const { isLoggedIn, cards, currentConfiguration } = this.state;

    return currentConfiguration.maintenance ?
      <Redirect to='/maintenance' /> :
      <div>
        <Navbar {...currentConfiguration} isLoggedIn={isLoggedIn} />
        <Container textAlign='center'>
          {cards.map((card, id) => (
            <div key={id}>
              <ContentCard {...card} left={(id%2) == 0} />
              <Divider />
            </div>
          ))}
        </Container>
        <Footer {...currentConfiguration} />
      </div>;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    profile: state.profile,
    configuration: {
      current: state.configuration.current,
    },
    global: state.global,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions,
      ...configurationActions,
      ...globalActions,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
