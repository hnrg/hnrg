import React, {Component} from 'react';
import {
  Container,
  Button,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';

class Footer extends Component {
  render() {
    const {name, description, email } = this.props;
    return (<Segment
          inverted
          style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
          vertical
        >
          <Container textAlign='center'>
            <Grid columns={2} stackable inverted>
              <Grid.Row>
                <Grid.Column computer={10} mobile={16}>
                  <Header inverted as='h4' content='Descripción' style={{margin: '0 0 10px 0'}} />
                  {description}
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
            <Button circular color='facebook' icon='facebook' as='a' href='https://www.facebook.com/pages/Hospital-Zonal-de-Agudos-Dr-Ricardo-Guti%C3%A9rrez/143694942367566' target='_blank' />
            <Button circular color='orange' icon='map marker alternate' as='a' href='https://www.google.com.ar/maps/place/Hospital+Dr.+Ricardo+Guti%C3%A9rrez/@-34.8957026,-57.9479304,15z/data=!4m2!3m1!1s0x0:0xf673863d8a6bfd43?sa=X&ved=0ahUKEwj2n4bVhuzWAhUFipAKHTdsCesQ_BIIhQEwCg' target='_blank' />
            <Button circular color='green' icon='info' as='a' href='https://clinica-web.com.ar/listing/hospital-dr-ricardo-gutierrez-la-plata/' target='_blank' />
            <Button circular color='red' icon='mail' as='a' href={`mailto:${email}`} />
            <Divider inverted section />
            © 2018 Copyright: {name}
          </Container>
        </Segment>);
  }
}

export default Footer;
