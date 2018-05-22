import _ from 'lodash';
import React, {Component} from 'react';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility
} from 'semantic-ui-react';

import {
  menuStyle,
  fixedMenuStyle,
  overlayStyle,
  fixedOverlayStyle,
  overlayMenuStyle,
  fixedOverlayMenuStyle,
} from './styles';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.handleOverlayRef = this.handleOverlayRef.bind(this);
    this.stickOverlay = this.stickOverlay.bind(this);
    this.stickTopMenu = this.stickTopMenu.bind(this);
    this.unStickOverlay = this.unStickOverlay.bind(this);
    this.unStickTopMenu = this.unStickTopMenu.bind(this);

    this.state = {
      menuFixed: false,
      overlayFixed: false
    };
  }

  handleOverlayRef(c) {
    const {overlayRect} = this.state;

    if (!overlayRect) {
      this.setState({
        overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width')
      });
    }
  }

  stickOverlay() {
    return this.setState({overlayFixed: true});
  }

  stickTopMenu() {
    return this.setState({menuFixed: true});
  }

  unStickOverlay() {
    return this.setState({overlayFixed: false});
  }

  unStickTopMenu() {
    return this.setState({menuFixed: false});
  }

  render() {
    const {menuFixed, overlayFixed, overlayRect} = this.state;

    return (<div>
      {/* Heads up, style below isn't necessary for correct work of example, simply our docs defines other
            background color.
          */
      }
      <Container text style={{
            marginTop: '2em'
          }}>
          <Header as='h1'>Hospital de Niños Ricargo Gutierrez</Header>
        </Container>

        {/* Attaching the top menu is a simple operation, we only switch `fixed` prop and add another style if it has
            gone beyond the scope of visibility
          */
      }
      <Visibility onBottomPassed={this.stickTopMenu} onBottomVisible={this.unStickTopMenu} once={false}>
        <Menu borderless fixed={menuFixed && "top"} style={menuFixed
            ? fixedMenuStyle
            : menuStyle}>
          <Container text>
            <Menu.Item>
              <Image size='mini' src='/logo.png'/>
            </Menu.Item>
            <Menu.Item header>HNRG</Menu.Item>
            <Menu.Item as='a' href='/'>Inicio</Menu.Item>

            <Menu.Menu position='right'>
              <Menu.Item as='a' href='/login'>Iniciar Sesión</Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </Visibility>
    </div>);
  }
}

export default Footer;
