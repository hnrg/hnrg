import React, {Component} from 'react';
import {
  Container,
  Divider,
  Header,
  Image,
  Segment,
  Item,
  Icon,
  Grid,
} from 'semantic-ui-react';

const LeftCard = props => (
  <Grid.Row>
    <Grid.Column computer={6} largeScreen={6} tablet={16} mobile={16}>
      <Image src={props.img} style={{
        padding: "0 0 20px 0"
      }} />
    </ Grid.Column>
    <Grid.Column computer={10} largeScreen={10} tablet={16} mobile={16} textAlign="left">
      <Header as='h3' color={props.color}>
        <Icon name={props.icon} size='tiny'/>
        {props.subtitle}
      </Header>
      <Header as='h1'>{props.title}</Header>
      {props.text}
    </ Grid.Column>
  </ Grid.Row>
);

const RightCard = props => (
  <Grid.Row>
    <Grid.Column computer={10} largeScreen={10} tablet={16} mobile={16} textAlign="left">
      <Header as='h3' color={props.color}>
        <Icon name={props.icon} size='tiny'/>
        {props.subtitle}
      </Header>
      <Header as='h1'>{props.title}</Header>
      {props.text}
    </ Grid.Column>
    <Grid.Column computer={6} largeScreen={6} tablet={16} mobile={16}>
      <Image src={props.img} />
    </ Grid.Column>
  </ Grid.Row>
);

class ContentCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {left} = this.props;
    return (
      <Grid>
        {left? <LeftCard {...this.props} /> : <RightCard {...this.props} /> }
      </ Grid>
    );
  }
}

export default ContentCard;
