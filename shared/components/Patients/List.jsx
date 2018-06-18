import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Pagination,
  Segment,
  Table,
} from 'semantic-ui-react';

const PatientsList = (props) => {
  const totalPages = !props.count ? 0 : props.totalCount / props.count;


  const options = Array.from(props.documentTypes || []).map((elem) => {
    return { key: elem.name, value: elem._id, icon: 'genderless', text: elem.name };
  });

  return(
    <Segment>
      <Header as='h2' content='Listado de Pacientes' />
      <Button
        circular
        size='tiny'
        color='teal'
        icon='add user'
        title='Agregar paciente'
        onClick={props.onAddButtonClick} />
      <Divider horizontal section>Búsqueda</Divider>
      <Form>
        <Form.Group>
          <Form.Input
            name='firstName'
            onChange={props.onSearchFieldChange}
            placeholder='Nombre del paciente' />
          <Form.Input
            name='lastName'
            onChange={props.onSearchFieldChange}
            placeholder='Apellido del paciente' />
          <Form.Select
            placeholder='Tipo de documento'
            name='documentType'
            onChange={props.onSearchFieldChange}
            options={options} />
          <Form.Input
            name='documentNumber'
            onChange={props.onSearchFieldChange}
            placeholder='Número de documento' />
        </Form.Group>
      </Form>
      <Table padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre del paciente</Table.HeaderCell>
            <Table.HeaderCell>Domicilio</Table.HeaderCell>
            <Table.HeaderCell>Teléfono</Table.HeaderCell>
            <Table.HeaderCell>Género</Table.HeaderCell>
            <Table.HeaderCell>Tipo de documento</Table.HeaderCell>
            <Table.HeaderCell>Número de documento</Table.HeaderCell>
            <Table.HeaderCell>Opciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.patients && props.patients.map((patient, id) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Header as='h5' content={<Link to={`${props.url}/${patient._id}`}>{patient.firstName} {patient.lastName}</Link>} />
              </Table.Cell>
              <Table.Cell>{patient.address}</Table.Cell>
              <Table.Cell>{patient.phone}</Table.Cell>
              <Table.Cell>{patient.sex}</Table.Cell>
              <Table.Cell>{patient.documentType ? patient.documentType.name : '' }</Table.Cell>
              <Table.Cell>{patient.documentNumber}</Table.Cell>
              <Table.Cell>
                <Button circular size='tiny' color='teal' as={Link} to={`${props.url}/${patient._id}`} icon='heartbeat' title={'Ver paciente'} />
                <Button circular size='tiny' color='red' icon='remove user' title={`Eliminar ${patient._id}`} onClick={props.deleteAction(patient._id)} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Divider hidden />
      <Container textAlign='center'>
        <Pagination
          defaultActivePage={props.pageNumber + 1}
          ellipsisItem={undefined}
          totalPages={totalPages}
          onPageChange={(e, { activePage }) => {
            props.onSearchFieldChange(e, { name: 'pageNumber', value: activePage - 1 });
          }} />
      </Container>
    </Segment>
  );
};

export default PatientsList;
