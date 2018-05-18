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
    const { name, description } = this.props;

    return (
      <Segment inverted="inverted" style={{
        margin: '5em 0em 0em',
        padding: '5em 0em'
      }} vertical="vertical">
      <Container textAlign='center'>
        <Grid columns={2} divided="divided" stackable="stackable" inverted="inverted">
          <Grid.Row>
            <Grid.Column computer={10} mobile={16}>
              <Header inverted="inverted" as='h4' content='Descripción'/>
              {description}
            </Grid.Column>
            <Divider hidden />
            <Grid.Column computer={6} mobile={16}>
              <Header inverted="inverted" as='h4' content='Enlaces'/>
              <List link="link" inverted="inverted">
                <List.Item as='a'>Facebook</List.Item>
                <List.Item as='a'>Como llegar</List.Item>
                <List.Item as='a'>Llamar a teléfono</List.Item>
                <List.Item as='a'>Más información</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider inverted="inverted" section="section"/>
        <Image src='/logo.png' centered="centered" size='mini'/>
        <Divider inverted="inverted" section="section"/>
        © 2018 Copyright: {name}
      </Container>
    </Segment>);
  }
}

export default Footer;
