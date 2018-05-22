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
                    <List.Item as='a' href='https://www.facebook.com/pages/Hospital-Zonal-de-Agudos-Dr-Ricardo-Guti%C3%A9rrez/143694942367566' target='_blank'>Facebook</List.Item>
                    <List.Item as='a' href='https://wego.here.com/directions/mylocation/e-eyJuYW1lIjoiSG9zcGl0YWwgWm9uYWwgZGUgQWd1ZG9zIFwiRHIuIFJpY2FyZG8gR3V0aVx1MDBlOXJyZXpcIiIsImFkZHJlc3MiOiJEaWFnLiAxMTQgeSAzOSwgTGEgUGxhdGEiLCJsYXRpdHVkZSI6LTM0Ljg5NTg4MjEwMzg3OSwibG9uZ2l0dWRlIjotNTcuOTQ4MDcwMTg5NjMxLCJwcm92aWRlck5hbWUiOiJmYWNlYm9vayIsInByb3ZpZGVySWQiOjE0MzY5NDk0MjM2NzU2Nn0=?map=-34.895882103879,-57.948070189631,15,normal&ref=facebook&link=addresses&fb_locale=es_ES' target='_blank'>Como llegar</List.Item>
                    <List.Item as='a' href='callto:+54-0221-483-0171'>Llamar a teléfono</List.Item>
                    <List.Item as='a' href='https://clinica-web.com.ar/listing/hospital-dr-ricardo-gutierrez-la-plata/' target='_blank'>Más información</List.Item>
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
