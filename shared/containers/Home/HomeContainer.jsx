import React, { Component } from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
      current: state.configuration.current,
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
      currentConfiguration: this.props.configuration.current,
    };
  }

  componentWillReceiveProps(props) {
    if (_.isEqual(props.configuration.current, this.state.currentConfiguration)) {
      return null;
    }

    this.setState({
      currentConfiguration: props.configuration.current,
    });
  }

  componentDidMount() {
    const { current } = this.props.configuration;

    if (!_.isEqual(current, this.state.currentConfiguration)) {
      this.props.actions.getConfiguration();
      return;
    }

    this.setState({
      currentConfiguration: current,
    });
  }

  render() {
    const { cards, currentConfiguration } = this.state;
    const { webpage } = currentConfiguration;

    return (
      <div>
        <Navbar {...webpage} />
        {cards.map((card, id) => <ContentCard key={id} {...card} left={(id%2) == 0} />)}
        <Footer {...webpage} />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
