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

class Footer extends Component {
  render() {
    return (<Segment
          inverted
          style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
          vertical
        >
          <Container textAlign='center'>
            <Grid columns={2} divided stackable inverted>
              <Grid.Row>
                <Grid.Column computer={10} mobile={16}>
                  <Header inverted as='h4' content='Descripción' />
                </Grid.Column>
                <Divider hidden />
                <Grid.Column computer={6} mobile={16}>
                  <Header inverted as='h4' content='Enlaces' />
                  <List link inverted>
                    <List.Item as='a'>Facebook</List.Item>
                    <List.Item as='a'>Como llegar</List.Item>
                    <List.Item as='a'>Llamar a teléfono</List.Item>
                    <List.Item as='a'>Más información</List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider inverted section />
            <Image src='/logo.png' centered size='mini' />
            <Divider inverted section />
            © 2018 Copyright: Hospital de Niños Ricardo Gutierrez
          </Container>
        </Segment>);
  }
}

export default Footer;
