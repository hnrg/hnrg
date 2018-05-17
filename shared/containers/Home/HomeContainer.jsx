import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import ContentCard from 'components/ContentCard';

import { cards } from './cards';

import * as authActions from 'reducers/actions/auth-actions';
import * as configurationActions from 'reducers/actions/configuration-actions';
import * as globalActions from 'reducers/actions/global-actions';

function mapStateToProps(state) {
  return {
    auth: {
      isFetching: state.auth.isFetching,
    },
    configuration: {
      currentConfiguration: state.configuration.currentConfiguration,
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState,
    },
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


class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: cards,
      currentConfiguration: null
    };
  }

  static getDerivatedStateFromProps(nextProps, prevState) {
    if (!_.isEqual(nextProps.configuration.currentConfiguration, prevState.currentConfiguration)) {
      return null;
    }

    return {
      currentConfiguration: nextProps.configuration.currentConfiguration,
    };
  }

  componentDidMount() {
    const { currentConfiguration } = this.props.configuration;

    if (!_.isEqual(currentConfiguration, this.state.currentConfiguration)) {
      this.props.actions.getConfiguration();
      return;
    }

    this.setState({
      configuration: currentConfiguration,
    });
  }

  render() {
    const { cards, currentConfiguration } = this.state;

    return (
      <div>
        <Navbar />
        { cards.map((card, id) => <ContentCard key={id} {...card} />) }
        <Footer {...currentConfiguration.webpage} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
