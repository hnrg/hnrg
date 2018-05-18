import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UserView extends Component {
  constructor(props) {
    super(props);

    const { user } = this.props;

    this.state = {
      user,
    };
  }

  componentWillReceiveProps(props) {
    const { user } = props;

    this.setState({
      user,
    });
  }

  componentDidMount() {
    const { user } = this.props;

    this.setState({
      user,
    });
  }

  render() {
    return(
      <div>{this.state.user.email}</div>
    );
  }
}

export default UserView;
