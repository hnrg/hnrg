import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Grid, Menu, Segment } from 'semantic-ui-react';

import Footer from 'components/Footer';

import * as authActions from 'reducers/actions/auth-actions';
import * as globalActions from 'reducers/actions/global-actions';
import * as profileActions from 'reducers/actions/profile-actions';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);

    var { originalProfile } = this.props.profile;

    this.state = {
      activeItem: 'view-profile',
      user: originalProfile
    };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({
      activeItem: name,
    });
  }

  componentWillReceiveProps(props) {
    var { originalProfile } = this.props.profile;

    this.setState({
      user: originalProfile,
    });
  }

  componentDidMount() {
    var { originalProfile } = this.props.profile;

    if (originalProfile.username === null && originalProfile.email === null) {
      this.props.actions.getProfile(this.props.global.currentUser);
    } else {
      this.setState({
        user: originalProfile,
      });
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Container>
          <Grid>
            <Grid.Column width={4}>
              <Menu pointing secondary vertical>
                <Menu.Item
                  name='view-profile'
                  active={activeItem === 'view-profile'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='edit-profile'
                  active={activeItem === 'edit-profile'}
                  onClick={this.handleItemClick}
                />
              </Menu>
            </Grid.Column>
            <Grid.Column stretched width={12}>
              {activeItem === 'view-profile' ?
              <p>This is an stretched grid column. This segment will always match the tab height</p>
            : <p>This is an stretched grid column. This segment will always match the tab</p>}
            </Grid.Column>
          </Grid>
        </Container>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    profile: state.profile,
    global: {
      currentUser: state.global.currentUser,
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...authActions,
      ...profileActions,
      ...globalActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
