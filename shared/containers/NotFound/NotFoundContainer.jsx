import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Header,
  Segment,
} from 'semantic-ui-react';

import * as configurationActions from 'reducers/actions/configuration-actions';

class NotFoundContainer extends Component {
  render() {
    return (
      <Segment textAlign='center'>
        <Header as='h2' content='Error 404'/>
        <p>
          La dirección que usó para acceder a los servicios del hospital es incorrecta o ha caducado.
        </p>
        <p>
          Si usted cree que esto es un error, no dude en contactarnos a nuestro <a href={'mailto:' + email}>mail de contacto</a>
        </p>
      </Segment>
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

export default  connect(mapStateToProps, mapDispatchToProps)(NotFoundContainer);
