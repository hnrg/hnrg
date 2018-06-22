import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container,
  Header,
  Image,
  Segment,
} from 'semantic-ui-react';

import forbidden from 'static/images/forbidden/403.jpg';

import * as configurationActions from 'reducers/actions/configuration-actions';

class ForbiddenContainer extends Component {
  render() {
    const { configuration } = this.props;
    const { email } = configuration.current;
    console.log(email);
    return (
      <Container textAlign='center'>
        <Segment>
          <Header as='h2' content='Error 403' />
          <Image centered size='medium' src={forbidden} />
          <p>Para más información, contáctenos a nuestro <a href={'mailto:' + email}>mail de contacto</a></p>
        </Segment>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    configuration: {
      current: state.configuration.current,
    },
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...configurationActions,
    }, dispatch),
  };
}

export default  connect(mapStateToProps, mapDispatchToProps)(ForbiddenContainer);
