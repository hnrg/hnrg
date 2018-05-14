import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import ContentCard from 'components/ContentCard';

import { cards } from './cards';

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = { cards: cards };
  }
  render() {
    let cards = this.state.cards;
    return (
      <div>
        <Navbar />
        { cards.map( (card, id) => <ContentCard key={id} {...card} />) }
        <Footer />
      </div>
    );
  }
}

export default connect()(HomeContainer);
